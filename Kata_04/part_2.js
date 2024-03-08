//importing the filesystem module so I can read the .dat file
//fs is a built in module in nodejs v8 environment to read/write system files
const fs = require("fs");

//reading the content of the football.dat file
//using callback function which takes (error, result)
fs.readFile("./football.dat", (error, data) => {
  // if any error occurs while reading the football.dat file will return
  if (error) {
    console.log("error: ", error);
    return;
  }

  //convert the resulted buffer reading of the football.dat file to string format
  //then split by lines to have an array of teams dat a
  const teams_array = data.toString().trim().split("\n");

  //declare variables will assign values later
  let teamName;
  let teamForGoals;
  let teamAgainstGoals;
  let goalsForAgainstDifference;

  // in the getDifference function I am checking it the differnce is negative and turn it to positive
  const getDifference = (max, min) => {
    let diff = max - min;

    if (diff < 0) {
      return -diff;
    }
    return diff;
  };

  //statring from index1 since first line is a header
  for (let i = 1; i < teams_array.length; i++) {
    //split each team into an array filtered without the whitespace
    const each_team_array = teams_array[i]
      .split(" ")
      .filter((data) => data !== "");

    //assign each team values
    let eachTeamName = each_team_array[1];
    let eachTeamForGoals = parseInt(each_team_array[6]);
    let eachTeamAgainstGoals = parseInt(each_team_array[8]);
    let eachTeamGoalDifference = getDifference(
      eachTeamForGoals,
      eachTeamAgainstGoals
    );

    //assign variables with default values of the first team to compare with later on
    if (i === 1) {
      teamName = eachTeamName;
      teamForGoals = eachTeamForGoals;
      teamAgainstGoals = eachTeamAgainstGoals;
      goalsForAgainstDifference = eachTeamGoalDifference;
    }

    //check if for each team goals difference smaller than the previous team
    if (eachTeamGoalDifference < goalsForAgainstDifference) {
      teamName = eachTeamName;
      teamForGoals = eachTeamForGoals;
      teamAgainstGoals = eachTeamAgainstGoals;
      goalsForAgainstDifference = eachTeamGoalDifference;
    }
  }

  //display the results
  console.log(`
Team Name: ${teamName}
Golas For: ${teamForGoals}
Goals Against: ${teamAgainstGoals}
Difference: ${goalsForAgainstDifference}`);
});
