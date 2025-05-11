import json
import sys
#This file is going to help log the changes I make to a text file. 


def traveres_json(file):
    with open(file) as f:
        data = json.load(f)

    for k in f:
        print(k)

def get_changes(base_file):
    #traverse the json objects
    with open(base_file) as base_file:
        base_file = json.load(base_file)

    for key in base_file:
        print(key)

if __name__ == "__main__":
    for i in range(len(sys.argv)):
        print("system arguement " + str(i) + ": " + str(sys.argv[i])) 

    match sys.argv[1]:
        case "get_changes":
            if len(sys.argv) != 3:
                print("Usage: get_changes needs at least one file path")
                sys.exit(1)

            base_file = sys.argv[2]
            get_changes(base_file)



