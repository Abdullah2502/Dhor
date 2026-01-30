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

export const loginController = async (req, res) => {
    const connection = await db.getConnection();
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ success: false, message: "Email and Password are required" });
        }

        // Updated query to join with user_addresses
        const [users] = await connection.query(
            `SELECT u.*, a.address_line1, a.address_line2, a.city, a.postal_code, a.country 
             FROM users u 
             LEFT JOIN user_addresses a ON u.user_id = a.user_id AND a.is_default = 1 
             WHERE u.email = ?`,
            [email]
        );

        if (users.length === 0) {
            return res.status(404).send({ success: false, message: "Email is not registered" });
        }

        const user = users[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(200).send({ success: false, message: "Invalid Password" });
        }

        // CORRECT (Uses the imported 'jwt')
        const token = await jwt.sign({ _id: user.user_id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).send({
        success: true,
        message: "Login successfully",
        user: {
            id: user.user_id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phone: user.phone,
            role: user.role, // <--- ADD THIS LINE
            address: {
                line1: user.address_line1,
                line2: user.address_line2,
                city: user.city,
                zip: user.postal_code,
                country: user.country
            }
        },
        token,
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error in login", error });
    } finally {
        connection.release();
    }
};

// Add this to server/controllers/authControllers.js

// server/controllers/authControllers.js

export const getProfileController = async (req, res) => {
    let connection;
    try {
        // console.log("--> Profile Request. User ID from Token:", req.user?._id);

        // 1. Check if Middleware worked
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).send({ success: false, message: "Unauthorized: No User ID found" });
        }

        connection = await db.getConnection();

        // 2. The REAL Query (No placeholders!)
        const [rows] = await connection.query(
            `SELECT u.user_id, u.email, u.first_name, u.last_name, u.phone, 
                    a.address_line1, a.address_line2, a.city, a.postal_code, a.country 
             FROM users u 
             LEFT JOIN user_addresses a ON u.user_id = a.user_id AND a.is_default = 1 
             WHERE u.user_id = ?`,
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        const user = rows[0];
        res.status(200).send({
            success: true,
            user: {
                id: user.user_id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                phone: user.phone,
                address: {
                    line1: user.address_line1,
                    line2: user.address_line2,
                    city: user.city,
                    zip: user.postal_code,
                    country: user.country
                }
            }
        });

    } catch (error) {
        console.error("--> PROFILE ERROR:", error); 
        res.status(500).send({ success: false, message: "Error in profile API", error: error.message });
    } finally {
        if (connection) connection.release(); 
    }
};

// Add to server/controllers/authControllers.js

export const updateAddressController = async (req, res) => {
    let connection;
    try {
        const { addressLine1, addressLine2, city, postalCode, country } = req.body;
        const userId = req.user._id;

        // Basic validation
        if (!addressLine1 || !city || !postalCode || !country) {
            return res.status(400).send({ success: false, message: "Address Line 1, City, Zip, and Country are required" });
        }

        connection = await db.getConnection();

        // 1. Check if the user already has a default address
        const [existing] = await connection.query(
            "SELECT address_id FROM user_addresses WHERE user_id = ? AND is_default = 1", 
            [userId]
        );

        if (existing.length > 0) {
            // UPDATE existing default address
            await connection.query(
                `UPDATE user_addresses 
                 SET address_line1 = ?, address_line2 = ?, city = ?, postal_code = ?, country = ?
                 WHERE address_id = ?`,
                [addressLine1, addressLine2, city, postalCode, country, existing[0].address_id]
            );
        } else {
            // INSERT new default address if none exists
            await connection.query(
                `INSERT INTO user_addresses (user_id, address_line1, address_line2, city, postal_code, country, is_default)
                 VALUES (?, ?, ?, ?, ?, ?, 1)`,
                [userId, addressLine1, addressLine2, city, postalCode, country]
            );
        }

        res.status(200).send({ success: true, message: "Address updated successfully" });

    } catch (error) {
        console.error("Update Address Error:", error);
        res.status(500).send({ success: false, message: "Error updating address", error });
    } finally {
        if (connection) connection.release();
    }
};

// Add this to the bottom of server/controllers/authControllers.js

export const updatePasswordController = async (req, res) => {
    let connection;
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user._id; // Got from requireSignIn middleware

        // 1. Validation
        if (!currentPassword || !newPassword) {
            return res.status(400).send({ 
                success: false, 
                message: "Current and New Password are required" 
            });
        }

        connection = await db.getConnection();

        // 2. Get the current user's password hash from the DB
        const [rows] = await connection.query(
            "SELECT password_hash FROM users WHERE user_id = ?", 
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        const user = rows[0];

        // 3. Verify the Current Password
        const match = await bcrypt.compare(currentPassword, user.password_hash);
        if (!match) {
            return res.status(200).send({ 
                success: false, 
                message: "Incorrect current password" 
            });
        }

        // 4. Hash the New Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // 5. Update the Database
        await connection.query(
            "UPDATE users SET password_hash = ? WHERE user_id = ?", 
            [hashedPassword, userId]
        );

        res.status(200).send({ 
            success: true, 
            message: "Password updated successfully" 
        });

    } catch (error) {
        console.error("Update Password Error:", error);
        res.status(500).send({ 
            success: false, 
            message: "Error updating password", 
            error 
        });
    } finally {
        if (connection) connection.release();
    }
};

// server/controllers/authControllers.js

export const getAdminStatsController = async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();

        // Run queries in parallel for speed
        const [userCount] = await connection.query("SELECT COUNT(*) as total FROM users WHERE role = 0");
        const [orderCount] = await connection.query("SELECT COUNT(*) as total FROM orders");
        const [productCount] = await connection.query("SELECT COUNT(*) as total FROM products");
        
        // Calculate Total Revenue (Sum of all orders)
        const [revenue] = await connection.query("SELECT SUM(total_amount) as total FROM orders WHERE status != 'cancelled'");

        res.status(200).send({
            success: true,
            totalUsers: userCount[0].total,
            totalOrders: orderCount[0].total,
            totalProducts: productCount[0].total,
            totalRevenue: revenue[0].total || 0
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error fetching admin stats", error });
    } finally {
        if (connection) connection.release();
    }
};