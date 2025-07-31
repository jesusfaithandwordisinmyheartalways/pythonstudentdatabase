from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_DB_URL")

client = MongoClient(MONGO_URL)
db = client["StudentDatabase"]
login_collection = db["login"]

def log_attempt(username, success):
    login_collection.insert_one({
        "username": username,
        "success": success,
        "timestamp": datetime.utcnow()
    })