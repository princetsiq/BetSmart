import express from 'express';
import cors from 'cors';
import nbaRoutes from './routes/nbaRoutes.js';

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.use('/api/nba', nbaRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});