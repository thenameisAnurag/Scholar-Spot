import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

# Load the dataset
data = pd.read_csv("Data.csv")
# print(data.to_string())

le_category = LabelEncoder()
le_qualification = LabelEncoder()
le_income = LabelEncoder()

data["Category"] = le_category.fit_transform(data["Category"])
data["Qualification"] = le_qualification.fit_transform(data["Qualification"])
data["Income "] = le_income.fit_transform(data["Income "])

# Split the dataset into features and target variable
X = data[["Category", "Qualification", "Income "]]
y = data["Name"]

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the decision tree classifier
clf = DecisionTreeClassifier()
clf.fit(X_train, y_train)

# Function to predict scholarships based on user input
def suggest_scholarship(category, qualification, income):
    # Preprocess the user input
    category_encoded = le_category.transform([category])[0]
    qualification_encoded = le_qualification.transform([qualification])[0]
    income_encoded = le_income.transform([income])[0]
    
    # Make predictions based on user input
    predictions = clf.predict([[category_encoded, qualification_encoded, income_encoded]])
    
    return predictions   



# Example usage
category = "all"
qualification = "post-matric"
income = "0"

suggested_scholarships = suggest_scholarship(category, qualification, income)
print("Suggested Scholarship:", suggested_scholarships)