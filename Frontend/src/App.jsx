import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import CreatePost from "./component/Posts/CreatePost"
import FetchAllPost from "./component/Posts/FetchAllPost"
import  PostDetails  from './component/Posts/PostDetails'

function App() {
  return (
    <BrowserRouter>
          <Routes>
          <Route element={<CreatePost/>} path="/create-post"/>
            <Route element={<FetchAllPost/>} path="/fetch-post"  />
            <Route element={<PostDetails/>} path='/posts/:postId'></Route>
          </Routes>
    </BrowserRouter>
  )
}

export default App
