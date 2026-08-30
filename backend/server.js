// ============================================
// WARISEVA - BACKEND SERVER
// ============================================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const Volunteer = require("./models/Volunteer");
const Task = require("./models/Task");

const {
    matchVolunteers
} = require("../matching/matcher");


const app = express();


// ============================================
// MIDDLEWARE
// ============================================

app.use(cors());

app.use(
    express.json()
);


// ============================================
// HOME ROUTE
// ============================================

app.get("/", (req, res) => {

    res.json({

        message:
            "WARISEVA backend is running"

    });

});


// ============================================
// HELPER
// CONVERT FRONTEND DATE TO DATABASE DATE
// ============================================
//
// Frontend:
//
// 9 July
// 10 July
// 11 July
//
// Database:
//
// 2026-07-09
// 2026-07-10
// 2026-07-11
// ============================================

function convertWariDate(
    date
) {

    if (!date) {

        return null;

    }


    const value =
        String(date)
            .trim()
            .toLowerCase();


    if (
        value === "9 july"
    ) {

        return "2026-07-09";

    }


    if (
        value === "10 july"
    ) {

        return "2026-07-10";

    }


    if (
        value === "11 july"
    ) {

        return "2026-07-11";

    }


    // Already standardized
    if (
        [
            "2026-07-09",
            "2026-07-10",
            "2026-07-11"
        ].includes(value)
    ) {

        return value;

    }


    return null;

}


// ============================================
// CONVERT ARRAY OF DATES
// ============================================

function convertWariDates(
    dates
) {

    if (
        !Array.isArray(dates)
    ) {

        return [];

    }


    return dates

        .map(
            convertWariDate
        )

        .filter(Boolean);

}


// ============================================
// VOLUNTEER REGISTRATION
// ============================================

app.post(
    "/api/volunteers",
    async (req, res) => {

        try {

            const volunteer =
                new Volunteer(
                    req.body
                );


            await volunteer.save();


            res.status(201).json({

                message:
                    "Volunteer registered successfully",

                volunteer

            });

        }

        catch (error) {

            console.error(

                "Volunteer registration failed:",

                error.message

            );


            res.status(400).json({

                message:
                    "Volunteer registration failed",

                error:
                    error.message

            });

        }

    }
);


// ============================================
// GET ALL VOLUNTEERS
// ============================================

app.get(
    "/api/volunteers",
    async (req, res) => {

        try {

            const volunteers =
                await Volunteer.find();


            res.status(200).json({

                count:
                    volunteers.length,

                volunteers

            });

        }

        catch (error) {

            console.error(

                "Fetching volunteers failed:",

                error.message

            );


            res.status(500).json({

                message:
                    "Failed to fetch volunteers",

                error:
                    error.message

            });

        }

    }
);


// ============================================
// LOGIN
// ============================================

app.post(
    "/api/login",
    async (req, res) => {

        try {

            const {
                phone,
                password
            } = req.body;


            const volunteer =
                await Volunteer.findOne({

                    phone

                });


            if (!volunteer) {

                return res.status(401).json({

                    message:
                        "Invalid phone number or password"

                });

            }


            if (
                volunteer.password !==
                password
            ) {

                return res.status(401).json({

                    message:
                        "Invalid phone number or password"

                });

            }


            res.status(200).json({

                message:
                    "Login successful",

                volunteer

            });

        }

        catch (error) {

            console.error(

                "Login failed:",

                error.message

            );


            res.status(500).json({

                message:
                    "Login failed",

                error:
                    error.message

            });

        }

    }
);


// ============================================
// CREATE TASK
// ============================================

app.post(
    "/api/tasks",
    async (req, res) => {

        try {

            const data = {

                ...req.body,

                // =================================
                // CONVERT FRONTEND DATES
                // =================================

                preferredDates:
                    convertWariDates(
                        req.body.preferredDates
                    )

            };


            // ==================================
            // VALIDATE DATE SELECTION
            // ==================================

            if (
                data.preferredDates.length === 0
            ) {

                return res.status(400).json({

                    message:
                        "Please select at least one valid Wari date.",

                    allowedDates: [

                        "9 July",

                        "10 July",

                        "11 July"

                    ]

                });

            }


            const task =
                new Task(data);


            await task.save();


            res.status(201).json({

                message:
                    "Task created successfully",

                task

            });

        }

        catch (error) {

            console.error(

                "Task creation failed:",

                error.message

            );


            res.status(400).json({

                message:
                    "Task creation failed",

                error:
                    error.message

            });

        }

    }
);


// ============================================
// GET ALL TASKS
// ============================================

