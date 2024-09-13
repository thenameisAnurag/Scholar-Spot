import pandas as pd

def load_data():
    df = pd.read_csv('scholar.csv')
    return df
