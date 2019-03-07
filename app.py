from flask import Flask, render_template
from flask.json import jsonify
import json
import pymongo
from bson import json_util
from bson.json_util import dumps
import pandas as pd

app = Flask(__name__)

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.south_park
quotes = db.quotes
characters = db.characters


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/quotes")
def import_quotes():
    print("posts" in db.list_collection_names())     #Check if collection "posts" 
    print(quotes.count() == 0)    #Check if collection named 'posts' is empty
    if quotes.count() == 0:

        df = pd.read_csv("templates/static/data/quiz_quotes.csv") #csv file which you want to import
        records_ = df.to_dict(orient = 'records')
        db.quotes.insert_many(records_ )                 #Delete(drop) collection named 'posts' from db

    appData = []
    sp_quotes = list(quotes.find())
    for q in sp_quotes:
        appData.append({'quotes':q})
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

if __name__ == "__main__":
    app.run(debug=True)
