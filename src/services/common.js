export function getLocation(setUserCoordinates) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            setUserCoordinates({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        });
        return true
    } else {
        console.log("Not Available");
        return false;
    }
}

export const getCurrentYYYYMMDD = () => {
    let date, month, year;
    const dateObject = new Date();

    date = dateObject.getDate();
    month = dateObject.getMonth() + 1;
    year = dateObject.getFullYear();

    date = date
        .toString()
        .padStart(2, '0');

    month = month
        .toString()
        .padStart(2, '0');

    return `${year}-${month}-${date}`;
}