import pandas as pd
import numpy as np
from elasticsearch import Elasticsearch
import pyes # For documentation around pyes.es : https://pyes.readthedocs.org/en/latest/references/pyes.es.html
import json
import re

def formatIndexesForElasticSearch(doc):
	blacklist = ['"','*','\\','<','|',',','>','/','?']
	newDoc = doc

	for char in blacklist:
        newDoc['Secondary Category'] = newDoc['Secondary Category'].replace(char, "")
        newDoc['Primary Category'] = newDoc['Primary Category'].replace(char, "")

    newDoc['Secondary Category'] = re.sub(' +',' ',newDoc['Secondary Category'])
    newDoc['Primary Category'] = re.sub(' +',' ',newDoc['Primary Category'])
    newDoc['Category'] = newDoc['Primary Category'].lower().replace(" ", "-") + "++" + newDoc['Secondary Category'].lower().replace(" ", "-")

    return newDoc

# Convert a panda's dataframe to json
# Add a id for looping into elastic search index
dataSet["no_index"] = [x+1 for x in range(len(dataSet.index))]

# Convert into json
tmp = dataSet.to_json(orient = "records")

# Load each record into json format before bulk
df_json= json.loads(tmp)

# by default we connect to localhost:9200
es = Elasticsearch()
for doc in df_json:
    formattedDoc = formatIndexesForElasticSearch(doc)
    es.index(index=formattedDoc['Category'], doc_type='uk', id=formattedDoc['no_index'], body=formattedDoc)