#!/bin/bash

pm2 start process.json
cd app/python_server
python model.py
