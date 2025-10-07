import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useRef, useState } from "react";

const now = new Date();
const months = {
  1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
  7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December"
};

function FormPost() {
  const amenityList = ["Pool", "Security", "Pet-friendly", "Parking", "Wi-Fi"];
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [statusType, setStatusType] = useState("rent");
  const [propertyType, setPropertyType] = useState("house");

  const [caption, setCaption] = useState("");

  const [capacity, setCapacity] = useState(1);
  const [price, setPrice] = useState(0);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length < 1) {
      alert("Must upload at least 1 image");
      return;
    }
    alert("Wow! saved...");
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
  }

  return (
    <div className="border">
      <div className="grid grid-rows-2">
        <p>Create a post</p>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="border rounded-full w-[50px] h-[50px]"></div>
            <div>
              <p>Firstname Lastname</p>
              <p>Username</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-neutral-500">Posting Date & Time</p>
            <div className="flex gap-4">
              <p>{formatMonth()} {now.getDate()}, {now.getFullYear()}</p>
              <p>{now.getHours()}:{now.getMinutes()}</p>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <Select
            onValueChange={(value) => setStatusType(value)}
            value={statusType}
          >
            <SelectTrigger className="w-[180px]">
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
          <Select
            onValueChange={(value) => setPropertyType(value)}
            value={propertyType}
          >
            <SelectTrigger className="w-[180px]">
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
        <div>
          <Input type="text" placeholder="Caption" />
        </div>
        <div>
          <p className="text-neutral-600">Amenities</p>
          <div className="grid grid-cols-3">
            {amenityList.map((amenity, index) => (
              <button
                key={index}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`w-40 h-10 rounded border border-neutral-200 mx-1 my-1 cursor-pointer ${
                  selectedAmenities.indexOf(amenity) !== -1
                    ? "bg-custom-blue text-white border-custom-blue"
                    : "bg-white text-neutral-500 border-neutral-500"
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Input
            type="number"
            onChange={(value) => setCapacity(value)}
            value={capacity}
          />
          <Input
            type="number"
            onChange={(value) => setPrice(value)}
            value={price}
          />
        </div>
        <div className="border border-dashed">
          <div>
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
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default FormPost;
