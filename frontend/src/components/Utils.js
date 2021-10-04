export function sortByLocation(restaurants) {
  let latitude, longitude;
  navigator.geolocation.getCurrentPosition(function(position) {
    latitude = (position.coords.latitude)
    longitude = (position.coords.longitude)
    
    console.log("User latitude longitude");
    console.log(latitude, longitude);

    restaurants.forEach(element => {
      let restaurantLatitude = parseFloat(geoLocationExtractor(element.map_url)[0]);
      let restaurantLongitude = parseFloat(geoLocationExtractor(element.map_url)[1]);

      let distance_from_user = distance(latitude, longitude, restaurantLatitude, restaurantLongitude, "M");

      // sort elements by distance from user
      element.distance_from_user = distance_from_user.toFixed(2);     
    })

    restaurants.sort(function(a, b) {
      return a.distance_from_user - b.distance_from_user;
    })

    console.log("Sorted restaurants");
    // reverse the restaurants array
    restaurants.reverse();
    return restaurants;
  })
}

function geoLocationExtractor(googleURL) {
  // loop over every character in the googleURL and if the character is equal to '=' or '@' return the rest of the string
  // split the string at the ',' and return the array
  // return the array
  let counter = 0;
  for (let char of googleURL) {
    counter += 1;
    if (char === '=' || char === '@') {
      return googleURL.substring(counter).split(",").slice(0, 2);
    }
  }
}

function distance(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
  }
  
  else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

      if (dist > 1) {
          dist = 1;
      }

      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;

      if (unit == "K") { 
        dist = dist * 1.609344
      }

      if (unit == "N") { 
        dist = dist * 0.8684 
      }

      return dist;
  }
}

export function swipeHelper() {
  
}

export default {
  "sortByLocation" : sortByLocation,
  "swipeHelper" : swipeHelper
}
