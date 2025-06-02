
const express=require('express')
const { createStation, getStations, updateStation, deleteStation } = require('../controllers/chargeStation')
const protect = require('../middleware/authMiddleware');
const routes=express.Router()

routes.post('/createstation',protect,createStation)
routes.get('/getstations',getStations)
routes.put('/updatestation/:id',protect,updateStation)
routes.delete('/deletestation/:id',protect,deleteStation)

module.exports=routes