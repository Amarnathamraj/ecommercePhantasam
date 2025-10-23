const db=require('../config/db')
const createUser=async(name,email,password)=>{
    const [result]=await db.query(
        'insert into users (name,email,password) values(?,?,?)',
        [name,email,password]
    )
    return result;
}

const getUserByEmail=async(email)=>{
    const [rows]=await db.query(
        'select *from users where email=?',[email]
    )
    return rows[0]
}

// Get all users with pagination
const getUsers = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const [rows] = await db.query('SELECT id, name, email, created_at FROM users ORDER BY id DESC LIMIT ? OFFSET ?', [parseInt(limit), offset]);
  return rows;
};

// Get total users count
const getUsersCount = async () => {
  const [rows] = await db.query('SELECT COUNT(*) as total FROM users');
  return rows[0].total;
};

module.exports={
    createUser,
    getUserByEmail,getUsers,getUsersCount
}