import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { FetchPost, DeletePost } from '../../APIService/posts/CreatePostAPI';
import { Link, Navigate } from 'react-router-dom';

const FetchAllPost = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['fetch-post'],
        queryFn: FetchPost
    });

    const DeleteMutation = useMutation({
        mutationKey: "delete",
        mutationFn: DeletePost
    });

    function  deleteData(PostId) {
        DeleteMutation.mutate(PostId);
        Navigate('/fetch-post');
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.posts.map((item) => (
                        <tr key={item._id}>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                                <Link to={`/posts/${item._id}`}>
                                    <button>Edit</button>
                                </Link>
                                <button onClick={() => {
                                    deleteData(item._id);
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FetchAllPost;
