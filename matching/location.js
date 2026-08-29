// ============================================
// WARISEVA - Location / Distance Calculator
// ============================================


// ============================================
// Calculate distance between two locations
// using the Haversine Formula
// ============================================

function calculateDistance(location1, location2) {

    const lat1 = location1.latitude;
    const lon1 = location1.longitude;

    const lat2 = location2.latitude;
    const lon2 = location2.longitude;


    // Convert degrees to radians

    const toRadians = degrees => {
        return degrees * Math.PI / 180;
    };


    const earthRadius = 6371;


    const dLat =
        toRadians(lat2 - lat1);

    const dLon =
        toRadians(lon2 - lon1);


    const a =
        Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +

        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *

        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    const distance =
        earthRadius * c;


    return distance;
}


module.exports = {
    calculateDistance
};