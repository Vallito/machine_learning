#SouthPark 

import pandas as pd

#Create a dataframe from the CSV
df = pd.read_csv("south_park_dialogue.zip")
df.head()

#remove \n from Line column
df['Line'] = df['Line'].replace({'\n':''}, regex=True)
df.head()

#Remove season and episode columns since these are not needed for our task
character_line_df = df.drop(columns=['Season','Episode'])
character_line_df.head()

#import stopwords
from nltk.corpus import stopwords

stop_words = set(stopwords.words('english'))

#using regex tokenizer to tokenize and remove special characters
from nltk.tokenize import RegexpTokenizer

tokenizer = RegexpTokenizer(r'\w+')

character_line_df.head()

#lower case dataframe, tokenize, and apply stopwords
#lower_df= character_line_df.apply(lambda x: x.str.lower())
#lower_df['Line'] = lower_df['Line'].apply(tokenizer.tokenize)
#lower_df['Line'] = lower_df['Line'].apply(lambda x: [item for item in x if item not in stop_words])
#lower_df.columns=['character','line']

#lower_df.head()

#find characters with most lines
top_characters = character_line_df.groupby(['Character']).size().loc[character_line_df.groupby(['Character']).size() > 999]
top_characters
main_characters = ['Butters','Cartman','Kyle','Mr. Garrison', 'Randy', 'Stan']

character_line_df.head()

#filter dataframe
filtered_df = character_line_df.loc[character_line_df['Character'].isin(main_characters)]
#filtered_df.columns('character','line')
filtered_df['Line'] = filtered_df['Line'].str.replace('[^\w\s]','')

filtered_df.head()

from sklearn.model_selection import train_test_split

#filtered_df['Line'] = [line.replace('\n','') for line in filtered_df['Line']]
train, test = train_test_split(filtered_df, test_size=0.3, random_state=14)
test.head()

from sklearn.feature_extraction.text import CountVectorizer
from nltk.corpus import stopwords
import nltk
from nltk.stem.lancaster import LancasterStemmer
import re

st = LancasterStemmer()
def token(text):
    text = re.sub(r"i'm", "i am", text)
    text = re.sub(r"he's", "he is", text)
    text = re.sub(r"she's", "she is", text)
    text = re.sub(r"it's", "it is", text)
    text = re.sub(r"that's", "that is", text)
    text = re.sub(r"what's", "that is", text)
    text = re.sub(r"\'ll", " will", text)
    text = re.sub(r"\'re", " are", text)
    text = re.sub(r"won't", "will not", text)
    text = re.sub(r"can't", "cannot", text)
    text = re.sub(r"n't", " not", text)
    text = re.sub(r"n'", "ng", text)
    text = re.sub(r"ohh", "oh", text)
    text = re.sub(r"ohhh", "oh", text)
    text = re.sub(r"ohhhh", "oh", text)
    text = re.sub(r"ohhhhh", "oh", text)
    text = re.sub(r"ohhhhhh", "oh", text)
    text = re.sub(r"ahh", "ah", text)
    text = re.sub(r"Butters","Butters", text)
    txt = nltk.word_tokenize(text)
    return [st.stem(word) for word in txt]


stop = set(stopwords.words("english"))
cv = CountVectorizer(lowercase=True, 
                     tokenizer=token, stop_words=stop,
                     analyzer=u'word', min_df=4)
#print(train['Line'].tolist())

vec_train = cv.fit_transform(train['Line'].tolist())
vec_test = cv.transform(test['Line'].tolist())




from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, f1_score, accuracy_score
from joblib import dump, load

rf = RandomForestClassifier(n_estimators=200, n_jobs=-1)
rf.fit(X = vec_train, y = train['Character'])
dump(rf, 'filename.joblib') 
dump(cv, 'dic.joblib') 


accuracy_score(rf.predict(vec_test), test['Character'])

rf.predict(cv.transform(token("Gee thanks a lot Dad")))


from sklearn.feature_extraction.text import TfidfTransformer
tf_transformer = TfidfTransformer(use_idf=False).fit(vec_train)
vec_train_tf = tf_transformer.transform(vec_train)
vec_train_tf.shape

accuracy_score(rf.predict(vec_train_tf),train['Character'])

from sklearn.naive_bayes import MultinomialNB
>>> clf = MultinomialNB().fit(vec_train_tf, vec_train_tf['Character'])

from sklearn.pipeline import Pipeline
from sklearn.naive_bayes import MultinomialNB
test_pipe = Pipeline([
    #('vect', CountVectorizer()),
    ('tfidf', TfidfTransformer()),
    ('clf',MultinomialNB())])

test_pipe.fit(vec_test)

