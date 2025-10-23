const { body,validationResult } = require("express-validator");
const { createUser, getUserByEmail,getUsers, getUsersCount } = require("../models/userModel");
const { hashedPassword, comparePassword } = require("../utils/bcryptUtils");
const generateToken = require("../utils/jwtUtils");


const validateUser = [
  body("name").notEmpty().withMessage("name is required"),
  body("email").isEmail().withMessage("valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 chars"),
];

const registerUser= async(req,res,next) => {
  try {
     const errors=validationResult(req);
     if (!errors.isEmpty())
       return res.status(400).json({errors: errors.array()});

    const { name, email, password } = req.body;
    const exisitingUser = await getUserByEmail(email);
    if (exisitingUser)
      return res.status(400).json({ message: "email already exisits" });

    const hashed = await hashedPassword(password);
    const result = await createUser(name, email, hashed);
    res.status(201).json({ message: "user created", userId: result.insertId });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return res.status(400).json({ message: "invalid credentials" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid credentials" });
    const token = generateToken({ id: user.id, email: user.email });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

// List users with pagination
const listUsers = async (req, res, next) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;       // default page 1
    limit = parseInt(limit) || 10;    // default limit 10

    const users = await getUsers(page, limit);
    const total = await getUsersCount();

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      users
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, validateUser,loginUser,listUsers };
