import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation , useNavigate } from "react-router-dom";
import UpdateRatingForm from "./UpdateRatingForm.js";
import StarRatingInput from "./StarRatingInput.js";
import DeleteSongForm from "./DeleteSongForm.js";
import ViewSongForm from "./ViewSongForm.js";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faPlusCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faStar as regularStar,
  faTrashCan,
  faEye,
  faEdit,
} from "@fortawesome/free-regular-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Home = () => {
  //we have to make some variables such that we can operate around our ranking page
  //let us try get the data from the ratings dataframe
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [isOpen, setIsOpen] = useState(false); //pop up for the update button
  const location = useLocation();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [songToDeleteId, setSongToDeleteId] = useState(null);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [songToUpdateId, setSongToUpdateId] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newSongData, setNewSongData] = useState({
    username: location.state.username,
    artist: "",
    song: "",
    rating: 0, // Initialize the rating with 0 stars
  });
  const [viewSongDetails, setViewSongDetails] = useState(null); // Add state for the song details

  //we have to make some variables such that we can operate around our ranking page
  //let us try get the data from the ratings dataframe
  const getcategory = async () => {
    try {
      const res = await fetch(
        "http://localhost/dummyranks/index.php/song/showall"
      );
      const getdata = await res.json();
      setCategory(getdata);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleDeleteClick = (songId) => {
    setSongToDeleteId(songId);
    setIsDeleteOpen(true);
  };
  const handleLogout = async () => {
    try {
      if (localStorage.token) {
        localStorage.clear();
        navigate("/login");
        toast.success("You are logged out", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        });

      } else {
        toast.error("Logout Failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred. Please try again", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        });
    }
  };

  const handleUpdateClick = (songId) => {
    setSongToUpdateId(songId);
    setIsOpen(true);
  }

  const handleUpdateRating = async (newRating, songId) => {
    try {
      const response = await axios.post(
        "http://localhost/dummyranks/index.php/song/update",
        {
          id: songId,
          rating: newRating,
        }
      );

      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        });

        setIsOpen(false);
        getcategory();
      } else if (response.data.warning){
        toast.warning(response.data.warning, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      } else {
        toast.error(response.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occured!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  useEffect(() => {
    getcategory();
  }, []);

  const handleDeleteSong = async (songID) => {
    try {
      const response = await axios.post(
        "http://localhost/dummyranks/index.php/song/delete",
        {
          id: songID,
        }
      );
      console.log("Delete response:", response);
      if (response.data.success) {
        toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        });
        getcategory();
        setIsDeleteOpen(false);
      } else {
        toast.error(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occured. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        });
    }
  };

  const handleCreateSong = async () => {
    try{

      console.log(newSongData);
      const response = await axios
        .post("http://localhost/dummyranks/index.php/song/create", newSongData);

        console.log(response);
                 
        if (response.data.success) {
          console.log("Success message: ", response.data.message);
          toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          });

          setIsCreateFormOpen(false);

        }else if (response.data.warning) {
          console.log("Warning message: ", response.data.message);
          toast.warning(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          });
          }else{
            toast.error(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            });
          }
          
    }catch (error) {
      console.error("An error occurred:", error);
      toast.error("An Error Occured", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      });
    }
  };

  const renderStarRating = (rating) => {
    const starIcons = [1, 2, 3, 4, 5].map((value) => (
      <FontAwesomeIcon
        key={value}
        icon={value <= rating ? solidStar : regularStar}
        style={{ color: "#ebb800" }}
      />
    ));
    return <div>{starIcons}</div>;
  };

  return (
    <div
      className="bg-dark"
      style={{ height: "100vh", width: "100%", backgroundColor: "dark" }}
    >
      <React.Fragment>
        <Container>
          <Row>
            <Col sm={8} className="text-success">
              <h5 className="p-3 fw-bold text-white">Song List</h5>
            </Col>
            {/* "Logout" button */}
            <Col
              sm={4}
              className="d-flex align-items-center justify-content-end"
            >
              <button href="" className="btn btn-danger" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </button>
            </Col>
          </Row>

          <div className="row">
            <div className="col-sm-8">
              <table className="table table-bordered text-white">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Star Rating</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((category) => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.username}</td>
                      <td> {category.song}</td>
                      <td> {category.artist}</td>
                      <td>{renderStarRating(category.rating)}</td>
                      <td>
                        {category.username === location.state.username && (
                          <>
                              <button href="" 
                                    className="btn btn-success" 
                                    onClick = {() => {
                                        handleUpdateClick(category.id);
                                        setIsOpen(true);
                                    }}> 
                                    <FontAwesomeIcon icon={faEdit} /> 
                                    </button>
                                    
                                    {/* Including a pop uo form for the update button */}
                                    <UpdateRatingForm
                                    isOpen = {isOpen}
                                    onClose={() => setIsOpen(false)}
                                    onSubmit = {(newRating) => handleUpdateRating(newRating, songToUpdateId)}
                                 />   

                            {/* Including pop up form for delete */}
                            <button
                              href=""
                              className="btn btn-success"
                              onClick={() => {
                                handleDeleteClick(category.id);
                                setIsDeleteOpen(true);
                              }}
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>

                            <DeleteSongForm
                              isOpen={isDeleteOpen}
                              onClose={() => setIsDeleteOpen(false)}
                              onSubmit={() => handleDeleteSong(songToDeleteId)}
                            />
                          </>
                        )}

                        <button
                          href=""
                          className="btn btn-success"
                          onClick={() => {
                            setViewSongDetails(category);
                          }}
                        >
                          {" "}
                          <FontAwesomeIcon icon={faEye}  />{" "}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>

              {/* Implementing Creat Song Form */}
               <div className="col-sm-3 mt-5">
              <button
                href=""
                className="btn btn-primary"
                onClick={() => setIsCreateFormOpen(true)}
              >
                <FontAwesomeIcon icon={faPlusCircle} /> Create Song Rank
              </button>

              

              {isCreateFormOpen && (
                <div>
                  <h2 className="text-primary">Welcome {location.state.username} ! </h2>
                  <p className="text-light">Refresh page to see your new ranking!</p>
                  <form>
                    <div className="form-group">
                      <label className="text-white font-weight-bold"> Artist: </label>
                      <input
                        type="text"
                        value={newSongData.artist}
                        className="form-control"
                        onChange={(e) =>
                          setNewSongData({
                            ...newSongData,
                            artist: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div div className="form-group">
                      <label className="text-white font-weight-bold">Song: </label>
                      <input
                        type="text"
                        value={newSongData.song}
                        className="form-control"
                        onChange={(e) =>
                          setNewSongData({
                            ...newSongData,
                            song: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-white font-weight-bold"> Rating:</label>

                      <StarRatingInput
                        newRating={newRating}
                        
                                    setNewRating={setNewRating}
                     
                                    newSongData = {newSongData}
                                    setNewSongData = {setNewSongData} />
                    </div>
                    <button type="button" onClick={handleCreateSong} className="btn btn-success">
                      Create
                    </button>
                  </form>
                </div>
              )}
              {viewSongDetails && (
                <ViewSongForm
                  isOpen={viewSongDetails}
                  onClose={() => setViewSongDetails(null)}
                  songDetails={viewSongDetails}
                />
              )}
            </div>
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default Home;
