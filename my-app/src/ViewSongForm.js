import React from "react";
import ReactModal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewSongForm = ({ isOpen, onClose, songDetails }) => {
  if (!songDetails) {
    return null;
  }

  return (
    <ReactModal isOpen={isOpen} 
    style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
        content: { 
        width: '50%', 
        height: '50%', 
        top: '25%', 
        left: '25%', 
      } }}>
      <div className="view-song-form">
        <h2>Song Details</h2>
        <p>ID: {songDetails.id}</p>
        <p>Username: {songDetails.username}</p>
        <p>Song: {songDetails.song}</p>
        <p>Artist: {songDetails.artist}</p>
        <p>Rating: {songDetails.rating}</p>
        <button onClick={onClose} className="btn btn-success">Close</button>
      </div>
    </ReactModal>
  );
};

export default ViewSongForm;
