import sys
import os
import re
from dotenv import load_dotenv

# Make 'models' importable from this standalone script
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from models.login_attempts import log_attempt

load_dotenv()

LOGIN = os.getenv("LOGIN")
PASSWORD = os.getenv("PASSWORD")

username = sys.argv[1] if len(sys.argv) > 1 else ''
password = sys.argv[2] if len(sys.argv) > 2 else ''

def validate(username, password):
    if not re.fullmatch(r"^[A-Za-z0-9_]+$", username):
        return False, "Invalid username format"
    if not re.fullmatch(r"^[A-Za-z0-9@%&*!#]+$", password):
        return False, "Invalid password format"
    if username != LOGIN or password != PASSWORD:
        return False, "Incorrect credentials"
    return True, "Login successful"

valid, message = validate(username, password)
log_attempt(username, valid)
print("SUCCESS" if valid else "ERROR:" + message)