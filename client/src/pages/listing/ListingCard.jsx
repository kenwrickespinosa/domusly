import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";

function ListingCard({ listing }) {
  const substrCaption = () => {
    const limit = 26
    if (listing.caption.length > limit) {
      return listing.caption.substring(0, limit) + "...";
    }
    return listing.caption;
  };

  return (
    <Card>
      <div></div>
      <CardContent>
        <div className="flex justify-between mt-10">
          <span className="font-semibold">{substrCaption()}</span>
          <span className="text-[#0061ff] font-semibold">{listing.price}</span>
        </div>
        <div className="flex flex-col my-5 gap-1">
          <span className="text-sm text-neutral-500">
            {listing.propertyType.charAt(0).toUpperCase() +
              listing.propertyType.slice(1)}
          </span>
          <span className="flex items-center gap-2">
            <FaLocationDot className="text-neutral-500" />
            <span className="text-neutral-500">{listing.location}</span>
          </span>
          <div className="flex gap-5">
            <span>{listing.capacity} bed</span>
            <span>3200 sqft</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full text-white bg-[#0061ff]">View Details</Button>
      </CardFooter>
    </Card>
  );
}

export default ListingCard;
