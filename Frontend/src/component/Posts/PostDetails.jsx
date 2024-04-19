import React from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FetchPostDetails, updatePostAPI } from "../../APIService/posts/CreatePostAPI";
import { useMutation, useQuery } from "@tanstack/react-query";

const PostDetails = () => {
  const { postId } = useParams();
  const { data } = useQuery({
    queryKey: ["post-details"],
    queryFn: () => FetchPostDetails(postId),
  });

  const postMutation = useMutation({
    mutationKey: ["update-post"],
    mutationFn: updatePostAPI,
  });

  const formik = useFormik({
    initialValues: {
      title: data?.data?.postFound?.title || "",
      description: data?.data?.postFound?.description || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      const postData = {
        title: values.title,
        description: values.description,
        postId,
      };
      postMutation.mutate(postData);
    },
  });

  const isLoading = postMutation.isLoading;
  const isError = postMutation.isError;
  const isSuccess = postMutation.isSuccess;
  const error = postMutation.error;

  return (
    <div>
      <h1> You are editing - {data?.data?.postFound?.title}</h1>
      <div>
        {isLoading && <p>Loading...</p>}
        {isSuccess && !isError && <p>Post updated successfully</p>}
        {isError && <p>{error.message}</p>}
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            {...formik.getFieldProps("title")}
          />
          {formik.touched.title && formik.errors.title && (
            <span style={{ color: "red" }}>{formik.errors.title}</span>
          )}
          <input
            type="text"
            name="description"
            placeholder="Enter description"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description && (
            <span style={{ color: "red" }}>{formik.errors.description}</span>
          )}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostDetails;
