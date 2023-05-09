import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updatePost } from "../redux/feauters/post/PostSlice";

import axios from "../utils/axios";

export default function EditPostPage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [oldImg, setOldImg] = useState("");
  const [newImg, setNewImg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setTitle(data.title);
    setText(data.text);
    setOldImg(data.imgUrl);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  },[fetchPost]);

  const submitHandler = () => {
    try {
      const updatedPost = new FormData();
      updatedPost.append("title", title);
      updatedPost.append("text", text);
      updatedPost.append("image", newImg);
      updatedPost.append("id", params.id)
      dispatch(updatePost(updatedPost));
      navigate('/posts')
    } catch (error) {
      console.log(error);
    }
  };

  const clearFormHandler = () => {
    setNewImg("");
    setTitle("");
    setText("");
  };

  return (
    <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        Upload image:
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            setNewImg(e.target.files[0]);
            setOldImg("");
          }}
        />
      </label>
      <div className="flex object-cover py-2">
        {oldImg && (
          <img src={`http://localhost:5000/${oldImg}`} alt={oldImg.name} />
        )}
        {newImg && <img src={URL.createObjectURL(newImg)} alt={newImg.name} />}
      </div>
      <label className="text-xs text-white opacity-70">
        Title post:
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <label className="text-xs text-white opacity-70">
        Text post:
        <textarea
          placeholder="Post text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700"
        />
      </label>
      <div className="flex gap-8 justify-center items-center mt-4">
        <button
          type="submit"
          onClick={submitHandler}
          className="flex items-center bg-gray-600 text-xs rounded-sm text-white py-2 px-4">
          Update Post
        </button>
        <button
          onClick={clearFormHandler}
          className="flex items-center bg-red-600 text-xs rounded-sm text-white py-2 px-4">
          Cancel
        </button>
      </div>
    </form>
  );
}
