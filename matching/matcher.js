// ============================================
// WARISEVA - VOLUNTEER MATCHING ENGINE
// ============================================
//
// RANKING PRIORITY:
//
// 1. Availability
// 2. Location
// 3. Skills
//
// Availability is mandatory.
//
// Volunteer.js is NOT changed.
//
// ============================================


// ============================================
// NORMALIZE TEXT
// ============================================

function normalize(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .trim()
        .toLowerCase();

}


// ============================================
// CONVERT WARI DATE
// ============================================

function normalizeWariDate(date) {

    const value = normalize(date);

    if (
        value === "9 july" ||
        value === "9 july 2026"
    ) {
        return "2026-07-09";
    }

    if (
        value === "10 july" ||
        value === "10 july 2026"
    ) {
        return "2026-07-10";
    }

    if (
        value === "11 july" ||
        value === "11 july 2026"
    ) {
        return "2026-07-11";
    }

    return value;
}


// ============================================
// GET TASK DATES
// ============================================

function getTaskDates(task) {

    if (
        Array.isArray(task.preferredDates)
    ) {

        return task.preferredDates
            .map(normalizeWariDate)
            .filter(Boolean);

    }

    if (task.date) {

        return [
            normalizeWariDate(task.date)
        ];

    }

    return [];
}


// ============================================
// GET VOLUNTEER DATES
// ============================================
//
// ACTUAL DATABASE FORMAT:
//
// availability.preferredDate
//
// Examples:
//
// "9 July"
// "10 July"
// "9 July, 11 July"
// ============================================

function getVolunteerDates(volunteer) {

    if (
        !volunteer.availability
    ) {
        return [];
    }

    const preferredDate =
        volunteer.availability.preferredDate;


    if (!preferredDate) {
        return [];
    }


    return String(preferredDate)

        .split(",")

        .map(date => date.trim())

        .map(normalizeWariDate)

        .filter(Boolean);
}


// ============================================
// TIME TO MINUTES
// ============================================

function convertTimeToMinutes(time) {

    if (!time) {
        return null;
    }

    const parts =
        String(time)
            .trim()
            .split(":");

    if (parts.length < 2) {
        return null;
    }

    const hours =
        Number(parts[0]);

    const minutes =
        Number(parts[1]);

    if (
        Number.isNaN(hours) ||
        Number.isNaN(minutes)
    ) {
        return null;
    }

    return (
        hours * 60 +
        minutes
    );
}


// ============================================
// GET VOLUNTEER START TIME
// ============================================

function getVolunteerStartTime(
    volunteer
) {

    if (
        !volunteer.availability
    ) {
        return null;
    }

    return volunteer
        .availability
        .startTime;
}


// ============================================
// GET VOLUNTEER END TIME
// ============================================

function getVolunteerEndTime(
    volunteer
) {

    if (
        !volunteer.availability
    ) {
        return null;
    }

    return volunteer
        .availability
        .endTime;
}


// ============================================
// CHECK AVAILABILITY
// ============================================

function checkAvailability(
    volunteer,
    task
) {

    const taskDates =
        getTaskDates(task);

    const volunteerDates =
        getVolunteerDates(volunteer);


    // ========================================
    // DATE MATCH
    // ========================================

    const dateMatch =
        taskDates.some(
            taskDate =>
                volunteerDates.includes(
                    taskDate
                )
        );


    if (!dateMatch) {

        return {
            eligible: false,
            score: 0
        };

    }


    // ========================================
    // TASK TIME
    // ========================================

    const taskStart =
        convertTimeToMinutes(
            task.time &&
            task.time.start
        );

    const taskEnd =
        convertTimeToMinutes(
            task.time &&
            task.time.end
        );


    // ========================================
    // VOLUNTEER TIME
    // ========================================

    const volunteerStart =
        convertTimeToMinutes(
            getVolunteerStartTime(
                volunteer
            )
        );

    const volunteerEnd =
        convertTimeToMinutes(
            getVolunteerEndTime(
                volunteer
            )
        );


    if (
        taskStart === null ||
        taskEnd === null ||
        volunteerStart === null ||
        volunteerEnd === null
    ) {

        return {
            eligible: false,
            score: 0
        };

    }


    // ========================================
    // FULL TIME COVERAGE
    // ========================================

    const timeMatch =
        volunteerStart <= taskStart &&
        volunteerEnd >= taskEnd;


    if (!timeMatch) {

        return {
            eligible: false,
            score: 0
        };

    }


    // ========================================
    // AVAILABLE
    // ========================================

    return {
        eligible: true,
        score: 100
    };
}


// ============================================
// ARRAY SCORE
// ============================================

function calculateArrayScore(
    volunteerItems,
    requiredItems
) {

    if (
        !Array.isArray(requiredItems) ||
        requiredItems.length === 0
    ) {
        return 100;
    }

    if (
        !Array.isArray(volunteerItems) ||
        volunteerItems.length === 0
    ) {
        return 0;
    }


    let matched = 0;


    requiredItems.forEach(
        requiredItem => {

            const found =
                volunteerItems.some(
                    volunteerItem =>
                        normalize(
                            volunteerItem
                        ) ===
                        normalize(
                            requiredItem
                        )
                );


            if (found) {
                matched++;
            }

        }
    );


    return Math.round(

        (
            matched /
            requiredItems.length
        ) * 100

    );
}


