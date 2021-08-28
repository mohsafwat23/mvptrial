# Outvite

> Main website hosted @outvite.me

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)

![](https://www.outvite.me/static/users/img/favicon.jpg)

## Requirements  (Prerequisites)
Tools and packages required to successfully install this project.

1) Linux [Install](https://youtu.be/xzgwDbe7foQ) 

2) Install npm and node.js

For Windows

3) Python 3.8 and up [Install](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-programming-environment-on-an-ubuntu-20-04-server)

For MacOS

3) Python 3.8 and up [Install](https://docs.python-guide.org/starting/install3/osx/)

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

&& 

`cd to frontend and do npm install to install all dependencies`

`npm init -y`

`npm install`

## Run code

`python manage.py makemigrations`

`python manage.py migrate`

`python manage.py migrate --run-syncdb`

`python manage.py updatemodels`

In another terminal

`activate your venv`

`cd frontend`

`npm run dev`
