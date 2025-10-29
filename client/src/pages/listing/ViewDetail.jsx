import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

function ViewDetail({ open, onOpenChange, listing }) {
  if (!listing) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-between mt-10">
            <div className="flex flex-col">
              <span className="text-base border-[#0061ff] rounded-full text-white bg-[#0061ff]
              md:rounded-full md:text-lg md:text-center md:px-1">
                For {listing.type}
              </span>
              <span className="text-base md:text-lg">
                {listing.propertyType.charAt(0).toUpperCase() +
                  listing.propertyType.slice(1)}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[#0061ff] md:text-lg">${listing.price}</span>
              <span className="text-base md:text-lg">12:30 AM</span>
            </div>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div></div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewDetail;
