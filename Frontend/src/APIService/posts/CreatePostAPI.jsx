import axios from "axios"

export const CreatePostAPI=async (postData)=>{
   const response =await axios.post("http://127.0.0.1:5000/api/v1/posts/create",
             {postData})
           
    return response.data;
}