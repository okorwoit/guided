import React, { useState, useEffect } from "react";
import "./opp.css";
import Card from "./Card.jsx";
import OpportunityForm from "./OpportunityForm.jsx";
import Sidebar from "./Sidebar.jsx";
import { Dialog } from "@mui/material";
import Header from "./Header.jsx";

const Opportunities = ({}) => {

  const current__user = JSON.parse(localStorage.getItem('guided__user'));

  // State variables
  const [showForm, setShowForm] = useState(false); // Controls the visibility of the form
  const [opportunities, setOpportunities] = useState([]); // Stores the list of opportunities
  const [filteredOpportunities, setFilteredOpportunities] = useState([]); // Stores the filtered list of opportunities
  const [loading, setLoading] = useState(true); // Indicates whether the opportunities are being loaded
  const [error, setError] = useState(null); // Stores any error that occurred while fetching the opportunities
  const [filter, setFilter] = useState("All"); // Stores the current filter category

  

  // Adds a new opportunity
  const handleAddOpportunity = (opportunityData) => {
    // Send a POST request to the server
    fetch("http://localhost:3000/mentoring/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(opportunityData),
    })
      .then((response) => response.json())
      .then((newOpportunity) => {
        // Add the new opportunity to the list and close the form
        setOpportunities([...opportunities, newOpportunity]);
        toggleForm();
      })
      .catch((error) => {
        console.error("Failed to add opportunity:", error);
      });
  };

  // Filters the opportunities by category
  const filterOpportunities = (category) => {
    setFilter(category);
    if (category === "All") {
      setFilteredOpportunities(opportunities);
    } else {
      const filtered = opportunities.filter(
        (opportunity) => opportunity.category === category
      );
      setFilteredOpportunities(filtered);
    }
  };

  // Edits an existing opportunity
  const handleEditOpportunity = (opportunityId, updatedData) => {
    // Send a PATCH request to the server
    console.log(updatedData);
    fetch(`http://localhost:3000/mentoring/${opportunityId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((updatedOpportunity) => {
        // Update the opportunity in the list
        window.location.reload();
        const updatedOpportunities = opportunities.map((opportunity) => {
          if (opportunity._id === updatedOpportunity._id) {
            return updatedOpportunity;
          }
          return opportunity;
        });
        setOpportunities(updatedOpportunities);
      })
      .catch((error) => {
        console.error("Failed to edit opportunity:", error);
      });
  };

  // Deletes an opportunity
  const handleDeleteOpportunity = (opportunityId) => {
    // Send a DELETE request to the server
    fetch(`http://localhost:3000/mentoring/${opportunityId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          // If the server responded with a status of 200, remove the deleted opportunity from the list
          
        } else {
          console.error("Failed to delete opportunity:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Failed to delete opportunity:", error);
      })
      .finally(() => {
        window.location.reload();
      });
  };

  // Fetch opportunities when the component mounts
  useEffect(() => {
    const fetchOpportunitiesAndSetState = async () => {
      try {
        const response = await fetch("http://localhost:3000/mentoring");
        if (!response.ok) {
          throw new Error("Failed to fetch opportunities");
        }
        const data = await response.json();
        setOpportunities(data.mentoringOpportunities);
        setFilteredOpportunities(data.mentoringOpportunities);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOpportunitiesAndSetState();
  }, []); // Only run on first render // Empty dependency array

  const [open, setOpen] = useState(false);
  const handleCancel = () => {
    setOpen(false);
  }

  // Toggles the visibility of the form
  const toggleForm = () => {
    setOpen((prevOpen) => !prevOpen)
  };

  const [openEdit, setOpenEdit] = useState(false);
  const handleCancelEdit = () => {
    setOpenEdit(false);
  }

  const [currentCardData, setCurrentFormData] = useState(null);
  const handleOpenEditModal = (data)=>{
    setOpenEdit(true)
    setCurrentFormData(data)
  }


  // Render the component
  return (

    <div className="flex app__container">

      <Sidebar
          
        />
    
      <div className="opportunities-container">
      <Header title="Opportunities" />
        {/* Filter buttons */}
        <div className="button-container">
          <button
            className={`button ${filter === "All" ? "active" : ""}`}
            onClick={() => filterOpportunities("All")}
          >
            All
          </button>
          <button
            className={`button ${filter === "Career Advice" ? "active" : ""}`}
            onClick={() => filterOpportunities("Career Advice")}
          >
            Career Advice
          </button>
          <button
            className={`button ${filter === "Resume Review" ? "active" : ""}`}
            onClick={() => filterOpportunities("Resume Review")}
          >
            Resume Review
          </button>
          <button
            className={`button ${filter === "Mock Interviews" ? "active" : ""}`}
            onClick={() => filterOpportunities("Mock Interviews")}
          >
            Mock Interview
          </button>
        </div>
        {/* Opportunities list */}
        <div className="cards">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : filteredOpportunities.length > 0 ? (
            filteredOpportunities.map((opportunity) => (
              <Card
                key={opportunity._id}
                data={opportunity}
                onEdit={handleOpenEditModal}
                onDelete={() => handleDeleteOpportunity(opportunity._id)}
              />
            ))
          ) : (
            <p>No events available.</p>
          )}
        </div>
        {/* Add opportunity button */}
        <div className="add-opp">
          <button onClick={toggleForm}>Add Opportunity</button>
        </div>

        {/* Conditionally render the OpportunityForm based on showForm state */}
        <Dialog open={open} onClose={handleCancel}>
          <OpportunityForm onAddOpportunity={handleAddOpportunity} closeModal={handleCancel}/>
        </Dialog>

        <Dialog open={openEdit} onClose={handleCancelEdit}>
          <OpportunityForm 
            onAddOpportunity={handleAddOpportunity} 
            closeModal={handleCancelEdit}
            isEdit={true}
            opportunityData={currentCardData}
            handleEditOpportunity={handleEditOpportunity}
          />
        </Dialog>
      
      </div>
    </div>
  );
};

export default Opportunities;
