import axios from "axios"

export const CreatePostAPI=async (postData)=>{
   const response =await axios.post("http://127.0.0.1:5000/api/v1/posts/create",
             {postData})
           
    return response.data;
}
export const FetchPost=async()=>{
    const response=await axios.get("http://127.0.0.1:5000/api/v1/posts");
    return response;
}
export const FetchPostDetails=async(postId)=>{
    const response=await axios.get(`http://127.0.0.1:5000/api/v1/posts/${postId}`);
    return response;
}
export const updatePostAPI = async (postData) => {
    console.log(postData);
    const response = await axios.put(`http://127.0.0.1:5000/api/v1/posts/${postData?.postId}`, {
      title: postData.title,
      description: postData.description,
    });
    return response.data;
  };
  export const DeletePost=async(postId)=>{
    const response=await axios.delete(`http://127.0.0.1:5000/api/v1/posts/${postId}`);
    return response;
}
