import pickle
import joblib
# from joblib import dump, load
import re
import nltk
from nltk.stem.lancaster import LancasterStemmer

st = LancasterStemmer()

# quote = "lick my balls"
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
        print('tokenizer finished')
        return [st.stem(word) for word in txt]
    

def compute(quote):
    print(f'ml_quote:{quote}')
    
    rf = joblib.load('model.joblib') 
    print('rf loaded')
    cv = joblib.load('dic.joblib')
    print('cv loaded')

    return rf.predict(cv.transform(token(quote)))


