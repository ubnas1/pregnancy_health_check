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

file_name = 'saved_model.sav'

model = pickle.load(open(file_name, 'rb'))



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
    age = float(request.form["age"])
    
    sbp = float(request.form["sbp"])
    
    dbp = float(request.form["dbp"])
    
    bs = float(request.form["bs"])
    
    bt = float(request.form["bt"])
    
    hr = float(request.form["hr"])
    
    test_list = [age, sbp, dbp, bs, bt, hr]
    
    prediction = model.predict([test_list])
    
    final_prediction = str(prediction[0])
    
    return render_template('result.html',data=final_prediction)




#################################################
# polygons route 
#################################################


@app.route("/polygons")
def polygons_list():
    response = jsonify(polygons_data)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response
    



################################################
if __name__ == '__main__':
    app.run(debug=True)