app.get(
    "/api/tasks",
    async (req, res) => {

        try {

            const tasks =
                await Task.find();


            res.status(200).json({

                count:
                    tasks.length,

                tasks

            });

        }

        catch (error) {

            console.error(

                "Fetching tasks failed:",

                error.message

            );


            res.status(500).json({

                message:
                    "Failed to fetch tasks",

                error:
                    error.message

            });

        }

    }
);


// ============================================
// GET SINGLE TASK
// ============================================

app.get(
    "/api/tasks/:taskId",
    async (req, res) => {

        try {

            const task =
                await Task.findOne({

                    taskId:
                        req.params.taskId

                });


            if (!task) {

                return res.status(404).json({

                    message:
                        "Task not found"

                });

            }


            res.status(200).json({

                task

            });

        }

        catch (error) {

            console.error(

                "Fetching task failed:",

                error.message

            );


            res.status(500).json({

                message:
                    "Failed to fetch task",

                error:
                    error.message

            });

        }

    }
);


// ============================================
// MATCH VOLUNTEERS FOR TASK
// ============================================

app.get(
    "/api/tasks/:taskId/matches",
    async (req, res) => 
{

        try {

            // =================================
            // FIND TASK
            // =================================

            const task =
                await Task.findOne({

                    taskId:
                        req.params.taskId

                });


            if (!task) {

                return res.status(404).json({

                    message:
                        "Task not found"

                });

            }


            // =================================
            // GET AVAILABLE VOLUNTEERS
            // =================================

            const volunteers =
                await Volunteer.find({

                    status:
                        "available"

                });


            // =================================
            // RUN MATCHING
            // =================================

            const result =
                matchVolunteers(

                    volunteers,

                    task

                );


            // =================================
            // SHORTAGE
            // =================================

            const shortage =
                Math.max(

                    0,

                    task.requiredVolunteers -

                    result.rankedVolunteers.length

                );


            // =================================
            // RESPONSE
            // =================================

            res.status(200).json({

                message:
                    "Volunteer matching completed",


                task: {

                    taskId:
                        task.taskId,

                    taskName:
                        task.taskName,

                    preferredDates:
                        task.preferredDates,

                    time:
                        task.time,

                    requiredVolunteers:
                        task.requiredVolunteers

                },


                requiredVolunteers:
                    task.requiredVolunteers,


                eligibleVolunteers:
                    result.rankedVolunteers.length,


                shortage,


                rankedVolunteers:
                    result.rankedVolunteers,


                selectedVolunteers:
                    result.selectedVolunteers

            });

        }

        catch (error) {

            console.error(

                "Matching failed:",

                error.message

            );


            res.status(500).json({

                message:
                    "Volunteer matching failed",

                error:
                    error.message

            });

        }

    }
);
// ============================================
// MATCH SINGLE VOLUNTEER WITH TASK
// ============================================

app.get(
    "/api/tasks/:taskId/match/:volunteerId",
    async (req, res) => {

        try {

            // Find task
            const task =
                await Task.findOne({
                    taskId:
                        req.params.taskId
                });

            if (!task) {

                return res.status(404).json({
                    message:
                        "Task not found"
                });

            }


            // Find volunteer
            const volunteer =
                await Volunteer.findOne({
                    volunteerId:
                        req.params.volunteerId
                });

            if (!volunteer) {

                return res.status(404).json({
                    message:
                        "Volunteer not found"
                });

            }


            // Run matching engine
            const result =
                matchVolunteers(
                    [volunteer],
                    task
                );


            // Check if volunteer matched
            const matched =
                result.rankedVolunteers.length > 0;


            // Send result
            res.status(200).json({

                message:
                    "Volunteer-task matching completed",

                taskId:
                    task.taskId,

                volunteerId:
                    volunteer.volunteerId,

                matched,

                rankedVolunteers:
                    result.rankedVolunteers,

                selectedVolunteers:
                    result.selectedVolunteers

            });

        }
        catch (error) {

            console.error(
                "Volunteer matching failed:",
                error.message
            );


            res.status(500).json({

                message:
                    "Volunteer-task matching failed",

                error:
                    error.message

            });

        }

    }
);
// ============================================

// ============================================
// DATABASE CONNECTION
// ============================================

mongoose

    .connect(
        process.env.MONGO_URI
    )

    .then(() => {

        console.log(
            "MongoDB connected successfully"
        );


        app.listen(

            5000,

            () => {

                console.log(

                    "Server running on http://localhost:5000"

                );

            }

        );

    })

    .catch(
        error => {

            console.error(

                "MongoDB connection failed:",

                error.message

            );

        }
    );