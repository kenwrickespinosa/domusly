import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import React from "react";

function ViewDetail({ open, onOpenChange, listing }) {
  if (!listing) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div>
          <h1>{listing.price}</h1>
          <h1>{listing.caption}</h1>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewDetail;
