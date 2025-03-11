const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const dishRoutes = require('./routes/dishRoutes');

require('dotenv').config();
const app = express();
app.use(express.json());

connectDB();

app.use('/auth', authRoutes);
app.use('/dishes', dishRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
