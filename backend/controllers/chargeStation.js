const ChargeStation = require('../models/ChargingStation');

exports.createStation = async (req, res) => {
  try {
    const { name, location, status, powerOutput, connectorType } = req.body;

    const station = await ChargeStation.create({
      name,
      location,
      status,
      powerOutput,
      connectorType,
      createdBy: req.user.id
    });
 
    res.status(201).json({ success: true, data: station });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStations = async (req, res) => {
  try {
    const stations = await ChargeStation.find()
    res.status(200).json({ success: true, data: stations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateStation = async (req, res) => {
    console.log(req.body)
  try {
    const station = await ChargeStation.findById(req.params.id);
    if (!station) return res.status(404).json({ message: 'Station not found' });

    const updatedStation = await ChargeStation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedStation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteStation = async (req, res) => {
  try {
    const station = await ChargeStation.findById(req.params.id);
    if (!station) return res.status(404).json({ message: 'Station not found' });

   await ChargeStation.deleteOne({ _id: req.params.id }); 

    res.status(200).json({ success: true, message: 'Station deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};