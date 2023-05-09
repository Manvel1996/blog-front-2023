import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/feauters/post/PostSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddPostPage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status) {
      toast(status);
    }
  }, [status]);

  const submitHandler = () => {
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("text", text);
      data.append("image", imgUrl);
      dispatch(createPost(data));
      setImgUrl("");
      setTitle("");
      setText("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const clearFormHandler = () => {
    setImgUrl("");
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
          onChange={(e) => setImgUrl(e.target.files[0])}
        />
      </label>
      <div className="flex object-cover py-2">
        {imgUrl && <img src={URL.createObjectURL(imgUrl)} alt={imgUrl.name} />}
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
          Add Post
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
