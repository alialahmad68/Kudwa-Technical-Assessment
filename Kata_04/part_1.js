//importing the filesystem module so I can read the .dat file
//fs is a built in module in nodejs v8 environment to read/write system files
const fs = require("fs");

//reading the content of the weather.dat file
//using callback function which takes (error, result)
fs.readFile("./weather.dat", (error, data) => {
  // if any error occurs while reading the weather.dat file will return
  if (error) {
    console.log("error: ", error);
    return;
  }

  //convert the resulted buffer reading of the weather.dat file to string format
  //then split by lines to have an array of days dat a
  const weather_data_days = data.toString().trim().split("\n");

  //declare variables will assign values later
  let day;
  let maxTemperature;
  let minTemperature;
  let smallestTemperatureSpread;

  //statring from index1 since first two lines in the file are headers
  //ignore also the last line in the file
  for (let i = 2; i < weather_data_days.length - 1; i++) {
    //split each day into an array filtered without the whitespace
    const each_day_array = weather_data_days[i]
      .split(" ")
      .filter((data) => data !== "");

    let eachDayNumber = each_day_array[0];
    let maxT = parseFloat(each_day_array[1]);
    let minT = parseFloat(each_day_array[2]);

    //assign variables with default values of the first day to compare with later on
    if (i === 2) {
      day = eachDayNumber;
      maxTemperature = maxT;
      minTemperature = minT;
      smallestTemperatureSpread = maxT - minT;
    }

    //check if for each day there is spread smaller than the previous day
    if (maxT - minT < smallestTemperatureSpread) {
      day = eachDayNumber;
      maxTemperature = maxT;
      minTemperature = minT;
      smallestTemperatureSpread = maxT - minT;
    }
  }

  //display the results where the smallest spread happened
  console.log(`
Day: ${day}
Max temperature: ${maxTemperature}
Min temperature: ${minTemperature}
Smallest temperature spread: ${smallestTemperatureSpread}
`);
});
