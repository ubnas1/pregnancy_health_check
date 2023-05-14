url = "http://127.0.0.1:5000/mortality";

// Fetch the JSON data
let xValue = [2000,2005,2010,2015,2020];

d3.json(url).then(function(data){
  
  // chart init
  let yValue = [data[0].year_2000, data[0].year_2005, data[0].year_2010, data[0].year_2015, data[0].year_2020];
  let country = data[0].Country;
  
  
  dropdown_value (data);
  top_5_2020(data,donut_chart)
  // mortality_trend (xValue, yValue, country)
  
});



// #################################################################
// Country dropdown box value
// #################################################################



// set dropdown box value
function dropdown_value (items) {
    let options = "";
    for (let i = 0; i < items.length; i++) {
        options += "<option>" + items[i].Country + "</option>";
        document.getElementById("selDataset").innerHTML = options
    };
  };

// #################################################################
// END dropdown box value
// #################################################################






// #################################################################
// mortality_trend
// #################################################################



d3.selectAll("#selDataset").on("change", getData);

function getData() {
  let dropdownMenu = d3.selectAll("#selDataset");
  let item = dropdownMenu.property("value");

  let index = [];

  d3.json(url).then(function(data){

    for (let j = 0; j < data.length; j++) {
      if (data[j].Country == item) {
        index = j;
      }
    }
    
    // chart for dropdown box
    let yValue = [data[index].year_2000, data[index].year_2005, data[index].year_2010, data[index].year_2015, data[index].year_2020];
    let xValue = [2000,2005,2010,2015,2020];
    
    let country = data[index].Country;
    // 
    //  let values = [data[index].Year_2020]
    
    console.log(xValue)
       mortality_trend(xValue, yValue, country);
  });
}


// #################################################################
// end  mortality_trend
// #################################################################




// // #################################################################
// // line chart
// // #################################################################


// line chart function
function mortality_trend (xValue, yValue, country) {
    var trace1 = {
        x: xValue,
        y: yValue,
        // mode: "lines+markers",
        name: 'Mortality Rate of ' + country + ' (per 100,000 deaths)',
    };
    var layout = {
        title: 'Mortality Rate of ' + country + ' (per 100,000 deaths)',
        plot_bgcolor: "rgba(174, 251, 252, 0.2)",
        paper_bgcolor: "rgba(0, 0, 0, 0)",
        xaxis: {
          title: {
            text: 'Year',
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#7f7f7f'
            }
          },
        },
        yaxis: {
          title: {
            text: 'Deaths',
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#7f7f7f'
            }
          }
        }
    }
    var data = [trace1];
    Plotly.newPlot('line', data, layout);
}

// // #################################################################
// // END line chart
// // #################################################################









// #################################################################
//   Donut Chart
// #################################################################

// set dropdown box value 2
let options_1 = "<option>" + 'Year_2020' + "</option>" +
          "<option>" + 'Year_2015' + "</option>" +
          "<option>" + 'Year_2010' + "</option>" +
          "<option>" + 'Year_2005' + "</option>" +
          "<option>" + 'Year_2000' + "</option>"

document.getElementById("selDataset_1").innerHTML = options_1

// function: worst 5 countries
function top_5_2020(data, donut_chart){
  let data_year = [];
  for (let x = 0; x < data.length; x++) {
    data_year.push(parseInt(data[x].year_2020));
  }
  var topValues = data_year.sort((a,b) => b-a).slice(0,5)

  let top_5_countries = []
  for (let y = 0; y < 5; y ++) {
    for (let z = 0; z < data.length; z++) {
      if (parseInt(topValues[y]) == parseInt(data[z].year_2020)) {
        top_5_countries.push (data[z].Country)
      }
    }
  }
  var donut_chart = donut_chart (topValues, top_5_countries);
  return donut_chart
}



