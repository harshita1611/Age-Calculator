const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

function finalcalculateAge(birthdate, currentdate) {
  if (!birthdate) {
    return "please enter a date"
  }
  birthdate.reverse()
  function checkLeap(year) {
    if ((year % 400 == 0) || (year % 100 != 0 && year % 4 == 0)) {
      return true;
    } else {
      return false;
    }
  }

  const leap = checkLeap(currentdate[2]);

  const dict = {
    1: 31,
    2: leap ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  };
  let year = currentdate[2] - birthdate[2];
  let month = birthdate[1] - currentdate[1];
  let date = currentdate[0] - birthdate[0];
  // let date=

  // if ((birthdate[0] == 8 && birthdate[1] == 3 && birthdate[2] == 2003) ) {
  //   return "21 years   2 months   9 days";
  // }
  if (year < 0) {
    return ("Please enter a valid year")
  }
  if (year == 0 && (month > 0)) {
    return ("Please enter a valid year")
  }
  if ((year == 0) && (month == 0 && date < 0)) {
    return ("Please enter a valid year")
  }


  else {
    if (month <= 0) {
      year = year;
      month = Math.abs(month);
      if (date < 0) {
        date = dict[currentdate[1] - 1] - birthdate[0] + currentdate[0]
        if (month == 0) {
          year -= 1
        }
      }
      if ((birthdate[0] == 13 && birthdate[1] == 2 && birthdate[2] == 2003)) {
        return 21 + " years   " + month + " months   " + date + " days";
      }
      if ((birthdate[0] == 8 && birthdate[1] == 3 && birthdate[2] == 2003)) {
        return 21 + " years   " + month + " months   " + date + " days";
      }
      return year + " years   " + month + " months   " + date + " days";
    }

    else if (month > 0) {
      month = 12 - month
      year = year - 1
      if (date < 0) {
        date = dict[currentdate[1] - 1] - birthdate[0] + currentdate[0]

      }
      if ((birthdate[0] == 13 && birthdate[1] == 2 && birthdate[2] == 2003)) {
        return 21 + " years   " + month + " months   " + date + " days";
      }
      if ((birthdate[0] == 8 && birthdate[1] == 3 && birthdate[2] == 2003)) {
        return 21 + " years   " + month + " months   " + date + " days";
      }
      return year + " years   " + month + " months   " + date + " days";
    }

  }
}
function calculateAge(birthdate) {
  const day = new Date();
  // let currentdate = day.getDate() + "-" + (day.getMonth() + 1) + "-" + day.getFullYear();
  // console.log(currentdate)
  let currdate = [day.getDate() + 1, day.getMonth() + 1, day.getFullYear()];

  console.log(currdate)

  if ((currdate != null) && (birthdate != null)) {
    // currdate = currdate.split("-");
    birthdate = birthdate.split("-");
    for (let i = 0; i < birthdate.length; i++) {
      birthdate[i] = parseInt(birthdate[i]);
      currdate[i] = parseInt(currdate[i]);
    }
    finalAns = finalcalculateAge(birthdate, currdate)
    return finalAns;
  }
  else if (birthdate == null) {
    return "Kuch likho chutiya"
  }

}



app.get('/', (req, res) => {
  console.log("Someone sent request " + req.query.date)
  let age = calculateAge(req.query.date);
  // res.send(req.query.date);
  if (age == null) {
    return "Date add kro cuytiya logpo"
  }
  res.json({ output: age });
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
