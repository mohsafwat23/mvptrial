export function OpenHours(restaurants) {
    var date = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var WeekDay = weekday[date.getDay()];
    var time = Number(date.getHours().toString()+date.getMinutes().toString())
        console.log(WeekDay, time);
    if (WeekDay = "Monday"){
        restaurants.forEach(element => {
            let monday_opening = element.monday_opening;
            let monday_closing = element.monday_closing;
            let currentlyopen = hours(monday_opening, monday_closing,time);
            element.currentlyopen = currentlyopen;

        })
    }
    
    else if (WeekDay = "Tuesday"){
        restaurants.forEach(element => {
            let tuesday_opening = element.tuesday_opening;
            let tuesday_closing = element.tuesday_closing;
            let currentlyopen = hours(tuesday_opening, tuesday_closing,time);
            element.currentlyopen = currentlyopen;

        })
    }
    else if (WeekDay = "Wednesday"){
        restaurants.forEach(element => {
            let wednesday_opening = element.wednesday_opening;
            let wednesday_closing = element.wednesday_closing;
            let currentlyopen = hours(wednesday_opening, wednesday_closing,time);
            element.currentlyopen = currentlyopen;

        })
    }

    else if (WeekDay = "Thursday"){
        restaurants.forEach(element => {
            let thursday_opening = element.thursday_opening;
            let thursday_closing = element.thursday_closing;
            let currentlyopen = hours(thursday_opening, thursday_closing,time);
            element.currentlyopen = currentlyopen;
        })
    }
    else if (WeekDay = "Friday"){
        restaurants.forEach(element => {
            let friday_opening = element.friday_opening;
            let friday_closing = element.friday_closing;
            let currentlyopen = hours(friday_opening, friday_closing,time);
            element.currentlyopen = currentlyopen;
        })
    }
    else if (WeekDay = "Saturday"){
        restaurants.forEach(element => {
            let saturday_opening = element.saturday_opening;
            let saturday_closing = element.saturday_closing;
            let currentlyopen = hours(saturday_opening, saturday_closing,time);
            element.currentlyopen = currentlyopen;
        })

    }
    else{
        restaurants.forEach(element => {
            let sunday_opening = element.sunday_opening;
            let sunday_closing = element.sunday_closing;
            let currentlyopen = hours(sunday_opening, sunday_closing,time);
            element.currentlyopen = currentlyopen;

        })

    }
  

  
      console.log(time);
      return restaurants;
  }
  

  
  function hours(opening, closing,time){
    var opening = Number(opening.replace(/:/g,''));
    var closing = Number(closing.replace(/:/g,''));
    var time = time;
    if (time > opening && time < closing) {
        return "Opened";
    }
    
    else {
        return "Closed"
    }
  }
  
  export default {
    "OpenHours" : OpenHours
  }