import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useNavigate } from 'react-router-dom';
import OpportunityForm from './OpportunityForm.jsx';
import MentorsForm from './MentorsForm.jsx';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';

// Card component for better readability and maintainability
const CardComponent = ({ title, path, handleButtonClick }) => (
  <Card className="dashboard-card">
    <CardContent>
      <h2>{title}</h2>
      <Button variant="contained" color="primary" onClick={() => handleButtonClick(path)}>
        Go to {title}
      </Button>
    </CardContent>
  </Card>
);

const Dashboard = ({activeCategory, handleCategoryClick }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

   // Handles button click, opens dialog
   const handleButtonClick = () => {
    setOpen(true);
  };

  const navigateToOpporunities = () => {
    navigate('/opportunities');
  }

  // Handles form submission, closes dialog and navigates to '/opportunities' path
  const handleFormSubmit = (opportunityData) => {
    // Add opportunityData to your database here
    setOpen(false);
    navigate('/opportunities');
  };


  // Information for each card
  const cardInfo = [
    { id: 2, title: 'Opportunities', path: '/opportunities' },
  ];

  const adminInfo = [
    { id: 1, title: 'Add Mentor', path: '/mentors' },
    { id: 2, title: 'Opportunities', path: '/opportunities' },
    { id: 3, title: 'Add Student', path: '/students' },
  ]

  // Handles form cancellation, closes dialog
  const handleCancel = () => {
    setOpen(false);
  };

  
  const [info, setInfo] = useState(cardInfo);
  const current__user = JSON.parse(localStorage.getItem('guided__user'));

  useEffect(()=>{
    if(current__user.role === 'Admin'){
      setInfo(adminInfo);
    }
  }, [])

  
  const [openAddMentor, setOpenAddMentor] = useState(false);
  const handleOpenAddMentor = () => {
    setOpenAddMentor(true);
  }
  
  const cancelAddMentor = () => {
    setOpenAddMentor(false);
  }

  const [openAddStudent, setOpenAddStudent] = useState(false);
  const handleOpenAddStudent = () => {
    setOpenAddStudent(true);
  }
  
  const cancelAddStudent = () => {
    setOpenAddStudent(false);
  }


  return (

    <div className="flex app__container">
      <Sidebar
            onCategoryClick={handleCategoryClick}
          />
      <div className="dashboard-container">
        <Header />
        <div className="welcome">
          <span>Welcome, {current__user.email}!</span>
          <p>What would you love to do?</p>
        </div>
        <div className="card-container">
          {info.map((card, i) => (
            <CardComponent key={card.id} title={card.title} handleButtonClick={i===0 ? handleOpenAddMentor : navigateToOpporunities} />
          ))}
        </div>
        <Dialog open={open} onClose={handleCancel}>
          <OpportunityForm onFormSubmit={handleFormSubmit} onCancel={handleCancel} />
        </Dialog>

        <Dialog open={openAddMentor} onClose={cancelAddMentor}>
          <MentorsForm onCancel={cancelAddMentor}/>
        </Dialog>
      </div>
      
    
    </div>
  );
};

export default Dashboard;
