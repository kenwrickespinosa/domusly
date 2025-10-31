import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import React from "react";

function ViewDetail({ open, onOpenChange, listing }) {
  if (!listing) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-y-auto h-5/6 md:h-fit">
        <DialogHeader>
          <DialogTitle className="flex justify-between mt-10">
            <div className="flex flex-col">
              <span
                className="text-base border-[#0061ff] rounded-full text-white bg-[#0061ff]
              md:rounded-full md:text-lg md:text-center md:px-1"
              >
                For {listing.type}
              </span>
              <span className="text-base md:text-lg">
                {listing.propertyType.charAt(0).toUpperCase() +
                  listing.propertyType.slice(1)}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[#0061ff] md:text-lg">
                ${listing.price}
              </span>
              <span className="text-base md:text-lg">12:30 AM</span>
            </div>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div>
          <Carousel>
            <CarouselContent>
              <CarouselItem>1</CarouselItem>
              <CarouselItem>2</CarouselItem>
              <CarouselItem>3</CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 text-black" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 text-black" />
          </Carousel>
          <div>
            <span>Location</span>
            <span>{listing.location}</span>
          </div>
        </div>
        <Separator />
        <div>
          <span>Property Details</span>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-4 bg-neutral-100 rounded-lg px-4 py-2">
              <div>x</div>
              <div className="flex flex-col">
                <span>Capacity</span>
                <span>{listing.capacity}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-neutral-100 rounded-lg px-4 py-2">
              <div>x</div>
              <div className="flex flex-col">
                <span>Area</span>
                <span>3200 sqft</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span>Caption</span>
          <span className="text-neutral-600">{listing.caption}</span>
        </div>
        <div>
          <span>Amenities</span>
          {/* --- */}
          <div className="flex flex-wrap gap-2 mt-2">
            {listing.amenityNames && listing.amenityNames.length > 0 ? (
              listing.amenityNames.map((amenity, index) => (
                <span
                  key={index}
                  className="bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full text-sm"
                >
                  {amenity}
                </span>
              ))
            ) : (
              <span className="text-neutral-500">No amenities listed</span>
            )}
          </div>
          {/* --- */}
        </div>
        <Separator />
        <div className="flex flex-col gap-4 bg-[#0061ff]/5 p-5">
          <div className="flex items-center gap-4">
            <span>A</span>
            <div className="flex flex-col">
              <span className="text-neutral-600">Owner Name</span>
              <span>
                {listing.firstname} {listing.lastname}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>B</span>
            <div className="flex flex-col">
              <span className="text-neutral-600">Contact</span>
              <span>{listing.contact}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button className="border-[#0061ff] bg-[#0061ff]">
              Contact Owner
            </Button>
            <Button>Delete Listing</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewDetail;
