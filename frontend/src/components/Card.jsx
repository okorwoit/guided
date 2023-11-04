import React, { useState } from 'react';
import './card.css';

export default function Card({ title, desc, date, duration, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({ title, desc, date, duration });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Reset the edited data to the original data
        setEditedData({ title, desc, date, duration });
    };

    const handleSaveEdit = () => {
        setIsEditing(false);
        // Pass the edited data to the parent component for updating
        onEdit(editedData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData({
            ...editedData,
            [name]: value,
        });
    };

    return (
        <div className='card'>
            {isEditing ? (
                <div className='edit-card'>
                    <label>Title:</label>
                    <input type='text' name='title' value={editedData.title} onChange={handleChange} />
                    <label>Description:</label>
                    <textarea name='desc' value={editedData.desc} onChange={handleChange} />
                    <label>Date:</label>
                    <input type='date' name='date' value={editedData.date} onChange={handleChange} />
                    <label>Duration:</label>
                    <input type='text' name='duration' value={editedData.duration} onChange={handleChange} />
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            ) : (
                <>
                    <div className='title'>{title}</div>
                    <div className='desc'>{desc}</div>
                    <div className='date'>Date: {date}</div>
                    <div className='duration'>Duration: {duration}</div>
                    <div className='buttons'>
                        <button className='b1' onClick={handleEdit}>
                            Edit
                        </button>
                        <button className='b2' onClick={onDelete}>
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
