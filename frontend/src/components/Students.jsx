import React, { useState, useEffect } from "react";
import StudentsCard from "./StudentsCard.jsx";
import StudentsForm from "./StudentsForm.jsx";
import { Dialog } from "@mui/material";
import "./Students.css";
import Sidebar from "./Sidebar.jsx";

const Students = (
  { activeCategory, handleCategoryClick }
) => {
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddStudent = (studentData) => {
    fetch("http://localhost:3000/students/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then((response) => response.json())
      .then((newStudent) => {
        setStudents([...students, newStudent]);
        toggleForm();
      })
      .catch((error) => {
        console.error("Failed to add student:", error);
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

  const handleEditStudent = (studentId, updatedData) => {
    
  };

  const handleDeleteStudent = (studentId) => {
    fetch(`http://localhost:3000/students/${studentId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          const updatedStudents = students.filter(
            (student) => student._id !== studentId
          );
          setStudents(updatedStudents);
        } else {
          console.error("Failed to delete student:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Failed to delete student:", error);
      });
  };

  useEffect(() => {
    const fetchStudentsAndSetState = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/students");
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();
        setStudents(data.students);
        console.log(data.students);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchStudentsAndSetState();
  }, []);

  const [openAddModal, setOpenAddModal] = useState(false);
  const closeAddModal = ()=>{
    setOpenAddModal(false)
  }

  const handleOpenAddModal = ()=>{
    setOpenAddModal(true)
  }

  return (
    <>
      <Sidebar
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
          />
    
        <div className="students-container">
          <div className="cards">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : students?.length > 0 ? (
              students?.map((student) => (
                <StudentsCard
                  key={student._id}
                  student={student}
                  onDeleteStudent={handleDeleteStudent}
                  onEditStudent={handleEditStudent}
                  handleOpenEditModal={handleOpenEditModal}
                />
              ))
            ) : (
              <p>No students available.</p>
            )}
          </div>
          <div className="add-student">
            <button className="add-student-button" onClick={handleOpenAddModal}>Add Student</button>
          </div>

          <Dialog open={openEditModal} onClose={closeEditModal}>
              <StudentsForm onCancel={closeEditModal} isEdit={true} studentData={editData}/>
          </Dialog>

          <Dialog open={openAddModal} onClose={closeAddModal}>
              <StudentsForm onCancel={closeAddModal}/>
          </Dialog>

        </div>
    </>
  );
};

export default Students;