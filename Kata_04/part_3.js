const fs = require("fs");

// this functiono is reusable for both parts 1 & 2 by just having the require parameters
const findResultFromFile = (file_path, output_name, output_column_number, max_column_number, min_column_number) => {
  fs.readFile(file_path, "utf8", (error, data) => {
    if (error) {
      console.log("error: ", error);
      return;
    }

    const file_array = data.trim().split("\n");
    let output_name_value;
    let difference_value = Infinity;

    const getDifference = (max, min) => {
      let diff = max - min;

      if (diff < 0) {
        return -diff;
      }
      return diff;
    };

    for (let i = 0; i < file_array.length; i++) {
      const each_in_file_array = file_array[i]
        .split(" ")
        .filter((data) => data !== "");

      let each_output_name_value = each_in_file_array[output_column_number];
      let each_max_value = parseFloat(each_in_file_array[max_column_number]);
      let each_min_value = parseFloat(each_in_file_array[min_column_number]);
      let each_diff_value = getDifference(each_max_value, each_min_value);

      if (each_diff_value < difference_value) {
        output_name_value = each_output_name_value;
        difference_value = each_diff_value;
      }
    }

    console.log(`
${output_name}: ${output_name_value}
Difference: ${difference_value}`);
  });
};

findResultFromFile("./weather.dat", "Day", 0, 1, 2);
findResultFromFile("./football.dat", "Team", 1, 6, 8);

//------------------------------------------------------------------------------
//- Structuring the first part in a good way make it easier to
//  factour out the common code they almost the same functionalities


//- yes the second part was almost the same as the first with 
//  an extra function to make the difference in positive because
//  in the first max is always greater than min
//  but when it comes to scored goals it happens to have
//  goals scored against you more than the goals for you


//-yes factoring the code is not always the better solution for 
// readibility but it may be good for performance because you don't 
// have to write the same code multiple times where you have the 
// same code inside these repeated functions and also when it comes
// to modifying you will be making the changes once