import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const StarRatingInput = ({ newRating, setNewRating, newSongData, setNewSongData}) => {
  const handleRatingClick = (value) => {
    setNewRating(value);
    // Update the rating in the newSongData state
    setNewSongData({ ...newSongData, rating: value });
  };
  
  
    const starIcons = [1, 2, 3, 4, 5].map((value) => (
    <FontAwesomeIcon
      key={value}
      icon={value <= newRating ? solidStar : regularStar}
      style = {{ color: "#ebb800", fontSize: "24px" }} 
      onClick={() => handleRatingClick(value)}
    />
  ));

  return <div>{starIcons}</div>;
};

export default StarRatingInput;
