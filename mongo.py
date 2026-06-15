from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")

db = client["college"]

collection = db["patients"]

patient = {
    "name": "Allen",
    "age": 20,
    "dept": "CSE"
}

collection.insert_one(patient)

print("Data inserted successfully")

for data in collection.find({}, {"_id": 0}):
    print(data)