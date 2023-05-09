import Layout from "./components/Layout.jsx";
import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage.jsx";
import Postspage from "./pages/Postspage";
import PostPage from "./pages/PostPage";
import AddPostPage from "./pages/AddPostPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EditPostPage from "./pages/EditPostPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "./redux/feauters/auth/AuthSlice.js";

function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getMe())
  },[dispatch])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/posts" element={<Postspage />}/>
        <Route path=":id" element={<PostPage />}/>
        <Route path=":id/edit" element={<EditPostPage />}/>
        <Route path="new" element={<AddPostPage />}/>
        <Route path="register" element={<RegisterPage />}/>
        <Route path="login" element={<LoginPage />}/>
      </Routes>
      <ToastContainer position="bottom-right"/>
    </Layout>
  )
}

export default App
