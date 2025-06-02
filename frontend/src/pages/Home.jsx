import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaUser, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";


import {
  getStationsApi,
  updateStationsApi,
  deleteStationsApi,
  createStationsApi
} from '../services/station';

export const Home = () => {
  const [stations, setStations] = useState([]);
  const [flag, setFlag] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    powerOutput: "",
    connectorType: ""
  });

  const userName = localStorage.getItem('username');
  const navigate = useNavigate();

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [mapCoords, setMapCoords] = useState({ lat: null, lng: null });

  const [showAllMapModal, setShowAllMapModal] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newStation, setNewStation] = useState({
    name: "",
    status: "",
    powerOutput: "",
    connectorType: "",
    location: { latitude: "", longitude: "" }
  });

  useEffect(() => {
    getStationsApi(setStations);
  }, [flag]);

  const handleViewAllMap = () => setShowAllMapModal(true);

  const handleEdit = (station) => {
    setSelectedStation(station);
    setIsModalOpen(true);
  };

  const openMapModal = (lat, lng) => {
    setMapCoords({ lat, lng });
    setIsMapModalOpen(true);
  };

  const handleUpdate = () => {
    updateStationsApi(selectedStation._id, selectedStation, setFlag);
    closeModal();
  };

  const handleDelete = (station) => deleteStationsApi(station._id, setFlag);

  const closeModal = () => {
    setSelectedStation(null);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.setItem('token', "");
    navigate('/');
  };

  const handleCreate = async () => {
    const res = await createStationsApi(newStation, setFlag);
    if (res) {
      setIsCreateModalOpen(false);
      setNewStation({
        name: "",
        status: "",
        powerOutput: "",
        connectorType: "",
        location: { latitude: "", longitude: "" }
      });
    }
  };

  return (
    <div>
      <nav className='bg-blue-700 sticky top-0 w-full p-4 flex justify-between items-center shadow-md z-50'>
        <div className='text-white text-2xl font-semibold'>⚡ EV Station Admin</div>
        <div className='flex items-center gap-3 text-white'>
          <div className='flex justify-center items-center text-2xl gap-2'>
          <FaUser />
          <span>{userName}</span>
          </div>
            <IoIosLogOut
              className='text-3xl text-white cursor-pointer hover:scale-110 transition' onClick={handleLogout}
            />
          
        </div>
      </nav>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Charging Stations</h1>
          <div className='flex gap-2'>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={handleViewAllMap}>View All on Map</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setIsCreateModalOpen(true)}>Add Station</button>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input type="text" placeholder="Filter by Name" value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md" />
          <input type="text" placeholder="Filter by Status" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md" />
          <input type="text" placeholder="Filter by Power Output" value={filters.powerOutput} onChange={(e) => setFilters({ ...filters, powerOutput: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md" />
          <input type="text" placeholder="Filter by Connector Type" value={filters.connectorType} onChange={(e) => setFilters({ ...filters, connectorType: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md" />
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-600 text-white sticky top-0">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Power Output</th>
                <th className="px-6 py-4">Connector Type</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {stations
                .filter((station) => {
                  return (
                    station.name.toLowerCase().includes(filters.name.toLowerCase()) &&
                    station.status.toLowerCase().includes(filters.status.toLowerCase()) &&
                    station.powerOutput.toString().includes(filters.powerOutput) &&
                    station.connectorType.toLowerCase().includes(filters.connectorType.toLowerCase())
                  );
                })
                .map((station) => (
                  <tr key={station._id} className="border-b hover:bg-blue-50 transition duration-200">
                    <td className="px-6 py-4 font-medium">{station.name}</td>
                    <td className="px-6 py-4">{station.status}</td>
                    <td className="px-6 py-4">{station.powerOutput} kW</td>
                    <td className="px-6 py-4">{station.connectorType}</td>
                    <td className="px-6 py-4">
                      <div className=''>
                        <LuMapPin className="text-green-600 cursor-pointer text-lg hover:scale-110 transition" onClick={() => openMapModal(station.location.latitude, station.location.longitude)} />
                      </div>
                    </td>
                    <td className="flex gap-2 text-2xl justify-center items-center px-6 py-4">
                      <div className="text-blue-600 cursor-pointer text-lg hover:scale-110 transition" onClick={() => handleEdit(station)}><FaEdit /></div>
                      <div className="text-red-600 cursor-pointer text-lg hover:scale-110 transition" onClick={() => handleDelete(station)}><MdDeleteForever /></div>
                    </td>
                  </tr>
                ))}
              {stations.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No stations found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
              <h2 className="text-xl font-bold text-blue-600 mb-4">Edit Station</h2>

              <div className="space-y-3">
                <input
                  type="text"
                  value={selectedStation?.name}
                  onChange={(e) =>
                    setSelectedStation((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Station Name"
                />

                <input
                  type="number"
                  value={selectedStation?.powerOutput}
                  onChange={(e) =>
                    setSelectedStation((prev) => ({ ...prev, powerOutput: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Power Output"
                />

                <input
                  type="text"
                  value={selectedStation?.connectorType}
                  onChange={(e) =>
                    setSelectedStation((prev) => ({ ...prev, connectorType: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Connector Type"
                />

                <input
                  type="text"
                  value={selectedStation?.status}
                  onChange={(e) =>
                    setSelectedStation((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Status"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

      
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
              <h2 className="text-xl font-bold text-blue-600 mb-4">Add New Station</h2>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Station Name"
                  value={newStation.name}
                  onChange={(e) => setNewStation({ ...newStation, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />

                <input
                  type="text"
                  placeholder="Status"
                  value={newStation.status}
                  onChange={(e) => setNewStation({ ...newStation, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />

                <input
                  type="number"
                  placeholder="Power Output"
                  value={newStation.powerOutput}
                  onChange={(e) => setNewStation({ ...newStation, powerOutput: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />

                <input
                  type="text"
                  placeholder="Connector Type"
                  value={newStation.connectorType}
                  onChange={(e) => setNewStation({ ...newStation, connectorType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />

                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Latitude"
                    value={newStation.location.latitude}
                    onChange={(e) =>
                      setNewStation({
                        ...newStation,
                        location: { ...newStation.location, latitude: e.target.value }
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />

                  <input
                    type="number"
                    placeholder="Longitude"
                    value={newStation.location.longitude}
                    onChange={(e) =>
                      setNewStation({
                        ...newStation,
                        location: { ...newStation.location, longitude: e.target.value }
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {isMapModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-3xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-700">Station Location</h2>
                <button
                  onClick={() => setIsMapModalOpen(false)}
                  className="text-gray-500 hover:text-red-500 text-xl"
                >
                  &times;
                </button>
              </div>
              <div className="w-full h-[400px]">
                <iframe
                  title="Google Map"
                  width="100%"
                  height="100%"
                  className="rounded-lg"
                  loading="lazy"
                  style={{ border: 0 }}
                  allowFullScreen
                  src={`https://www.google.com/maps?q=${mapCoords.lat},${mapCoords.lng}&hl=es;z=14&output=embed`}
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {showAllMapModal && stations.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-5xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-700">All Station Locations</h2>
                <button
                  onClick={() => setShowAllMapModal(false)}
                  className="text-gray-500 hover:text-red-500 text-xl"
                >
                  &times;
                </button>
              </div>

              <div className="w-full h-[500px]">
                <MapContainer
                  center={[
                    Number(stations[0].location.latitude),
                    Number(stations[0].location.longitude)
                  ]}
                  zoom={5}
                  scrollWheelZoom={true}
                  className="h-full w-full rounded-md z-50"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  {stations.map((station) => (
                    <Marker
                      key={station._id}
                      position={[
                        Number(station.location.latitude),
                        Number(station.location.longitude),
                      ]}
                    >
                      <Popup>
                        <strong>{station.name}</strong> <br />
                        {station.status} <br />
                        {station.connectorType}<br />
                        {station.powerOutput} kW
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
        )}



      </div>
    </div>
  );
};
