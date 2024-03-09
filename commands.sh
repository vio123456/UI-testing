#!/bin/bash

npm init -y
git init 
npm i --save-dev mocha@10.2.0 chai@4.3.7 selenium-webdriver@4.8.0 geckodriver@4.3.2
npm pkg set = 'scripts.test'='mocha'