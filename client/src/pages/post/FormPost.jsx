import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/hooks/contexts/AuthContext";
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
  const { user } = useContext(AuthContext);

  // Dynamic amenities
  const [amenityList, setAmenityList] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [statusType, setStatusType] = useState("rent");
  const [propertyType, setPropertyType] = useState("house");
  const [caption, setCaption] = useState("");
  const [capacity, setCapacity] = useState("1");
  const [price, setPrice] = useState("0");

  const [images, setImages] = useState([]);
  const imgInputRef = useRef(null);

  // Fetch amenities from backend
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/amenities", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch amenities", res.status);
          setAmenityList([]);
          return;
        }

        const data = await res.json();
        setAmenityList(data);
      } catch (err) {
        console.error("Failed to fetch amenities", err);
        setAmenityList([]);
      }
    };
    fetchAmenities();
  }, []);

  // Toggle selected amenities by ID
  const toggleAmenity = (amenityId) => {
    if (selectedAmenities.includes(amenityId)) {
      setSelectedAmenities(selectedAmenities.filter((id) => id !== amenityId));
    } else {
      setSelectedAmenities([...selectedAmenities, amenityId]);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 25) {
      alert("Maximum limit to upload image reached.");
      return;
    }
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCapacityInput = (e) => {
    let value = e.target.value;
    if (!/^\d+$/.test(value)) return;
    value = Number(value);
    if (value < 1) value = 1;
    if (value > 60) value = 60;
    setCapacity(String(value));
  };

  const formatMonth = () => months[now.getMonth() + 1];
  const formatTime = () =>
    new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(now);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      caption,
      capacity: Number(capacity),
      price: Number(price),
      type: statusType,
      propertyType,
      amenityIds: selectedAmenities, // IDs only
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

      if (!response.ok) throw new Error("Unable to create a post");
      const data = await response.json();
      console.log("Post created:", data);
      alert("Post created successfully!");

      // Reset form
      setCaption("");
      setCapacity("1");
      setPrice("0");
      setImages([]);
      setSelectedAmenities([]);
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <div className="border border-white flex flex-col gap-12 w-full max-w-4xl mx-auto px-12 py-6 shadow rounded-2xl bg-white">
      <div className="grid grid-rows-2">
        <p className="text-center text-2xl font-semibold">Create Post</p>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="border rounded-full w-[65px] h-[65px]"></div>
            <div>
              <p className="font-semibold md:text-2xl">
                {user?.firstname} {user?.lastname}
              </p>
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
        {/* Type & Property Type */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Type</Label>
            <Select onValueChange={setStatusType} value={statusType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="sale">Sale</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Property Type</Label>
            <Select onValueChange={setPropertyType} value={propertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Property Type</SelectLabel>
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

        {/* Caption */}
        <div>
          <Label htmlFor="caption">Caption</Label>
          <Input
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Describe your property... location, features, neighborhood, etc."
          />
        </div>

        {/* Amenities */}
        <div>
          <Label>Amenities</Label>
          {amenityList.length === 0 ? (
            <p>No amenities available</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {amenityList.map((amenity) => (
                <button
                  key={amenity.amenityId}
                  type="button"
                  onClick={() => toggleAmenity(amenity.amenityId)}
                  className={`px-4 py-2 border rounded ${
                    selectedAmenities.includes(amenity.amenityId)
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {amenity.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Capacity & Price */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Capacity</Label>
            <Input
              type="number"
              value={capacity}
              onChange={handleCapacityInput}
              min="1"
              max="60"
            />
          </div>
          <div>
            <Label>Price</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
            />
          </div>
        </div>

        {/* Images */}
        <div className="flex flex-col gap-6 border-2 border-dashed p-6">
          <div className="text-center">
            <Button type="button" onClick={() => imgInputRef.current.click()}>
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
          <div className="flex gap-2 flex-wrap">
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
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                >
                  X
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="bg-[#0061ff] text-2xl py-4">
          Post
        </Button>
      </form>
    </div>
  );
}

export default FormPost;
