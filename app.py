# import necessary libraries
import os
import json
import pickle
from flask import (
    Flask,
    render_template,
    jsonify,
    request
)


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
    



################################################
if __name__ == '__main__':
    app.run(debug=True)