const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const { PORT } = process.env;
const app = express();

app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/authRoutes');
const stationRoutes=require('./routes/stationsRoutes')
const { connect } = require('./config/databaseConnection');
app.use('/api/auth', authRoutes);  
app.use('/api/stations', stationRoutes);  


app.get('/', (req, res) => {
  res.send('API Running...');
});


connect()

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

