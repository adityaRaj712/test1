// const express = require("express");
import express from "express";
const app = express();
const port = 8000;

// Middleware to parse JSON body in requests
app.use(express.json());

// In-memory "database"
let students = 
    [
        {
          "Uid": "1",
          "sem1": "8.5",
          "sem2": "9.0",
          "cgpa": "8.75"
        },
        {
          "Uid": "2",
          "sem1": "9.0",
          "sem2": "8.5",
          "cgpa": "8.75"
        },
        {
          "Uid": "3",
          "sem1": "9.5",
          "sem2": "9.5",
          "cgpa": "9.5"
        },
        {
          "Uid": "4",
          "sem1": "8.0",
          "sem2": "8.0",
          "cgpa": "8.0"
        },
        {
          "Uid": "5",
          "sem1": "7.5",
          "sem2": "7.0",
          "cgpa": "7.25"
        }
      ]




  
  // GET - List all students
  app.get("/students", (req, res) => {
    res.json(students);
  });
  



// POST - Create a new student
app.post("/students", (req, res) => {
  students.push(req.body);
  res.send("student added");
});


// PUT - Modify information of a course
app.put("/students/:Uid", (req, res) => {
    const index = students.findIndex(
      (student) => student.Uid === req.params.Uid
    );
    if (index === -1) {
      res.status(404).send("Student not found");
    } else {
      students[index] = { ...students[index], ...req.body };
      res.send("Student detail updated");
    }
  });

// PATCH - Update specific fields of a student
app.patch("/students/:Uid", (req, res) => {
    const index = students.findIndex(
      (student) => student.Uid === req.params.Uid
    );
  
    if (index === -1) {
      res.status(404).send("Student not found");
    } else {
      // Update only the provided fields in the request body
      students[index] = { ...students[index], ...req.body };
      res.send("Student details updated");
    }
  });

// DELETE - Remove a student by Uid
app.delete("/students/:Uid", (req, res) => {
    const index = students.findIndex(
      (student) => student.Uid === req.params.Uid
    );
  
    if (index === -1) {
      res.status(404).send("Student not found");
    } else {
      students.splice(index, 1);
      res.send("Student removed");
    }
  });
  



app.get("/*", (req, res) => {
  res.send("You are on worng route. Here's the list of possible routes");
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
