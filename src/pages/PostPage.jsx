import React, { useCallback, useEffect, useState } from "react";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import Moment from "react-moment";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removePost } from "../redux/feauters/post/PostSlice";
import { toast } from "react-toastify";

import axios from "../utils/axios";
import {
  createComment,
  getPostComments,
} from "../redux/feauters/comment/CommentSlice";
import CommentItem from "../components/CommentItem";

export default function PostPage() {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const params = useParams();
  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Loading...</div>
    );
  }

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id));
      toast("Remove post success");
      navigate("/posts");
    } catch (error) {
      toast("Can not remove post");
    }
  };

  const handleSubmit = () => {
    try {
      const postId = params.id;
      dispatch(createComment({ postId, comment }));
      setComment("");
    } catch (error) {
      toast("Can not add comment");
    }
  };

  return (
    <div>
      <Link
        to="/"
        className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2 w-max">
        Back
      </Link>
      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"
              }>
              {post?.imgUrl && (
                <img
                  src={`http://localhost:5000/${post.imgUrl}`}
                  alt="img"
                  className="object-cover w-full"
                />
              )}
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="text-xs  text-white opacity-50">
              {post.userName}
            </div>
            <div className="text-xs  text-white opacity-50">
              <Moment format="D MMM YYYYY">{post.createdAt}</Moment>
            </div>
          </div>
          <div className="text-white text-xl">{post.title}</div>
          <p className="text-white opacity-60 text-xs pt-4">{post.text}</p>
          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              <button className="flex justify-center items-center gap-2 text-xs text-white opacity-50">
                <AiFillEye />
                <span>{post.views}</span>
              </button>
              <button className="flex justify-center items-center gap-2 text-xs text-white opacity-50">
                <AiOutlineMessage />
                <span>{post.comments?.length}</span>
              </button>
            </div>

            {user?._id === post.author && (
              <div className="flex gap-3 mt-4">
                <button className="flex justify-center items-center gap-2 text-white opacity-50">
                  <Link to={`/${params.id}/edit`}>
                    <AiTwotoneEdit />
                  </Link>
                </button>
                <button
                  onClick={removePostHandler}
                  className="flex justify-center items-center gap-2 text-white opacity-50">
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment"
              className="text-black w-full rounded-sm bg-gray-400 p-2 text-xs outline-none placeholder:text-gray-700"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex justify-center items-center bg-gray-600 text-xs rounded-sm py-2 px-4">
              Add comment
            </button>
          </form>
          {comments?.map((comment) => {
              return <CommentItem key={comment._id} comment={comment} />;
            })}
        </div>
      </div>
    </div>
  );
}
