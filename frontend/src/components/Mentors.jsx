import React, { useState, useEffect } from "react";
import MentorsCard from "./MentorsCard.jsx";
import MentorsForm from "./MentorsForm.jsx";
// import Card from "./Card.jsx";
import { Dialog } from "@mui/material";
import "./Mentors.css";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";

const Mentors = () => {
  const [showForm, setShowForm] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddMentor = (mentorData) => {
    fetch("http://localhost:3000/mentors/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mentorData),
    })
      .then((response) => response.json())
      .then((newMentor) => {
        setMentors([...mentors, newMentor]);
        toggleForm();
      })
      .catch((error) => {
        console.error("Failed to add mentor:", error);
      });
  };

  const [openEditModal, setOpenEditModal] = useState(false);
  const closeEditModal = ()=>{
    setOpenEditModal(false)
  }

  const [editData, setEditData] = useState(null);
  const handleOpenEditModal = (data)=>{
    setOpenEditModal(true)
    setEditData(data)
  }

  const handleEditMentor = (mentorId, updatedData) => {
    
  };

  const handleDeleteMentor = (mentorId) => {
    fetch(`http://localhost:3000/mentors/${mentorId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          const updatedMentors = mentors.filter(
            (mentor) => mentor._id !== mentorId
          );
          setMentors(updatedMentors);
        } else {
          console.error("Failed to delete mentor:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Failed to delete mentor:", error);
      });
  };

  useEffect(() => {
    const fetchMentorsAndSetState = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/mentors");
        if (!response.ok) {
          throw new Error("Failed to fetch mentors");
        }
        const data = await response.json();
        setMentors(data.mentors);
        console.log(data.mentors);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMentorsAndSetState();
  }, []);

  const [openAddModal, setOpenAddModal] = useState(false);
  const closeAddModal = ()=>{
    setOpenAddModal(false)
  }

  const handleOpenAddModal = ()=>{
    setOpenAddModal(true)
  }

  return (

    <div className="flex app__container">

        <Sidebar
            
          />
    
        <div className="mentors-container">
        <Header title="Mentors" />
          <div className="cards">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : mentors.length > 0 ? (
              mentors.map((mentor) => (
                <MentorsCard
                  key={mentor._id}
                  mentor={mentor}
                  onDeleteMentor={handleDeleteMentor}
                  onEditMentor={handleEditMentor}
                  handleOpenEditModal={handleOpenEditModal}

                />
              ))
            ) : (
              <p>No mentors available.</p>
            )}
          </div>
          <div className="add-mentor">
            <button onClick={handleOpenAddModal}>Add Mentor</button>
          </div>

          <Dialog open={openEditModal} onClose={closeEditModal}>
              <MentorsForm onCancel={closeEditModal} isEdit={true} mentorData={editData}/>
          </Dialog>

          <Dialog open={openAddModal} onClose={closeAddModal}>
              <MentorsForm onCancel={closeAddModal}/>
          </Dialog>

        </div>
    </div>
  );
};

export default Mentors;