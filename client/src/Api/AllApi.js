import axiosInstance from "./AxiosInstance"

export const Register =async(data)=>{
try{
   const res = await axiosInstance.post("/auth/register",data) 
   if(res){
       return res
   }
   else{
      console.log("error in register")
   }
}catch(error){
    console.log(error)
}
}

export const Login =async(data)=>{
 try{
    const res =await axiosInstance.post('/auth/login',data)
    if(!res.data.token){
        console.log("error in login ")
    }else{
        localStorage.setItem("token",res.data.token)
        return {success:true, token:res.data.token}
    }

 }catch(error){
    console.log(error)
 }
}

export const getSingleProfile =async()=>{
    try{
        const res =await axiosInstance.get("/users/user")
        return res.data

    }catch(error){
        console.log(error)
    }
}

export const updateProfile =async(id,data)=>{
    try{
    const res=await axiosInstance.put(`/users/update/${id}`,data)
    return res
    }catch(error){
        console.log(error)
    }
}

export const deleteProfile =async(id)=>{
try{
    const res =await axiosInstance.delete(`/users/delete/${id}`)
    return res

}catch(error){
    console.log(error)
}
}

export const sendMessageApi=async(data)=>{
    try{
        const res =await axiosInstance.post("/messages/",data)
       return res
    }catch(error){
        console.log(error)
    }
}

export const getMessagesApi = async (senderId, receiverId) => {
    const res = await axiosInstance.get(`/${senderId}/${receiverId}`);
    return res.data;
  };