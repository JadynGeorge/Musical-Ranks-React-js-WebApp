import ReactModal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";

const DeleteSongForm = ({ isOpen, onClose, onSubmit, songID }) => {
  const handleDelete = () => {
    // Send a request to delete the song using onSubmit function
    onSubmit(songID);
    // Close the modal
    onClose();
  };

  return (
    <ReactModal 
      isOpen={isOpen}
      contentLabel="Delete Song"
      onRequestClose={onClose}
      style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
        content: { 
        width: '50%', 
        height: '50%', 
        top: '25%', 
        left: '25%', 
      } }}
    >
      <h2>Delete Song</h2>
      <p>Are you sure you want to delete this song?</p>
      <button onClick={handleDelete} className="btn btn-danger">Delete</button>
    </ReactModal>
  );
};

export default DeleteSongForm;
