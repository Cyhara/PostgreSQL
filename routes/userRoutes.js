import express from "express";
import pool from '../dbConfig.js';
import { getUsers, createUser, deleteUser, getUsersById, updateUserById } from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);
router.get("/users/:id", getUsersById);
router.put("/users/:id", updateUserById);

router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});


//post create users
router.post('/users', async (req, res) => {
  try {
    const { id, name, email, age } = req.body;
    if (!id || !name || !email || !age) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const result = await pool.query('INSERT INTO users (id, name, email, age) VALUES ($1, $2, $3, $4) RETURNING *', [id, name, email, age]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get users
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get user by id
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
export default router;

