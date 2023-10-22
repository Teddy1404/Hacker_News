import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loader/Loading";

function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://hn.algolia.com/api/v1/items/${postId}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post details", error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return (
      <div className="loader">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-5">
      <h2 className="text-3xl font-semibold text-white mb-4">{post.title}</h2>
      <p className="text-lg text-gray-400">Points: {post.points}</p>
      <div className="bg-black p-4 rounded-lg mt-4">
        <h3 className="text-xl font-semibold text-white mb-2">Comments</h3>
        <ul className="space-y-4">
          {post.children.map((comment) => (
            <>
              <div className="w-[24px] h-[24px] flex m-0">{comment.author}</div>
              <div className="text-white text-sm italic  overflow-auto bg-slate-900 rounded-lg  p-1">
                <p className="text-yellow-500 text-lg">🧑 @{comment.author}</p>

                {comment.text}
              </div>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostPage;
