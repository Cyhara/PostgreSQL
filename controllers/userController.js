import pool from "../dbConfig.js";

// Get all users from the database
export const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        if(result) {
            console.log("User fetched successfully");
            res.status(200).json(result.rows);
        }
        res.status(200).json(result.rows);
    } catch (error) {
        console.log("Failed to fetch users", error);
        res.send(500).json({ error: "Failed to fetch users" });
    }

};

// CREATE a user
export const createUser = async (req, res) => {
    const { id, name, email, age } = req.body;

    try {
        const existingUser = await pool.query(
        "SELECT * FROM users WHERE email = $3", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }
        const newUser = await pool.query(
        "INSERT INTO users (id, name, email, age) VALUES ($1, $2, $3, $4) RETURNING *", [id, name, email, age]
        );
        res.status(201).json(newUser.rows[0]);
        console.log("User created Successfully");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get a user by id
export const getUsersById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log("Error fetching user", error);
        res.status(500).json({ error: "Internal Server Error"});
    }
};

// PUT/update a user by ID
export const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    if (!id || !name || !email || !age) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const query = {
        text: `UPDATE users 
               SET name = $1, email = $2, age = $3
               WHERE id = $4`,
        values: [name, email, age, id],
    };

    try {
        const result = await pool.query(query);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.log("Error updating user", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// DELETE a user by ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query( "DELETE FROM users WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({message: "User deleted successfully" });

    } catch (error) {
        console.log("Error deleting user", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};