import toast from "react-hot-toast"
import { stationApis } from "./api"
import { apiConnector } from "./apiConnector"


export const getStationsApi=async(setStations)=>{
    try{
        const toastid= toast.loading("please wait...")
        const response=await apiConnector("GET",stationApis.getStations)
        console.log("response api",response.data.data)
         toast.dismiss(toastid)
        setStations(response.data.data)
    }catch(e){
        console.log("Error",e)
    }
}
export const updateStationsApi = async (id, data,setFlag) => {
  const token = localStorage.getItem("token");
  console.log("Token",token)
  try {
     const toastid= toast.loading("please wait...")
    const response = await apiConnector(
      "PUT",
      `${stationApis.updateStation}/${id}`,
      data,
      {
        Authorization: `Bearer ${token}`, 
      }
    );
        toast.dismiss(toastid)
        toast.success("Station Updated Successfully!")
        setFlag((prev)=>!prev)
    
    console.log("response api", response.data);
  } catch (e) {
    console.log("Error", e);
  }
};
export const deleteStationsApi = async (id,setFlag) => {
  const token = localStorage.getItem("token");
  console.log("Token",token)
  try {
    const toastid= toast.loading("please wait...")
    const response = await apiConnector(
      "DELETE",
      `${stationApis.deleteStation}/${id}`,
      {},
      {
        Authorization: `Bearer ${token}`, 
      }
    );
        toast.dismiss(toastid)
        toast.success("Station Deleted Successfully!")
        setFlag((prev)=>!prev)
    
    console.log("response api", response.data);
  } catch (e) {
    console.log("Error", e);
  }
};
export const createStationsApi = async (data, setFlag) => {
  const token = localStorage.getItem("token");
  let { name, status, powerOutput, connectorType, location } = data;


  status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  
  const allowedStatuses = ["Active", "Inactive"];
  if (!allowedStatuses.includes(status)) {
    return toast.error("Invalid status. Only 'Active' or 'Inactive' is allowed.");
  }

  try {
    const toastid = toast.loading("Please wait...");

    const response = await apiConnector(
      "POST",
      stationApis.createStation,
      { name, status, powerOutput, connectorType, location },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    toast.dismiss(toastid);
    toast.success("Station Created Successfully!");
    setFlag((prev) => !prev);
    console.log("response api", response.data);
    return response;
  } catch (e) {
    console.log("Error", e);
    toast.dismiss();
    toast.error("Failed to create station.");
  }
};



