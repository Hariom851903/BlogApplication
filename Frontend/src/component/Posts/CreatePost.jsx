import React from 'react'
import {useFormik} from "formik";
import * as Yup from "yup";
import { useMutation } from '@tanstack/react-query';
import { CreatePostAPI } from '../../APIService/posts/CreatePostAPI';
const CreatePost = () => {

     const postMutation=useMutation({
        mutationKey:["create-post"],
      mutationFn: CreatePostAPI  
     })

    const formik=useFormik({
        initialValues: {
            title: "",
            description: ""
          },
          validationSchema: Yup.object({
            title: Yup.string().required("title is required"),
            description: Yup.string().required("discription is reuired")
          }),
         
          onSubmit:(value)=>{
            console.log(value)
            postMutation.mutate(value);
          },
          
    })
    console.log(formik.errors);
  return (
    <div>
    <form onSubmit={formik.handleSubmit}>
        <input type="text" name="title" placeholder='Enter the title'
            {...formik.getFieldProps('title')}
        />
        <p>{formik.errors.title}</p>
        <input type="text" name="description" placeholder='Enter the discription'
            {...formik.getFieldProps('description')}
        />
           <p>{formik.errors.description}</p>
        <button type='submit'>Submit</button>
    </form>
    </div>
  )
}

export default CreatePost