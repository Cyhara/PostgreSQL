import express from 'express';
import pool from './dbConfig.js';
import userRoutes from './routes/userRoutes.js';
import applyMiddlewares from './middlewares/index.js';

const app = express();

const PORT = 5000;

applyMiddlewares(app);

app.use('/api', userRoutes);

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Database connection established');
  }
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle server termination
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server terminated');
    pool.end(() => {
      console.log('Database connection closed');
      process.exit(0);
    });
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  server.close(() => {
    pool.end(() => {
      process.exit(1);
    });
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});