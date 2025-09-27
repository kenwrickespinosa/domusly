import React, { useState } from "react";

function FormPost() {
  const [selectedType, setSelectedType] = useState("rent");
  const [propertyType, setPropertyType] = useState("house");
  const [capacity, setCapacity] = useState(1);

  const handleCapacityInput = (e) => {
    let value = e.target.value;
    if (!/^\d+$/.test(value)) return;
    value = Number(value);
    if (value < 1) value = 1;
    if (value > 60) value = 60;
    setCapacity(value);
  };

  return (
    <div className="bg-white rounded p-12 mx-40 w-auto shadow-2xl">
      <form>
        <textarea
          rows="4"
          placeholder="Describe the house..."
          className="w-full m-2 p-2"
        />
        <hr style={{ color: "gray" }} />

        <div className="grid grid-cols-2 my-20">
          <div className="">
            <input type="text" placeholder="Location Address" />
            <input type="text" placeholder="Contact Information" />
          </div>
          <div className="grid grid-rows-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </select>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="dorm">Dormitory</option>
              <option value="condo">condominium</option>
            </select>
            <input
              type="number"
              value={capacity}
              onChange={handleCapacityInput}
              placeholder="Capacity of occupants"
            />
          </div>
        </div>
        <hr style={{ color: "gray" }} />

        <div className="grid grid-rows-2 my-20">
          <p className="text-center mb-4">Amenities</p>
          <div className="grid grid-cols-2 text-center">
            <div>
              <input type="checkbox" name="wifi" id="wifi" value="wifi" />
              <label htmlFor="wifi">Wi-Fi</label>
            </div>
            <div>
              <input type="checkbox" name="pool" id="pool" value="pool" />
              <label htmlFor="pool">Pool</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="parking"
                id="parking"
                value="parking"
              />
              <label htmlFor="parking">Parking</label>
            </div>
            <div>
              <input type="checkbox" name="pet" id="pet" value="pet" />
              <label htmlFor="pet">Pet-friendly</label>
            </div>
          </div>
        </div>

        <div className="my-2">
          <p>Images here</p>
        </div>
      </form>
    </div>
  );
}

export default FormPost;
