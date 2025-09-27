import React from "react";

function PostCard({ post }) {
  return (
    <div className="border p-10 my-5 rounded-2xl shadow-2xl">
      <div className="grid grid-cols-[3rem_1fr_auto] gap-3 mb-5">
        <div className="border rounded-full w-12 h-12 text-center flex justify-center items-center">
          img
        </div>
        <div>
          <p>@{post.username}</p>
          <p className="text-gray-500 text-sm">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p>For {post.type}</p>
          <p>{post.propertyType}</p>
        </div>
      </div>
      <div className="">
        <p className="mb-5">{post.caption}</p>
        {post.amenityNames?.map((name, index) => (
          <span key={index} className="border text-sm px-2 py-0.5 rounded">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PostCard;
