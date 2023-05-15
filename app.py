# import necessary libraries
import json
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pickle
from flask import (
    Flask,
    render_template,
    jsonify,
    request
)


# Database Setup
engine = create_engine("sqlite:///Resources/database.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Data = Base.classes.maternal_mortality_by_country




# getting the data from our JSON file
with open("Resources/geojson.geojson") as json_file:
    polygons_data = json.load(json_file)

#################################################
# Flask Setup
#################################################

app = Flask(__name__)


#################################################
# Loading Machine Learning Model
#################################################

# using the random forest model because of higher accuracy

file_name_random_forest = 'saved_model_rf.sav'

model_random_forest = pickle.load(open(file_name_random_forest, 'rb'))


#################################################
# home route
#################################################

@app.route("/")
def index():
    return render_template("index.html")


#################################################
# model route 
#################################################

@app.route("/model", methods=["POST"])
def predict():
    
    # receiving the input values in variables
    
    age = float(request.form["age"])
    
    sbp = float(request.form["sbp"])
    
    dbp = float(request.form["dbp"])
    
    bs = float(request.form["bs"])
    
    bt = float(request.form["bt"])
    
    hr = float(request.form["hr"])
    
    # making a list of input features
    
    test_list = [age, sbp, dbp, bs, bt, hr]
    
    # making prediction
    
    prediction = model_random_forest.predict([test_list])
    
    # convert to string
    
    final_prediction = str(prediction[0])
    
    # rendering template with the prediction result
    
    return render_template('result.html',data=final_prediction)




#################################################
# polygons route 
#################################################


@app.route("/polygons")
def polygons_list():
    response = jsonify(polygons_data)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


#################################################
# mortality_rate route 
#################################################


@app.route("/mortality")
def mortality_rate():
    
    session = Session(engine)
    
    # fetching data from database
    
    result = session.query(Data.Country, Data.year_2000, Data.year_2005, Data.year_2010, Data.year_2015, Data.year_2020).all()
    
    # closing session
    session.close()
    
    
    # making an empty list to add the data for json making
    all_data = []
    
    # for loop to go through all the columns
    for i1, i2, i3, i4, i5, i6 in result:
        
        countries_dict = {}
       
        countries_dict["Country"] = i1
        countries_dict["year_2000"] = i2
        countries_dict["year_2005"] = i3
        countries_dict["year_2010"] = i4
        countries_dict["year_2015"] = i5
        countries_dict["year_2020"] = i6
        all_data.append(countries_dict)
    
    
    
    
    response = jsonify(all_data)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response
    



################################################
if __name__ == '__main__':
    app.run(debug=True)
