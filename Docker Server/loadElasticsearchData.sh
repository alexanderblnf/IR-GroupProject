#!/bin/bash

curl -X DELETE 'http://elasticsearch:9200/_all' && python elasticsearchPush.py