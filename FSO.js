#!/usr/bin/env node

const fs=require("fs");
const path=require("path");

const help = require('./commands/help.js');
const organize = require('./commands/organize');
const tree= require('./commands/tree');


let inputArr=process.argv.splice(2);




let command=inputArr[0];
switch(command){
    case 'tree':
        tree(inputArr[1]);
        break;
    case 'organize':
        organize(inputArr[1]);
        break;
    case 'help':
        help();
        break;
    default:
        console.log("Please Enter a valid command 🙏🙏🙏🙏🙏🙏");
}










