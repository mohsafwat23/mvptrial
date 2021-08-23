# Outvite

> Main website hosted @outvite.me

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)

![](https://www.outvite.me/static/users/img/favicon.jpg)

## Requirements  (Prerequisites)
Tools and packages required to successfully install this project.

1) Linux [Install](https://youtu.be/xzgwDbe7foQ) 

For Windows 
2) Python 3.8 and up [Install](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-programming-environment-on-an-ubuntu-20-04-server)

For MacOS
2) Python 3.8 and up [Install](https://docs.python-guide.org/starting/install3/osx/)

Note: Skip step 1 if you are a MacOS user.

## Installation
A step by step list of commands / guide that informs how to install an instance of this project. 

!!!! ASK FOR YOUR BRANCH NAME !!!!

`git clone -b {your_branch_name} https://github.com/outvite/eir.git`



For Linux

Install Venv Package
`apt-get install python3-venv`

Create A Virtual Environment
`python3 -m venv venv`

Activate Your Virtual Environment
`source venv/bin/activate`

Install Dependencies
`pip install -r requirements.txt`


For MacOS

Install Venv Package
`pip install virtualenv`

Create A Virtual Environment
`virtualenv venv`

Activate Your Virtual Environment
`source venv/bin/activate`

Install Dependencies
`pip install -r requirements.txt`

# mvptrial
Install npm and node.js

if you want make a virtual env, you can make one in the working directrory !

**Setup**

pip install -r requirements.txt

python manage.py makemigrations

python manage.py migrate


In another terminal, cd to frontend

npm init -y

npm i webpack webpack-cli --save-dev

npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev

npm i react react-dom --save-dev

npm install @material-ui/core

npm install @material-ui/lab

npm install @babel/plugin-proposal-class-properties

npm install react-router-dom

npm install @material-ui/icons

npm install --save react-tinder-card --legacy-peer-deps 

npm run dev
