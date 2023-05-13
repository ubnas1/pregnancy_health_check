// var form = document.getElementById('form');

// form.addEventListener('submit', function(event) {

//     event.preventDefault(); // prevent auto submit

//     const age = document.getElementById('age').value;

//     const systolicbp = document.getElementById('sbp').value;

//     const diastolicbp = document.getElementById('dbp').value;

//     const bloodsugar = document.getElementById('bs').value;

//     const bodytemp = document.getElementById('bt').value;

//     const heartrate = document.getElementById('hr').value;

//     // console.log(age);

//     const dict_values = {age, systolicbp, diastolicbp, bloodsugar, bodytemp, heartrate} //Pass the javascript variables to a dictionary.

//     // const values = [age, systolicbp, diastolicbp, bloodsugar, bodytemp, heartrate]

//     const json_string = JSON.stringify(dict_values); // Stringify converts a JavaScript object or value to a JSON string
    
//     // console.log(json_string); // Prints the variables to console window, which are in the JSON format
    
//     // window.alert(json_string)
    
//     $.ajax({
//         url:"/test",
//         type:"POST",
//         contentType: "application/json",
//         data: JSON.stringify(json_string)});
// });

