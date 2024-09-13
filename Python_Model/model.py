from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pandas as pd

def prepare_model(df):
    # Handle missing values
    df['Income'].fillna(df['Income'].mean(), inplace=True)
    df['Category'].fillna(df['Category'].mode()[0], inplace=True)
    df['Qualification'].fillna(df['Qualification'].mode()[0], inplace=True)
    df['Type'].fillna(df['Type'].mode()[0], inplace=True)
    df['State'].fillna(df['State'].mode()[0], inplace=True)

    df = df.dropna(subset=['Name'])

    # Encode categorical features
    le_state = LabelEncoder()
    le_category = LabelEncoder()
    le_qualification = LabelEncoder()
    le_type = LabelEncoder()

    df.loc[:, 'State'] = le_state.fit_transform(df['State'])
    df.loc[:, 'Category'] = le_category.fit_transform(df['Category'])
    df.loc[:, 'Qualification'] = le_qualification.fit_transform(df['Qualification'])
    df.loc[:, 'Type'] = le_type.fit_transform(df['Type'])

    # Define features and target
    X = df[['State', 'Category', 'Qualification', 'Income', 'Type']]
    y = df['Name']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = DecisionTreeClassifier(random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model Accuracy: {accuracy:.2f}")

    return model, le_state, le_category, le_qualification, le_type

def make_prediction(model, le_state, le_category, le_qualification, le_type, state, category, qualification, income, type_, df):
    try:
        state_encoded = le_state.transform([state])[0]
        category_encoded = le_category.transform([category])[0]
        qualification_encoded = le_qualification.transform([qualification])[0]
        type_encoded = le_type.transform([type_])[0]
        
        input_data = [[state_encoded, category_encoded, qualification_encoded, income, type_encoded]]
        predicted_name = model.predict(input_data)[0]

        result = df[df['Name'] == predicted_name].iloc[0]
        recommendation = {
            "Name": result['Name'],
            "Description": result['Description'],
            "LINKS": result['LINKS']
        }
        return recommendation
    except ValueError as e:
        return {"error": str(e)}