// ============================================
// LOCATION SCORE
// ============================================

function calculateLocationScore(
    volunteer,
    task
) {

    if (
        !volunteer.location ||
        !task.location
    ) {
        return 0;
    }


    const vLat =
        volunteer.location.latitude;

    const vLon =
        volunteer.location.longitude;

    const tLat =
        task.location.latitude;

    const tLon =
        task.location.longitude;


    if (
        vLat === undefined ||
        vLat === null ||
        vLon === undefined ||
        vLon === null ||
        tLat === undefined ||
        tLat === null ||
        tLon === undefined ||
        tLon === null
    ) {
        return 0;
    }


    const distance =
        calculateDistance(
            vLat,
            vLon,
            tLat,
            tLon
        );


    let score =
        100 -
        (
            distance * 10
        );


    score =
        Math.max(
            0,
            Math.min(
                100,
                score
            )
        );


    return Math.round(score);
}


// ============================================
// HAVERSINE DISTANCE
// ============================================

function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {

    const earthRadius = 6371;


    const latDifference =
        degreesToRadians(
            lat2 - lat1
        );

    const lonDifference =
        degreesToRadians(
            lon2 - lon1
        );


    const a =
        Math.sin(
            latDifference / 2
        ) ** 2

        +

        Math.cos(
            degreesToRadians(lat1)
        )

        *

        Math.cos(
            degreesToRadians(lat2)
        )

        *

        Math.sin(
            lonDifference / 2
        ) ** 2;


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return (
        earthRadius * c
    );
}


// ============================================
// DEGREES TO RADIANS
// ============================================

function degreesToRadians(
    degrees
) {

    return (
        degrees *
        Math.PI /
        180
    );
}


// ============================================
// MAIN MATCHING FUNCTION
// ============================================

function matchVolunteers(
    volunteers,
    task
) {

    const rankedVolunteers = [];


    volunteers.forEach(
        volunteer => {

            // =================================
            // ONLY AVAILABLE VOLUNTEERS
            // =================================

            if (
                volunteer.status !==
                "available"
            ) {
                return;
            }


            // =================================
            // AVAILABILITY
            // =================================

            const availabilityResult =
                checkAvailability(
                    volunteer,
                    task
                );


            // =================================
            // AVAILABILITY IS MANDATORY
            // =================================

            if (
                !availabilityResult.eligible
            ) {
                return;
            }


            // =================================
            // SKILLS
            // =================================

            const skillScore =
                calculateArrayScore(
                    volunteer.skills,
                    task.requiredSkills
                );


            // =================================
            // LANGUAGES
            // =================================

            const languageScore =
                calculateArrayScore(
                    volunteer.languages,
                    task.requiredLanguages
                );


            // =================================
            // LOCATION
            // =================================

            const locationScore =
                calculateLocationScore(
                    volunteer,
                    task
                );


            // =================================
            // TOTAL SCORE
            //
            // Availability = 40%
            // Location     = 30%
            // Skills       = 20%
            // Language     = 10%
            // =================================

            const totalScore =
                Math.round(

                    (
                        availabilityResult.score *
                        0.40
                    )

                    +

                    (
                        locationScore *
                        0.30
                    )

                    +

                    (
                        skillScore *
                        0.20
                    )

                    +

                    (
                        languageScore *
                        0.10
                    )

                );


            rankedVolunteers.push({

                volunteer,

                totalScore,

                availabilityScore:
                    availabilityResult.score,

                locationScore,

                skillScore,

                languageScore,

                requirementScore: 100

            });

        }
    );


    // ========================================
    // RANKING PRIORITY
    //
    // 1. AVAILABILITY
    // 2. LOCATION
    // 3. SKILLS
    // ========================================

    rankedVolunteers.sort(

        (a, b) => {

            if (
                b.availabilityScore !==
                a.availabilityScore
            ) {

                return (
                    b.availabilityScore -
                    a.availabilityScore
                );

            }


            if (
                b.locationScore !==
                a.locationScore
            ) {

                return (
                    b.locationScore -
                    a.locationScore
                );

            }


            if (
                b.skillScore !==
                a.skillScore
            ) {

                return (
                    b.skillScore -
                    a.skillScore
                );

            }


            return (
                b.totalScore -
                a.totalScore
            );

        }

    );


    // ========================================
    // SELECT REQUIRED NUMBER
    // ========================================

    const selectedVolunteers =
        rankedVolunteers.slice(
            0,
            task.requiredVolunteers
        );


    // ========================================
    // RETURN
    // ========================================

    return {

        rankedVolunteers,

        selectedVolunteers,

        unavailableVolunteers: []

    };
}


// ============================================
// EXPORT
// ============================================

module.exports = {
    matchVolunteers
};