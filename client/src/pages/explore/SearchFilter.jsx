import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

function SearchFilter({ onSearch }) {
  const [type, setType] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = () => {
    onSearch({ type, propertyType });
  };

  const handleClear = () => {
    setType("");
    setPropertyType("");
    onSearch({});
  };

  return (
    <div className="flex gap-2">
      <Select value={type} onValueChange={(value) => setType(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select Type</SelectLabel>
            <SelectItem value="rent">Rent</SelectItem>
            <SelectItem value="sale">Sale</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={propertyType} onValueChange={(value) => setPropertyType(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Property Type" />
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
      <Button onClick={handleClear} disabled={!type && !propertyType} className="bg-neutral-100 text-neutral-500">X</Button>
      <Button onClick={handleSearch} className="bg-[#0061ff]">
        Search
      </Button>
    </div>
  );
}

export default SearchFilter;
