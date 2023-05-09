import React from "react";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default function PostItem({ post }) {
  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Havn't Posts</div>
    );
  }
  return (
    <Link to={`/${post._id}`}>
      <div className="flex flex-col basis-1/4 flex-grow">
        <div
          className={post.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"}>
          {post.imgUrl && (
            <img
              src={`http://localhost:5000/${post.imgUrl}`}
              alt="img"
              className="object-cover w-full"
            />
          )}
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="text-xs  text-white opacity-50">{post.userName}</div>
          <div className="text-xs  text-white opacity-50">
            <Moment format="D MMM YYYYY">{post.createdAt}</Moment>
          </div>
        </div>
        <div className="text-white text-xl">
          {post.title?.length > 35 ? post.title.slice(0,35) + "..." : post.title}
        </div>
        <p className="text-white opacity-60 text-xs pt-4">
          {post.text?.length > 95 ? post.text.slice(0,95) + "..." : post.text}
        </p>
        <div className="flex gap-3 items-center mt-2">
          <button className="flex justify-center items-center gap-2 text-xs text-white opacity-50">
            <AiFillEye />
            <span>{post.views}</span>
          </button>
          <button className="flex justify-center items-center gap-2 text-xs text-white opacity-50">
            <AiOutlineMessage />
            <span>{post.comments?.length}</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
