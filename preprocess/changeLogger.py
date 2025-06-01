# import json
# import sys
# #This file is going to help log the changes I make to a text file. 


# def traveres_json(file):
#     with open(file) as f:
#         data = json.load(f)

#     for k in f:
#         print(k)

# def get_changes(base_file):
#     #traverse the json objects
#     with open(base_file) as base_file:
#         base_file = json.load(base_file)

#     for key in base_file:
#         print(key)

# if __name__ == "__main__":
#     for i in range(len(sys.argv)):
#         print("system arguement " + str(i) + ": " + str(sys.argv[i])) 

#     match sys.argv[1]:
#         case "get_changes":
#             if len(sys.argv) != 3:
#                 print("Usage: get_changes needs at least one file path")
#                 sys.exit(1)

#             base_file = sys.argv[2]
#             get_changes(base_file)
#         case "make"

import json
import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt

path = "/Users/raghunema/dndWikiProject/dnd-wiki/preprocess/dicitionary.json"
with open(path, "r") as file: 
    data = json.load(file)

df = pd.DataFrame(data)
df = df.transpose()
df = df.fillna(0)

G = nx.from_pandas_adjacency(df, create_using=nx.DiGraph)
weights = [d['weight'] * 0.5 for (_, _, d) in G.edges(data=True)]

# Draw the graph
plt.figure(figsize=(10, 8))
pos = nx.spring_layout(G, seed=42)  # Force-directed layout
nx.draw(
    G, pos,
    with_labels=True,
    node_color='lightblue',
    node_size=700,
    width=[w * 0.5 for w in weights],
    edge_color='gray',
    font_size=10,
    arrows=True,
    arrowsize=20,
    arrowstyle='->'
)
plt.title("Graph Visualization")
plt.show()