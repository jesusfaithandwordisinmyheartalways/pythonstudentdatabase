import sys

if len(sys.argv) > 1:
    name = sys.argv[1]
    print(f"Processing new student name: {name}")
else:
    print("No name provided.")

    