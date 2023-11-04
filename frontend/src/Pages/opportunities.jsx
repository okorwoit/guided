import React, { useState, useEffect } from 'react';
import './opp.css';
import Card from '../components/Card';
import OpportunityForm from '../components/OpportunityForm.jsx';

const Opportunities = () => {
    const [showForm, setShowForm] = useState(false);
    const [opportunities, setOpportunities] = useState([]);
    const [filteredOpportunities, setFilteredOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');

    // Function to toggle the visibility of the form
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    // Function to handle adding an opportunity
    const handleAddOpportunity = (opportunityData) => {
        fetch('http://localhost:3000/mentoring/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(opportunityData),
        })
            .then((response) => response.json())
            .then((newOpportunity) => {
                setOpportunities([...opportunities, newOpportunity]);
                toggleForm(); // Close the form after adding
            })
            .catch((error) => {
                console.error('Failed to add opportunity:', error);
            });
    };

    // Function to handle filtering opportunities
    const filterOpportunities = (category) => {
        setFilter(category);
        if (category === 'All') {
            setFilteredOpportunities(opportunities);
        } else {
            const filtered = opportunities.filter((opportunity) => opportunity.category === category);
            setFilteredOpportunities(filtered);
        }
    };

    // Function to handle editing an opportunity
    const handleEditOpportunity = (opportunityId, updatedData) => {
        fetch(`http://localhost:3000/mentoring/${opportunityId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => response.json())
            .then((updatedOpportunity) => {
                // Assuming that the server responds with the updated opportunity
                const updatedOpportunities = opportunities.map((opportunity) => {
                    if (opportunity._id === updatedOpportunity._id) {
                        return updatedOpportunity;
                    }
                    return opportunity;
                });
                setOpportunities(updatedOpportunities);
            })
            .catch((error) => {
                console.error('Failed to edit opportunity:', error);
            });
    };

    // Function to handle deleting an opportunity
    const handleDeleteOpportunity = (opportunityId) => {
        fetch(`http://localhost:3000/mentoring/${opportunityId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.status === 200) {
                    // Remove the deleted opportunity from the UI
                    const updatedOpportunities = opportunities.filter(
                        (opportunity) => opportunity._id !== opportunityId
                    );
                    setOpportunities(updatedOpportunities);
                } else {
                    console.error('Failed to delete opportunity:', response.statusText);
                }
            })
            .catch((error) => {
                console.error('Failed to delete opportunity:', error);
            });
    };


    useEffect(() => {
        const fetchOpportunitiesAndSetState = async () => {
            try {
                const response = await fetch('http://localhost:3000/mentoring');
                if (!response.ok) {
                    throw new Error('Failed to fetch opportunities');
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
    }, [opportunities]);

    return (
        <div className="opportunities-container">
            <div className="button-container">
                <button
                    className={`button ${filter === 'All' ? 'active' : ''}`}
                    onClick={() => filterOpportunities('All')}
                >
                    All
                </button>
                <button
                    className={`button ${filter === 'Career Advice' ? 'active' : ''}`}
                    onClick={() => filterOpportunities('Career Advice')}
                >
                    Career Advice
                </button>
                <button
                    className={`button ${filter === 'Resume Review' ? 'active' : ''}`}
                    onClick={() => filterOpportunities('Resume Review')}
                >
                    Resume Review
                </button>
                <button
                    className={`button ${filter === 'Mock Interview' ? 'active' : ''}`}
                    onClick={() => filterOpportunities('Mock Interview')}
                >
                    Mock Interview
                </button>
            </div>
            <div className="cards">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : filteredOpportunities.length > 0 ? (
                    filteredOpportunities.map((opportunity) => (
                        <Card
                            key={opportunity._id}
                            title={opportunity.title}
                            desc={opportunity.description}
                            date={opportunity.date}
                            duration={opportunity.duration}
                            onEdit={(updatedData) =>
                                handleEditOpportunity(opportunity._id, updatedData)
                            }
                            onDelete={() => handleDeleteOpportunity(opportunity._id)}
                        />
                    ))
                ) : (
                    <p>No events available.</p>
                )}
            </div>
            <div className="add-opp">
                <button onClick={toggleForm}>Add Opportunity</button>
            </div>

            {/* Conditionally render the OpportunityForm based on showForm state */}
            {showForm && <OpportunityForm onAddOpportunity={handleAddOpportunity} />}
        </div>
    );
};

export default Opportunities;
