const BASE_URL="https://evoltsoft-assignment-1.onrender.com"

export const authApis={
    signup:BASE_URL+'/api/auth/signup',
    login:BASE_URL+'/api/auth/login',
}
export const stationApis={
    getStations:BASE_URL+'/api/stations/getstations',
    updateStation:BASE_URL+'/api/stations/updatestation',
    deleteStation:BASE_URL+'/api/stations/deletestation',
    createStation:BASE_URL+'/api/stations/createstation'
}