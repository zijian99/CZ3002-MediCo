import React, { useState } from "react";

export default function Position() {
    const [postal, setPostal] = useState("");
    const [userCoordinates, setUserCoordinates] = useState({
        latitude: null,
        longitude: null,
    });
    const geoData = require("../data/buildings.json");
    const GPData = require("../data/GP.json");

    return (
        <div className="Positioning" onLoad={setPage()}>
            <img
                id="localMap"
                src='https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&lat=1.31955&lng=103.84223&zoom=17&height=512&width=400&polygons=&lines=&points=[1.31955,103.84223,"255,255,178","A"]&color=&fillColor='
            />
            <p></p>
            <button
                onClick={handleUseMyLocation}
                className="btn btn-secondary btn-sm m-2"
            >
                Use My Position
            </button>
            <form onSubmit={handleSubmitPostal}>
                <label>
                    Enter Postal:
                    <input
                        type="text"
                        placeholder="e.g. 100000"
                        value={postal}
                        onChange={(e) => setPostal(e.target.value)}
                    />
                </label>
                <input type="submit" />
            </form>
            <p id="locationString"></p>
            <p id="GPString"></p>
        </div>
    );

    function handleSubmitPostal(event) {
        event.preventDefault();
        const coord = validatePostal();
        if (coord == -1) {
            document.getElementById("locationString").innerHTML =
                "Invalid input. Please re-enter";
            return;
        } else if (coord == 0) {
            document.getElementById("locationString").innerHTML =
                "Your input does not match any location.";
            return;
        }
        setUserCoordinates({
            latitude: coord[0],
            longitude: coord[1],
        })
        displayLocation();
        displayGP(getNearestGP());
    }

    function validatePostal() {
        if (postal.length != 6) {
            return -1;
        } else {
            for (let i = 0; i < 6; i++) {
                if (47 < postal.charCodeAt(i) && postal.charCodeAt(i) < 58)
                    continue;
                else return -1;
            }
        }
        const coord = postalToCoordinates(postal);
        if (coord == null) {
            return 0;
        }
        return coord;
    }

    function handleUseMyLocation() {
		getUserLocation();
        displayLocation();
        displayGP(getNearestGP());
    }

    function getNearestGP() {
        let minDistance = Number.MAX_VALUE;
        let chosenIndex = -1;
        for (let i = 0; i < GPData.length; i++) {
            let newDistance = getDistanceFromLatLonInKm(
                userCoordinates.latitude,
                userCoordinates.longitude,
                GPData[i].LATITUDE,
                GPData[i].LONGITUDE
            );
            if (minDistance > newDistance) {
                chosenIndex = i;
                minDistance = newDistance;
            }
        }
        return chosenIndex;
    }

    function getUserLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            setUserCoordinates({
                latitude: position.coords.latitude.toFixed(6),
                longitude: position.coords.longitude.toFixed(6),
            });
        });
    }

    function displayLocation() {
        document.getElementById("locationString").innerHTML =
            "Your location: Longitude: " +
            Number(userCoordinates.longitude).toFixed(6) +
            ", Latitude: " +
            Number(userCoordinates.latitude).toFixed(6);
    }

    function displayGP(GPIndex) {
        document.getElementById("GPString").innerHTML =
            "Nearest general polyclinic to you: " +
            GPData[GPIndex].Name +
            "<br>Address: " +
            GPData[GPIndex].Address +
            ", " +
            GPData[GPIndex].Postal +
            "<br>Contact: " +
            GPData[GPIndex].Contact;
		showMap(Number(GPData[GPIndex].LATITUDE),Number(GPData[GPIndex].LONGITUDE));
    }

    function showMap(lat,lon) {
        if (lat == null) {
            return;
        }
        let newSrc =
            "https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&lat=" +
            lat +
            "&lng=" +
            lon +
            "&zoom=17&height=512&width=400&polygons=&lines=&points=&color=&fillColor=";
		document.getElementById("localMap").src = newSrc;
    }

    function setPage() {
        getUserLocation();
    }

    function postalToCoordinates(postal) {
        let i = 0;
        for (i; i < geoData.length; i++) {
            if (geoData[i].POSTAL == postal) {
                return [geoData[i].LATITUDE, geoData[i].LONGITUDE];
            }
        }
        return null;
    }

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        lat1 = Number(lat1).toFixed(6);
        lon1 = Number(lon1).toFixed(6);
        lat2 = Number(lat2).toFixed(6);
        lon2 = Number(lon2).toFixed(6);
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
                Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
}
