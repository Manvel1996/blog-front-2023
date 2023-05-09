import React, { useCallback, useEffect, useState } from "react";
import axios from "../utils/axios";
import PostItem from "../components/PostItem";

export default function Postspage() {
  const [myPosts, setMyPosts] = useState([]);

  const fetchMyPosts = useCallback(async () => {
    try {
      const { data } = await axios.get("/posts/user/me");
      setMyPosts(data)
    } catch (error) {
      console.log(error);
    }
  });
  useEffect(() => {
    fetchMyPosts();
  },[]);

  if (!myPosts) {
    return (
      <div className="text-xl text-center text-white py-10">
        You havn't Posts
      </div>
    );
  }
  return <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
    {myPosts?.map((post,index)=><PostItem post={post} key={index}/>)}
  </div>;
}
