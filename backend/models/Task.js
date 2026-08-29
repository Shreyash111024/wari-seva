const mongoose = require("mongoose");


// ============================================
// WARISEVA - TASK MODEL
// ============================================

const taskSchema = new mongoose.Schema({

    // ========================================
    // TASK ID
    // ========================================

    taskId: {
        type: String,
        unique: true,
        required: true
    },


    // ========================================
    // TASK NAME
    // ========================================

    taskName: {
        type: String,
        required: true,
        trim: true
    },


    // ========================================
    // DESCRIPTION
    // ========================================

    description: {
        type: String,
        required: true,
        trim: true
    },


    // ========================================
    // REQUIRED VOLUNTEERS
    // ========================================

    requiredVolunteers: {
        type: Number,
        required: true,
        min: 1
    },


    // ========================================
    // TASK LOCATION
    // ========================================

    location: {

        address: {
            type: String,
            required: true,
            trim: true
        },

        latitude: {
            type: Number,
            required: false
        },

        longitude: {
            type: Number,
            required: false
        }

    },


    // ========================================
    // REQUIRED SKILLS
    // ========================================

    requiredSkills: {
        type: [String],
        default: []
    },


    // ========================================
    // REQUIRED LANGUAGES
    // ========================================

    requiredLanguages: {
        type: [String],
        default: []
    },


    // ========================================
    // WARI DATES
    //
    // FRONTEND:
    //
    // 9 July
    // 10 July
    // 11 July
    //
    // DATABASE:
    //
    // 2026-07-09
    // 2026-07-10
    // 2026-07-11
    // ========================================

    preferredDates: {
        type: [String],

        default: [],

        validate: {

            validator: function (dates) {

                return dates.every(
                    date =>
                        [
                            "2026-07-09",
                            "2026-07-10",
                            "2026-07-11"
                        ].includes(date)
                );

            },

            message:
                "Only 9 July, 10 July and 11 July are valid Wari dates."

        }

    },


    // ========================================
    // TASK TIME
    // ========================================

    time: {

        start: {
            type: String,
            required: true
        },

        end: {
            type: String,
            required: true
        }

    },


    // ========================================
    // TASK STATUS
    // ========================================

    status: {

        type: String,

        enum: [
            "open",
            "closed",
            "completed"
        ],

        default: "open"

    },


    // ========================================
    // CREATED AT
    // ========================================

    createdAt: {
        type: Date,
        default: Date.now
    }

});


module.exports =
    mongoose.model("Task", taskSchema);