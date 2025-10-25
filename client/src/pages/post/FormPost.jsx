import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AuthContext } from "@/hooks/contexts/AuthContext";
import React, { useContext, useRef, useState } from "react";

import { FaRegCalendarAlt } from "react-icons/fa";

const now = new Date();
const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

function FormPost() {
  const {user} = useContext(AuthContext);
  const amenityList = ["Pool", "Security", "Pet-friendly", "Parking", "Wi-Fi"];
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [statusType, setStatusType] = useState("rent");
  const [propertyType, setPropertyType] = useState("house");

  const [caption, setCaption] = useState("");

  const [capacity, setCapacity] = useState("1");
  const [price, setPrice] = useState("0");

  const [images, setImages] = useState([]);
  const imgInputRef = useRef(null);

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.indexOf(amenity) !== -1) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 25) {
      alert("Maximum limit to upload image reached.");
      return;
    }
    setImages((prevImg) => [...prevImg, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      caption,
      capacity: Number(capacity),
      price: Number(price),
      type: statusType,
      propertyType,
      amenities: selectedAmenities,
    };

    try {
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Unable to create a post");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleCapacityInput = (e) => {
    let value = e.target.value;
    if (!/^\d+$/.test(value)) return;
    value = Number(value);
    if (value < 1) value = 1;
    if (value > 60) value = 60;
    setCapacity(String(value));
  };

  const formatMonth = () => {
    return months[now.getMonth() + 1];
  };

  const formatTime = () => {
    const formattedTime = new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(now);
    return formattedTime;
  };

  return (
    <div className="border border-white flex flex-col gap-12 w-full max-w-4xl mx-auto px-12 py-6 shadow rounded-2xl bg-white">
      <div className="grid grid-rows-2">
        <p className="text-center text-2xl font-semibold">Create Post</p>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="border rounded-full w-[65px] h-[65px]"></div>
            <div>
              <p className="font-semibold md:text-2xl">{user?.firstname} {user?.lastname}</p>
              <p>@{user?.username}</p>
            </div>
          </div>
          <div className="flex flex-col items-end border py-2 px-4">
            <p className="flex items-center gap-2 text-neutral-500">
              Posting Date & Time
              <FaRegCalendarAlt className="text-[#0061ff]" />
            </p>
            <div className="flex gap-4">
              <p>
                {formatMonth()} {now.getDate()}, {now.getFullYear()}
              </p>
              <p>{formatTime()}</p>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <form onSubmit={handleSubmit} className="flex flex-col gap-12">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-neutral-500">Type</Label>
            <Select
              onValueChange={(value) => setStatusType(value)}
              id="status-type"
              value={statusType}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select type</SelectLabel>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="sale">Sale</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-neutral-500">Property Type</Label>
            <Select
              onValueChange={(value) => setPropertyType(value)}
              id="property-type"
              value={propertyType}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select property type</SelectLabel>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="condominium">Condominium</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="caption" className="text-neutral-500">
            Caption
          </Label>
          <Input
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Describe your property... location, features, neighborhood, etc."
          />
        </div>
        <div>
          <p className="text-neutral-500 font-medium">Amenities</p>
          <div className="grid grid-cols-3">
            {amenityList.map((amenity, index) => (
              <button
                key={index}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`w-40 h-10 rounded border border-neutral-200 mx-1 my-1 cursor-pointer ${
                  selectedAmenities.indexOf(amenity) !== -1
                    ? "bg-[#0061ff] text-white font-semibold border-custom-blue"
                    : "bg-white text-neutral-500 border-neutral-500"
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="capacity" className="text-neutral-500">
              Capacity
            </Label>
            <Input
              type="number"
              id="capacity"
              onChange={(e) => setCapacity(e.target.value)}
              value={capacity}
              step="1"
              min="1"
              max=""
              className=""
            />
          </div>
          <div>
            <Label htmlFor="price" className="text-neutral-500">
              Price
            </Label>
            <Input
              type="number"
              id="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              step="1"
              min="0"
              max=""
              className=""
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 border-2 border-dashed p-20">
          <div className="text-center">
            <Button
              type="button"
              onClick={() => imgInputRef.current.click()}
              className="cursor-pointer bg-white text-black"
            >
              Upload Images
            </Button>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={imgInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {images.map((img, index) => (
              <div key={index} className="relative w-32 h-32">
                <img
                  src={URL.createObjectURL(img)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
                <Button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full 
                   w-6 h-6 flex items-center justify-center text-xs shadow-md transition-all"
                >
                  X
                </Button>
              </div>
            ))}
          </div>
        </div>
        <Button type="submit" className="bg-[#0061ff] text-2xl py-6">
          Post
        </Button>
      </form>
    </div>
  );
}

export default FormPost;
