import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import SearchFilter from "./SearchFilter";

function Explore() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async (filters = {}) => {
    try {
      let query = new URLSearchParams(filters).toString();
      const res = await fetch(`http://localhost:8080/api/posts?${query}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = (filters) => {
    fetchPosts(filters);
  }

  return (
    <div>
      <div>
        <SearchFilter onSearch={handleSearch} />
      </div>
      <div className="px-64 py-10">
        {posts.map((post) => (
          <PostCard key={post.postId} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Explore;
