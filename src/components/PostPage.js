import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loader/Loading";
import { BiSolidUserCircle } from "react-icons/bi"; // You'll need to import your comment icon component

function PostPage() {
  const { postId } = useParams(); // Access postId from URL parameters

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
        <h2 className="text-xl font-semibold text-white mb-2 italic">
          Comments
        </h2>
        <ul className="space-y-4">
          {post.children.map((comment) => (
            <div className="flex items-start">
              <div>
                <p className="text-yellow-400 text-lg font-semibold">
                  🧒 @{comment.author}
                </p>
                <p className="text-white text-sm italic bg-slate-950 ">
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostPage;
