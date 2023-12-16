import React, { useState } from 'react';
import './card.css';

export default function Card({ data, onEdit, onDelete }) {

    return (
        <div className='card'>
            <div className='title'>{data.title}</div>
            <div className='desc'>{data.desc}</div>
            <div className='date'>Date: {new Date(data.date).toDateString()}</div>
            <div className='duration'>Duration: {data.duration}</div>
            <div className='buttons'>
                <button className='b1' onClick={()=>onEdit(data)}>
                    Edit
                </button>
                <button className='b2' onClick={onDelete}>
                    Delete
                </button>
            </div>

        </div>
    );
}
