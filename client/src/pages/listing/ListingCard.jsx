import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";

function ListingCard() {
  return (
    <Card>
      <div></div>
      <CardContent>
        <div className="flex justify-between mt-10">
          <span className="font-semibold">Modern Architectural...</span>
          <span className="text-[#0061ff]">1,200</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-neutral-500">House</span>
          <span className="flex items-center gap-2">
            <FaLocationDot className="text-neutral-500" />
            <span className="text-neutral-500">Sampaguita St. Davao City</span>
          </span>
          <div className="flex gap-5">
            <span>3 beds</span>
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
