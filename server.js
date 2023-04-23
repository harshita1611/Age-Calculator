const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

function finalcalculateAge(birthdate, currentdate) {
  if (birthdate == null) {
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

  const dict = {1: 31,2: leap ? 29 : 28,3: 31,4: 30,5: 31,6: 30,7: 31,8: 31,9: 30,10: 31,11: 30,12: 31};
  let year = currentdate[2] - birthdate[2];
  let month = birthdate[1] - currentdate[1];
  
  if (month < 0) {
    year = year;
    month = Math.abs(month);
  }
  else {
    year = year - 1;
    month = 12 - month;
  }

  let date = currentdate[0] - birthdate[0];
  let days = 0;

  if (date > 0) {
    days = date
  } else {
    month -= 1
    days = dict[month - 1] - birthdate[0] - currentdate[0];
  }

  return year + " years   " + month + " months   " + days + " days";
}
function calculateAge(birthdate) {
  const day = new Date();
  let currentdate = day.getDate() + "-" + (day.getMonth() + 1) + "-" + day.getFullYear();
  currentdate = currentdate.split("-");
  birthdate = birthdate.split("-");
  for (let i = 0; i < birthdate.length; i++) {
    birthdate[i] = parseInt(birthdate[i]);
    currentdate[i] = parseInt(currentdate[i]);
  }
  finalAns = finalcalculateAge(birthdate, currentdate)
  return finalAns;

}

app.get('/', (req, res) => {
  console.log("Someone sent request " + req.query.date)
  let age = calculateAge(req.query.date);
  
  // res.send(req.query.date);
  res.json({ output: age });
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
