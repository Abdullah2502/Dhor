import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Regiter user
export const registerController = async (req, res) => {
  const connection = await db.getConnection(); // Get dedicated connection

  try {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      phone, 
      address, // Maps to address_line1
      city, 
      postalCode, 
      country 
    } = req.body;

    // 1. Start Transaction
    await connection.beginTransaction();

    // 2. Check existing user
    const [existingUser] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      connection.release();
      return res.status(200).send({ success: false, message: "Email already registered" });
    }

    // 3. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Insert User
    // FIXED: Changed 'phone_number' to 'phone' to match your Database.txt
    const [userResult] = await connection.query(
      `INSERT INTO users (first_name, last_name, email, password_hash, phone) 
       VALUES (?, ?, ?, ?, ?)`,
      [firstName, lastName, email, hashedPassword, phone]
    );

    const newUserId = userResult.insertId;

    // 5. Insert Address
    // FIXED: Included city, postal_code, and country
    if (address) {
      await connection.query(
        `INSERT INTO user_addresses (user_id, address_line1, city, postal_code, country, is_default) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [newUserId, address, city, postalCode, country, true]
      );
    }

    // 6. Commit
    await connection.commit();

    res.status(201).send({ success: true, message: "User Registered Successfully" });

  } catch (error) {
    await connection.rollback();
    console.log("Registration Error:", error);
    res.status(500).send({ success: false, message: "Error in Registration", error });
  } finally {
    connection.release();
  }
};

export const loginController = async (req, res)=>{
    try{
        const {email, password} = req.body;

        const[users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if(users.length === 0){
            return res.status(400).json({ success: false, message: "Invalid email"});
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if(!isMatch){
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).send({
            success:true,
            message: "Login successful",
            user: {id: user.id, name: user.name, email: user.email, role: user.role},
            token,
        })

    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};
