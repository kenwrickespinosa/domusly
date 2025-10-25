import { Separator } from "@/components/ui/separator";
import React, { useContext } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/hooks/contexts/AuthContext";

function PostCard({ post }) {
  const {token} = useContext(AuthContext);
  const saveListing = async () => {
    if (!token) {
      console.log("User not authenticated");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/saved-listings?postId=${post.postId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );

      if (!response.ok) {
        throw new Error("Error to save listing");
      }

      const data = await response.json();
    } catch (err) {
      console.log("Error:", err);
    }
  };
  return (
    <div className="flex flex-col gap-5 border p-5 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="border rounded-full w-[35px] h-[35px]"></div>
        <div>
          <p className="text-sm md:text-base">{post.firstname} {post.lastname}</p>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <span className="text-sm font-medium border border-[#e6f0ff] px-1 rounded-md text-[#0061ff] bg-[#e6f0ff]">
            For {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
          </span>
          <span className="font-bold">${post.price}/month</span>
        </div>
        <div>
          <p className="text-sm md:text-base">{post.caption}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col bg-neutral-50 p-1 rounded-sm gap-1">
            <span className="text-sm md:text-base text-neutral-500">
              Property Type
            </span>
            <span className="text-sm md:text-base font-semibold">
              {post.propertyType.charAt(0).toUpperCase() +
                post.propertyType.slice(1)}
            </span>
          </div>
          <div className="flex flex-col text-right bg-neutral-50 p-1 rounded-sm gap-1">
            <span className="text-sm md:text-base text-neutral-500">
              Capacity
            </span>
            <span className="text-sm md:text-base font-semibold">
              {post.capacity}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <FaLocationDot className="text-neutral-700" />
          <span className="text-neutral-600 text-sm md:text-base">
            {post.location}
          </span>
        </div>
        <div>Amenities Here</div>
      </div>
      <Separator />
      <div className="flex flex-col gap-5">
        <div>
          <span className="text-sm md:text-base text-neutral-500">
            Contact Information
          </span>
          <span className="text-sm md:text-base font-semibold flex items-center gap-1">
            <FaEnvelope />
            {post.contact}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button className="bg-[#0061ff] border-[#0061ff] text-white">
            Contact Owner
          </Button>
          <Button
            onClick={saveListing}
            className="bg-neutral-50 border-neutral-50 text-neutral-600"
          >
            Save Listing
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 border">
        <div className="bg-blue-200 w-[150px] h-[120px] flex items-center justify-center">
          Img 1
        </div>
        <div className="bg-blue-300 w-[150px] h-[120px] flex items-center justify-center">
          Img 2
        </div>
        <div className="bg-blue-400 w-[150px] h-[120px] flex items-center justify-center">
          Img 3
        </div>
        <div className="bg-blue-500 w-[150px] h-[120px] flex items-center justify-center">
          Img 4
        </div>
      </div>
    </div>
  );
}

export default PostCard;
