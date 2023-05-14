# Maternal Health Check Report

## Project Introduction

This project uses machine learning to calculate the health of a user by using user given input health features.

The Second part of this project uses a dataset from WHO to display a choropleth map of all the countries with their 
maternal mortality rate from 2000 - 2020.

It also displays donut chart and line chart of Worst countries with maternal health mortality and their rate from period 2000 - 2020.


# Part 1

## Health Check

train.ipynb file is created and used to train the ML models. Two models have been used and tested.
 
1. Logistics Regression Model -> Accuraccy achieved = 63% -> Rejected.

2. Random Forest Model -> Accuraccy achieved = 80% -> Accepted and used for our used case.

The model is saved using pickle and then used in Flask application to make predictions.

# Part 2

## Visualizations

1. Choropleth Map

A Leaflet.js choropleth map is generated and displayed using the data from world geojson file purposely edited to 
include countries mortality numbers for period 2000 - 2020.

2. Donut Chart - Plotly.js

A donut chart of worst countries (Mortality numbers per 1000 live births) is created using plotly.js library.

The data is fetched from Flask API route which gets the data from sqlite database.

3. Line Chart - Plotly.js

A line chart is also displayed which shows the selected countries' (selected from dropdown menu) mortality numbers over
the years through line chart.

----------------------------------------------------------------

# Front End

An input form is created using a prebuilt free to use bootstrap template. 

----------------------------------------------------------------

# Flask

The backend is handeled by making a flask application which gets the data from sqlite database, geojson and 

processes the data, applies the model prediction and forwards to the relevant routes and renders templates.

----------------------------------------------------------------

# How to Run the applicaton

open terminal and type ./run.sh to run the application.

----------------------------------------------------------------

# About Dataset

### Context
Data has been collected from different hospitals, community clinics, maternal health cares through the IoT based risk monitoring system.

### Features

Age: Age in years when a woman is pregnant.

SystolicBP: Upper value of Blood Pressure in mmHg, another significant attribute during pregnancy.

DiastolicBP: Lower value of Blood Pressure in mmHg, another significant attribute during pregnancy.

BS: Blood glucose levels is in terms of a molar concentration, mmol/L.

HeartRate: A normal resting heart rate in beats per minute.

Body Temperature: Temperature in degrees Fahrenheit.

Risk Level: Predicted Risk Intensity Level during pregnancy considering the previous attribute.


### Acknowledgements

Relevant Papers:

Ahmed M., Kashem M.A., Rahman M., Khatun S. (2020) Review and Analysis of Risk Factor of Maternal Health in Remote Area Using the Internet of Things (IoT). In: Kasruddin Nasir A. et al. (eds) InECCE2019. Lecture Notes in Electrical Engineering, vol 632. Springer, Singapore. [Web Link]
IoT based Risk Level Prediction Model for Maternal Health Care in the Context of Bangladesh, STI-2020, [under publication in IEEE]
Inspiration
Which health conditions are the strongest indications for health risks during pregnancy?


This dataset is directly from healthcare IoT devices. The author's source is from Daffodil International University. They are specified to be IoT devices in remote areas. This dataset represents a common instance for data scientists in which collaboration with a subject matter expert could provide a second opinion in terms of the best parameters for cleansing and preprocessing the data.

https://www.kaggle.com/datasets/csafrit2/maternal-health-risk-data


## Countries Maternal Mortality Dataset

Data Source: WHO, UNICEF, UNFPA, World Bank Group and UNPD (MMEIG) - February 2023