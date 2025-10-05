import React, { useRef, useState } from "react";

function FormPost() {
  const amenityList = ["Pool", "Security", "Pet-friendly", "Parking", "Wi-Fi"];
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [statusType, setStatusType] = useState("Rent");
  const [propertyType, setPropertyType] = useState("House");
  
  const [caption, setCaption] = useState("");

  const [price, setPrice] = useState(0);
  const [capacity, setCapacity] = useState(1);

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

  return (
    <div className="border rounded-2xl mx-20 bg-white shadow-2xl">
      <p className="font-bold my-10 text-4xl border-b border-neutral-500 px-16">
        NEW POST
      </p>
      <form onSubmit={handleSubmit}>
        {/* First group */}
        <div className="grid grid-cols-[4rem_1fr_auto] px-16 border mx-10 p-5 mb-10">
          <div className="border rounded-full w-12 h-12"></div>
          <div>
            <p>Firstname Lastname</p>
            <p className="text-neutral-500">
              {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="grid grid-rows-2">
            <select
              id="statusType"
              value={statusType}
              onChange={(e) => setStatusType(e.target.value)}
            >
              <option value="Rent">Rent</option>
              <option value="Sale">Sale</option>
            </select>
            <select
              id="propertyType"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Warehouse">Warehouse</option>
              <option value="condominium">Condominium</option>
              <option value="Office">Office</option>
            </select>
          </div>
        </div>
        {/* Second group */}
        <div className="px-16 border mx-10 p-5 mb-10">
          <p className="font-bold">CAPTION</p>
          <textarea
            placeholder="Write a caption..."
            value={caption}
            rows="3"
            onChange={(e) => setCaption(e.target.value)}
            className="border w-full py-2 px-5"
          ></textarea>
        </div>
        {/* Third group */}
        <div className="grid grid-cols-3 px-16 border mx-10 p-5 mb-10">
          <div className="col-span-2 text-center">
            <p className="mb-5">Amenities</p>
            <div>
              {amenityList.map((amenity, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-2.5 py-2 rounded-2xl border mx-1 cursor-pointer ${
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
          <div className="grid grid-rows-2 gap-2">
            <input
              type="text"
              placeholder="Price"
              value={price}
              className="border border-neutral-500 px-5"
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="text"
              placeholder="Capacity"
              value={capacity}
              className="border border-neutral-500 px-5"
              onChange={handleCapacityInput}
            />
          </div>
        </div>
        {/* Fourth group */}
        <div className="px-16 border mx-10 p-5 mb-10">
          <div>
            <button
              type="button"
              aria-label="Upload property images"
              onClick={() => imgInputRef.current.click()}
              className="cursor-pointer"
            >
              Upload Images
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={imgInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div className="flex gap-2 mt-2 flex-wrap ">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mx-10 p-5 mb-10">
          <button
            type="submit"
            className="border px-10 py-2 font-bold rounded-3xl text-2xl cursor-pointer 
            hover:bg-custom-blue hover:text-white hover:border-custom-blue"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormPost;
