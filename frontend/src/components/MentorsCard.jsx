import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MentorsCard.css';
import axios from 'axios';

const MentorsCard = ({ mentor, onDelete, handleOpenEditModal }) => {
    const current__user = JSON.parse(localStorage.getItem('guided__user'));

    const [deleting, setDeleting] = useState(false);
    const handleDeleteUser = async()=>{
        try{
            setDeleting(true);
            const res = await axios.delete(`http://localhost:3000/users/${mentor._id}`);

            if(res.status===200){
                console.log("User deleted successfully");
                window.location.reload();
            }
        }catch(err){
            console.log(err);
        }
        finally{
            setDeleting(false);
        }

    }


    return (
        <div className="mentor-card">
            <h3 className="mentor-name">{mentor.firstName}</h3>
            <p className="mentor-email">Email: {mentor.email}</p>
            <p className="mentor-expertise">Expertise: {mentor.expertise}</p>
            <p className="mentor-bio">Bio: {mentor.bio}</p>
            {current__user.role === "Admin" &&
            <>
                <button className="edit-button" onClick={()=>handleOpenEditModal(mentor)}>Edit</button>
                <button className="delete-button" onClick={handleDeleteUser}>{deleting ? "Progress...":"Delete"}</button>
            </>            
            }
        </div>
    );
};

MentorsCard.propTypes = {
    mentor: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        expertise: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default MentorsCard;