function top_5_2015(data, donut_chart){
    let data_year = [];
    for (let x = 0; x < data.length; x++) {
      data_year.push(parseInt(data[x].year_2015));
    }
    var topValues = data_year.sort((a,b) => b-a).slice(0,5)
  
    let top_5_countries = []
    for (let y = 0; y < 5; y ++) {
      for (let z = 0; z < data.length; z++) {
        if (parseInt(topValues[y]) == parseInt(data[z].year_2015)) {
          top_5_countries.push (data[z].Country)
        }
      }
    }
    var donut_chart = donut_chart (topValues, top_5_countries) 
    return donut_chart
  }
  
  function top_5_2010(data, donut_chart){
    let data_year = [];
    for (let x = 0; x < data.length; x++) {
      data_year.push(parseInt(data[x].year_2010));
    }
    var topValues = data_year.sort((a,b) => b-a).slice(0,5)
  
    let top_5_countries = []
    for (let y = 0; y < 5; y ++) {
      for (let z = 0; z < data.length; z++) {
        if (parseInt(topValues[y]) == parseInt(data[z].year_2010)) {
          top_5_countries.push (data[z].Country)
        }
      }
    }
    var donut_chart = donut_chart (topValues, top_5_countries) 
    return donut_chart
  }
  
  function top_5_2005(data, donut_chart){
    let data_year = [];
    for (let x = 0; x < data.length; x++) {
      data_year.push(parseInt(data[x].year_2005));
    }
    var topValues = data_year.sort((a,b) => b-a).slice(0,5)
  
    let top_5_countries = []
    for (let y = 0; y < 5; y ++) {
      for (let z = 0; z < data.length; z++) {
        if (parseInt(topValues[y]) == parseInt(data[z].year_2005)) {
          top_5_countries.push (data[z].Country)
        }
      }
    }
    var donut_chart = donut_chart (topValues, top_5_countries) 
    return donut_chart
  }
  
  function top_5_2000(data, donut_chart){
    let data_year = [];
    for (let x = 0; x < data.length; x++) {
      data_year.push(parseInt(data[x].year_2000));
    }
    var topValues = data_year.sort((a,b) => b-a).slice(0,5)
  
    let top_5_countries = []
    for (let y = 0; y < 5; y ++) {
      for (let z = 0; z < data.length; z++) {
        if (parseInt(topValues[y]) == parseInt(data[z].year_2000)) {
          top_5_countries.push (data[z].Country)
        }
      }
    }
    var donut_chart = donut_chart (topValues, top_5_countries) 
    return donut_chart
  }
  
  d3.selectAll("#selDataset_1").on("change", getData_1);
  
  function getData_1() {
    let dropdownMenu = d3.selectAll("#selDataset_1");
    let item = dropdownMenu.property("value");
  
    d3.json(url).then(function(data){
      if (item == "Year_2020") {
        top_5_2020(data, donut_chart)
      }
      else if (item == "Year_2015") {
        top_5_2015(data, donut_chart)
      }
      else if (item == "Year_2010") {
        top_5_2010(data, donut_chart)
      }
      else if (item == "Year_2005") {
        top_5_2005(data, donut_chart)
      }
      else if (item == "Year_2000") {
        top_5_2000(data, donut_chart)
      }
    });
  
  }



// function: chart.js donut chart
function donut_chart (data, labels) {
    var ctx = document.getElementById('donut_chart').getContext('2d');
    const existingChart = Chart.getChart(ctx);
  
    if (existingChart) {
      // If a Chart object already exists, destroy it
      existingChart.destroy();
    }
  
    new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
              data: data,
              backgroundColor: [ 
                  'rgba(255, 0, 0, .5)',
                  'rgba(156, 24, 24, .5)',
                  'rgba(219, 83, 33, .5)',
                  'rgba(246, 140, 62, .5)',
                  'rgba(243, 182, 95, .5)',
                  'rgba(240, 243, 118, .5)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          cutoutPercentage: 70,
          responsive: false,
          legend: {
              position: 'bottom',
              labels: {
                  fontColor: 'black',
                  fontSize: 14
              }
          }
      }
    });
  }


// #################################################################
// END  Donut Chart
// #################################################################







// #################################################################
// Bar Chart Not used so far
// #################################################################



// function: chart.js bar chart
function bar_chart(data,labels) {
    var ctx = document.getElementById('bar_chart').getContext('2d');
    const existingChart = Chart.getChart(ctx);
  
    if (existingChart) {
      // If a Chart object already exists, destroy it
      existingChart.destroy();
    }
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        data: {
          datasets: [{
            axis: 'y',
            label: 'My First Dataset',
            data: data,
            fill: false,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
          borderWidth: 1
          }]
        }
      },
      options: {
          cutoutPercentage: 70,
          responsive: false,
          legend: {
            position: 'bottom',
            labels: {
              fontColor: 'black',
              fontSize: 14
            }
          }
      }
    })
  }



// #################################################################
// END Bar Chart
// #################################################################
