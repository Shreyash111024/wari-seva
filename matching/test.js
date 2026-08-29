// ============================================
// WARISEVA - Matching Engine Test
// ============================================

const {
    matchVolunteers
} = require("./matcher");



// ============================================
// SAMPLE VOLUNTEERS
// ============================================

const volunteers = [

    // ========================================
    // PRIYA
    // ========================================

    {
        volunteerId: "V001",

        name: "Priya Patil",

        age: 21,

        phone: "9876543210",

        location: {

            address:
                "Kolhapur, Maharashtra",

            latitude:
                16.7050,

            longitude:
                74.2433
        },

        skills: [

            "First Aid",

            "Crowd Management"

        ],

        languages: [

            "Marathi",

            "Hindi"

        ],

        availability: {

            days: [

                "2026-07-09",

                "2026-07-10",

                "2026-07-11"

            ],

            startTime:
                "09:00",

            endTime:
                "18:00"

        },

        status:
            "available",

        registeredAt:
            "2026-06-29T10:30:00"
    },


    // ========================================
    // RAHUL
    // ========================================

    {
        volunteerId: "V002",

        name: "Rahul Sharma",

        age: 24,

        phone: "9876543211",

        location: {

            address:
                "Kolhapur, Maharashtra",

            latitude:
                16.7100,

            longitude:
                74.2500
        },

        skills: [

            "Driving"

        ],

        languages: [

            "Hindi"

        ],

        availability: {

            days: [

                "2026-07-09",

                "2026-07-10"

            ],

            startTime:
                "09:00",

            endTime:
                "18:00"

        },

        status:
            "available",

        registeredAt:
            "2026-06-29T10:40:00"
    },


    // ========================================
    // SNEHA
    // ========================================

    {
        volunteerId: "V003",

        name: "Sneha Kulkarni",

        age: 22,

        phone: "9876543212",

        location: {

            address:
                "Kolhapur, Maharashtra",

            latitude:
                16.6800,

            longitude:
                74.2200
        },

        skills: [

            "First Aid"

        ],

        languages: [

            "Marathi"

        ],

        availability: {

            days: [

                "2026-07-10",

                "2026-07-11"

            ],

            startTime:
                "08:00",

            endTime:
                "20:00"

        },

        status:
            "available",

        registeredAt:
            "2026-06-29T10:45:00"
    },


    // ========================================
    // ADITYA
    // ========================================

    {
        volunteerId: "V004",

        name: "Aditya Joshi",

        age: 23,

        phone: "9876543213",

        location: {

            address:
                "Kolhapur, Maharashtra",

            latitude:
                16.7055,

            longitude:
                74.2440
        },

        skills: [

            "First Aid",

            "Crowd Management"

        ],

        languages: [

            "Marathi"

        ],

        availability: {

            days: [

                "2026-07-09",

                "2026-07-11"

            ],

            startTime:
                "09:00",

            endTime:
                "18:00"

        },

        status:
            "available",

        registeredAt:
            "2026-06-29T10:50:00"
    }

];



// ============================================
// SAMPLE TASK
// ============================================

const task = {

    taskId:
        "T001",

    taskName:
        "Flood Relief Assistance",

    description:
        "Assist with distribution of essential supplies.",

    location: {

        address:
            "Panchganga Riverside, Kolhapur",

        latitude:
            16.7000,

        longitude:
            74.2400
    },

    requiredVolunteers:
        3,

    requiredSkills: [

        "First Aid",

        "Crowd Management"

    ],

    requiredLanguages: [

        "Marathi"

    ],


    // ========================================
    // WARI DATE
    // ========================================

    date:
        "2026-07-10",


    time: {

        start:
            "09:00",

        end:
            "17:00"

    },


    extraRequirements: [],


    status:
        "open",


    createdAt:
        "2026-06-29T11:00:00"

};



// ============================================
// RUN MATCHING
// ============================================

const result =
    matchVolunteers(
        volunteers,
        task
    );



// ============================================
// DISPLAY TASK
// ============================================

console.log(
    "\n=========================================="
);

console.log(
    "             WARISEVA TASK"
);

console.log(
    "=========================================="
);

console.log(
    "Task:",
    task.taskName
);

console.log(
    "Date:",
    task.date
);

console.log(
    "Time:",
    task.time.start,
    "-",
    task.time.end
);

console.log(
    "Required Volunteers:",
    task.requiredVolunteers
);



// ============================================
// RANKED VOLUNTEERS
// ============================================

console.log(
    "\n=========================================="
);

console.log(
    "          RANKED VOLUNTEERS"
);

console.log(
    "==========================================\n"
);


if (
    result.rankedVolunteers.length === 0
) {

    console.log(
        "No eligible volunteers found."
    );

}
else {

    result.rankedVolunteers.forEach(
        (item, index) => {

            console.log(
                `${index + 1}. ${item.volunteer.name}`
            );


            console.log(
                `   Volunteer ID: ${item.volunteer.volunteerId}`
            );


            console.log(
                `   Total Match: ${item.totalScore}%`
            );


            console.log(
                `   Availability: ${item.availabilityScore}%`
            );


            console.log(
                `   Location: ${item.locationScore}%`
            );


            console.log(
                `   Skills: ${item.skillScore}%`
            );


            console.log(
                `   Language: ${item.languageScore}%`
            );


            console.log(
                `   Extra Requirements: ${item.requirementScore}%`
            );


            console.log("");

        }
    );

}



// ============================================
// SELECTED VOLUNTEERS
// ============================================

console.log(
    "\n=========================================="
);

console.log(
    "          SELECTED VOLUNTEERS"
);

console.log(
    "==========================================\n"
);


if (
    result.selectedVolunteers.length === 0
) {

    console.log(
        "No volunteers selected."
    );

}
else {

    result.selectedVolunteers.forEach(
        (item, index) => {

            console.log(

                `${index + 1}. ✓ ${item.volunteer.name} - ${item.totalScore}%`

            );

        }
    );

}



// ============================================
// SHORTAGE CHECK
// ============================================

const required =
    task.requiredVolunteers;

const selected =
    result.selectedVolunteers.length;

const shortage =
    required - selected;


console.log(
    "\n=========================================="
);

console.log(
    "          VOLUNTEER REQUIREMENT"
);

console.log(
    "==========================================\n"
);


console.log(
    "Required:",
    required
);

console.log(
    "Available:",
    selected
);


if (shortage > 0) {

    console.log(
        `⚠ Additional Volunteers Required: ${shortage}`
    );

}
else {

    console.log(
        "✓ Volunteer requirement fulfilled."
    );

}

console.log(
    "\n==========================================\n"
);