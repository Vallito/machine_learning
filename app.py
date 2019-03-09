from flask import Flask, render_template, request
from flask.json import jsonify
import json
import pymongo
from bson import json_util
from bson.json_util import dumps
import pandas as pd
from run_ml import compute, token

app = Flask(__name__)

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.south_park
quotes = db.quotes


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/importquotes")
def import_quotes():
    print("posts" in db.list_collection_names())     #Check if collection "posts" 
    print(quotes.count() == 0)    #Check if collection named 'posts' is empty
    # db.quotes.drop()
    if quotes.count() == 0:

        df = pd.read_csv("static/data/quiz_quotes.csv") #csv file which you want to import
        records_ = df.to_dict(orient = 'records')
        db.quotes.insert_many(records_ )                 #Delete(drop) collection named 'posts' from db

    appData = []
    sp_quotes = list(quotes.find())
    for q in sp_quotes:
        appData.append(q)
    appData = json.dumps(appData, default=json_util.default)
    print(appData)
    return  appData
@app.route("/quotes")
def return_quotes():
    appData = []
    sp_quotes = list(quotes.find())
    for q in sp_quotes:
        appData.append(q)
    appData = json.dumps(appData, default=json_util.default)
    print(appData)
    return  appData

@app.route("/characters")
def character_data():
    
    charData = []
    # sp_characters = list(characters.find())
    # for c in sp_characters:
    #     charData.append({'Character':c})
    charData = json.dumps(characters.find_one(), default=json_util.default)
    print(charData)
    return  charData
@app.route("/ml/<quote>")
def machine_learning(quote):
     
    # from joblib import dump, load
    # import re
    # import nltk
    # from nltk.stem.lancaster import LancasterStemmer
    result = compute(quote)

    # char = {}
    # char['quote'] = 'Kyle'
    # char['quote'] = quote
    # Insert machine learning logic here.
    char = {'quote':result[0]}

    print(char)
    return  jsonify(char)

@app.route('/postdata', methods = ['POST'])
def get_post_javascript_data():
    print('update mongo')

    content = request.json['javascript_data']
    print(content)
    # Update mongo
    quotes.replace_one({"key": content['key']},

                                            content
                                          )
    return jsonify(content)
        # jsdata = request.form['javascript_data']
        # return json.loads(jsdata)[0]

if __name__ == "__main__":
    app.run(debug=True)
