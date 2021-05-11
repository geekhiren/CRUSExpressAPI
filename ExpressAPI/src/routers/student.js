const express = require("express");
const Student = require("../models/students");

//1. create a new router
const router = new express.Router();



//2. we need to define the router
// router.get("/", (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader("Access-Control-Max-Age", "4200");
//     res.setHeader("Access-Control-Allow-Headers", "content-type");
//     res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
//      });

//using async post student
router.post("/students", async (req, res) => {
    try {
        const user = Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);

    } catch (e) { res.status(400).send(e); }
});

//read the data of students
router.get("/students", async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (e) { res.send(e); }
});

//read the data of students base id
router.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);

        if (!studentData) {
            return res.status(404).send();
        } else {
            res.send(studentData);
        }
    } catch (e) { res.send(e); }
});


//update student data
router.patch("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateStudentData = await Student.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(updateStudentData);
    } catch (e) { res.status(404).send(e); }
});


//delete data on students
router.delete("/students/:id", async (req, res) => {
    try {
        const deleteStudentData = await Student.findByIdAndDelete(req.params.id);
        if (!deleteStudentData) {
            return res.status(404).send();
        } else {
            res.send(deleteStudentData);
        }
    } catch (e) { res.status(500).send(e); }
});


module.exports = router;