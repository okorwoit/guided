import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './StudentsCard.css';
import axios from 'axios';

const StudentsCard = ({ student, onDelete, handleOpenEditModal }) => {

    const [deleting, setDeleting] = useState(false);
    const handleDeleteUser = async()=>{
        try{
            setDeleting(true);
            const res = await axios.delete(`http://localhost:3000/users/${student._id}`);

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
        <div className="student-card">
            <h3 className="student-name">{student.firstName}</h3>
            <p className="student-email">Email: {student.email}</p>
            <p className="student-expertise">Expertise: {student.expertise}</p>
            <p className="student-bio">Bio: {student.bio}</p>
            <button className="edit-button" onClick={()=>handleOpenEditModal(student)}>Edit</button>
            <button className="delete-button" onClick={handleDeleteUser}>{deleting ? "Progress...":"Delete"}</button>
        </div>
    );
};

StudentsCard.propTypes = {
    student: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        expertise: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default StudentsCard;