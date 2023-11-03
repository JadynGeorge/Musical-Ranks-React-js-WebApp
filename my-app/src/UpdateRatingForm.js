//one and only CHAT GPT
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';


const UpdateRatingForm = ({ isOpen, onClose, onSubmit }) => {
  const [newRating, setNewRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to update the rating using onSubmit function
    onSubmit(newRating);
    // Close the modal
    onClose();
  };

  const starIcons = [1,2,3,4,5].map((value) => (
    <FontAwesomeIcon
        key = {value}
        icon = {value <= newRating ? solidStar: regularStar}
        style={{color: "#ebb800",}}
        onClick = {() => setNewRating(value)}
    />    
  ));


  return (
    <ReactModal 
      isOpen={isOpen}
      contentLabel="Update Ratings"
      onRequestClose={onClose}
      style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
        content: { 
        width: '50%', 
        height: '50%', 
        top: '25%', 
        left: '25%', 
      } }}
    >
     <h2>Update Ratings</h2>
      <form onSubmit={handleSubmit}>
        <div>
            {starIcons}
        </div>
        <button type="submit" className="btn btn-success">Update</button>
      </form>
    </ReactModal>
  );
};

export default UpdateRatingForm;