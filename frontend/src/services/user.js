import toast from "react-hot-toast"
import { authApis } from "./api"
import { apiConnector} from "./apiConnector"


export const signupApi=async (data)=>{
   const {firstname,lastname,email,password}=data
    try{
       const response=await apiConnector("POST",authApis.signup,{firstname,lastname,email,password})
       console.log("Response Api---",response)
       if(response.data.success){
        toast.success(response.data.info)
       }else{
        toast.error(response.data.info)
       }
    }catch(e){
      console.log("Error in Api",e)
      toast.error(e)
    }
}
export const loginApi=async (data,navigate)=>{
   const {email,password}=data
    try{
       const response=await apiConnector("POST",authApis.login,{email,password})
       console.log("Response Api---",response)
       if(response.data.success){
        toast.success(response.data.info)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username",response.data.UserInfo.firstname)
        navigate('/home')
       }else{
        toast.error(response.data.message)
       }
    }catch(e){
      console.log("Error in Api",e)
      toast.error(e)
    }
}
