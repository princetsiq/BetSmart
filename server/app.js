import express from 'express';
import cors from 'cors';
import sequelize from './config/dbConfig.js';
import nbaRoutes from './routes/nbaRoutes.js';

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.use('/api/nba', nbaRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});