import React from "react";
import FormPost from "./FormPost";

function Post() {
  return (
    <div className="bg-neutral-50 py-10">
      <p className="text-center font-bold text-4xl mb-10">Create a post</p>
      <FormPost />
    </div>
  );
}

export default Post;
