const { body, validationResult } = require("express-validator");
const {
  createCustomer,
  getCustomerByEmail,
} = require("../models/customerModel");
const { comparePassword, hashedPassword } = require("../utils/bcryptUtils");
const generateToken = require("../utils/jwtUtils");

//default coordinates
const DEFAULT_LAT = 17.9128;
const DEFAULT_LNG = 78.1127;

const validateCustomer = [
  body("name").notEmpty().withMessage("name is required"),
  body("email").isEmail().withMessage("valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 chars"),
  body("lat")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("valid lattide requireed"),
  body("lng")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("valid longitude requireed"),
];

const registerCustomer = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { name, email, password, lat, lng } = req.body;
    const exisitingCustomer = await getCustomerByEmail(email);
    if (exisitingCustomer)
      return res.status(400).json({ message: "email already exist" });

    const hashed = await hashedPassword(password);

    const latitude = lat || DEFAULT_LAT;
    const longitude = lng || DEFAULT_LNG;

    const result = await createCustomer(
      name,
      email,
      hashed,
      latitude,
      longitude
    );

    res.status(201).json({
      message: "customer craeted",
      customerId: result.insertId,
      latitude,
      longitude,
    });
  } catch (err) {
    next(err);
  }
};

const loginCustomer = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const customer = await getCustomerByEmail(email);
    if (!customer)
      return res.status(400).json({ message: "invalid credentials" });

    const isMatch = await comparePassword(password, customer.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid credantials" });

    const token = generateToken({ id: customer.id, email: customer.email });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateCustomer,
  registerCustomer,
  loginCustomer,
};
