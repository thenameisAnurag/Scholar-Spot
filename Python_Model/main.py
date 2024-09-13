from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import csv
import re
from fuzzywuzzy import fuzz
from model import prepare_model, make_prediction

app = FastAPI()

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow requests from your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
df = pd.read_csv('scholar.csv')
print(df.head())  # Print the first few rows of the dataframe

model, le_state, le_category, le_qualification, le_type = prepare_model(df)

@app.get("/")
async def root():
    return {"message": "Scholarship Recommendation System"}

@app.post("/recommend")
async def recommend(data: dict):
    try:
        state = data.get('state')
        category = data.get('category')
        qualification = data.get('qualification')
        income = data.get('income')
        type_ = data.get('type')

        # Get recommendation details
        recommendation = make_prediction(
            model, le_state, le_category, le_qualification, le_type, 
            state, category, qualification, income, type_, df
        )

        return recommendation
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Load the dataset


# Load scholarships from the CSV file
def load_scholarships_from_csv(file_path):
    scholarships = []
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            scholarship = {
                'id': row['ID'].strip(),
                'state': row['State'].strip(),
                'name': row['Name'].strip(),
                'category': row['Category'].strip(),
                'income': row['Income'].strip(),
                'qualification': row['Qualification'].strip(),
                'description': row['Description'].strip(),
                'links': row['LINKS'].strip(),
                'type': row['Type'].strip(),
            }
            scholarships.append(scholarship)
    print(f"Loaded {len(scholarships)} scholarships")  # Debugging line
    return scholarships

scholarships = load_scholarships_from_csv('scholar.csv')
print(scholarships[:5])  # Print the first 5 scholarships for debugging

# Function to filter scholarships based on query with fuzzy matching
def filter_scholarships(query):
    query = query.lower()
    filtered_scholarships = []

    print(f"Query: '{query}'")  # Debugging line

    for scholarship in scholarships:
        # Convert all fields to lowercase for consistent comparison
        name = scholarship['name'].lower()
        category = scholarship['category'].lower()
        qualification = scholarship['qualification'].lower()
        description = scholarship['description'].lower()
        type_ = scholarship['type'].lower()
        state = scholarship['state'].lower()
        income = scholarship['income'].lower()

        # Use fuzzy matching for better results
        name_match = fuzz.partial_ratio(query, name) > 80
        category_match = fuzz.partial_ratio(query, category) > 80
        qualification_match = fuzz.partial_ratio(query, qualification) > 80
        description_match = fuzz.partial_ratio(query, description) > 80
        type_match = fuzz.partial_ratio(query, type_) > 80
        state_match = fuzz.partial_ratio(query, state) > 80
        income_match = (income.isdigit() and query.isdigit() and int(query) <= int(income))

        print(f"Checking Scholarship: {scholarship['name']}")
        print(f"Name Match: {name_match}, Category Match: {category_match}, Qualification Match: {qualification_match}, Description Match: {description_match}, Type Match: {type_match}, State Match: {state_match}, Income Match: {income_match}")

        if (name_match or category_match or qualification_match or description_match or type_match or state_match or income_match):
            filtered_scholarships.append({
                'name': scholarship['name'],
                'description': scholarship['description'],
                'qualification': scholarship['qualification'],
                'category': scholarship['category'],
                'income': scholarship['income'],
                'links': scholarship['links']
            })

    if filtered_scholarships:
        response = {
            'status': 'success',
            'scholarships': filtered_scholarships[:3]  # Show top 3 results
        }
    else:
        response = {
            'status': 'no_results',
            'message': 'No scholarships found matching your criteria. Please refine your search.'
        }

    return response


# API root endpoint
@app.get("/")
async def root():
    return {"message": "Scholarship Recommendation System"}

# API endpoint for handling chatbot requests
@app.post("/chatbot")
async def chatbot(request: Request):
    try:
        data = await request.json()
        query = data.get("message", "").strip().lower()
        print(f"Received query: {query}")  # Debugging line

        response_data = filter_scholarships(query)

        response = {"reply": response_data}
        return response
    except Exception as e:
        print(f"Error in /chatbot endpoint: {str(e)}")  # Print the error for debugging
        raise HTTPException(status_code=500, detail="An internal server error occurred.")

