import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";

function index() {
  const [savedListings, setSavedListings] = useState([]);

  const fetchSavedListings = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/saved-listings", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSavedListings(data)
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    fetchSavedListings();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 md:mx-5 my-5">
      {savedListings.map((listing) => (
        <ListingCard key={listing.postId} listing={listing} />
      ))}
    </div>
  );
}

export default index;
