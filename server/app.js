import express from 'express';
import cors from 'cors';
import sequelize from './config/dbConfig.js';
import nbaRoutes from './routes/nbaRoutes.js';
import db from './models/index.js';

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());
app.use('/api', nbaRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => {
    console.error('Failed to sync database:', error);
  }); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});