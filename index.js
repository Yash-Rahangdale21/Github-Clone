const yargs = require("yargs");
const { hideBin } = require("yargs/helpers"); // for parsing command line arguments

const { initRepo } = require("./controllers/init"); // Importing the initRepo function from controllers/init.js
const { addRepo } = require("./controllers/add"); // Importing the add function from controllers/add.js
const { commitRepo } = require("./controllers/commit"); 
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const {revertRepo} = require("./controllers/revert");




yargs(hideBin(process.argv))
.command("init","Initialise a new repository",{},initRepo)
.command("add <file>","Add a file to the Repository",
    (yargs)=>
    { yargs.positional("file",{
        describe:"File to add to the staging area",
        type:"string",
    });
},
    addRepo)
.command("commit <message>","Commit the staged files",(yargs)=>{
    yargs.positional("message",{
        describe:"Commit message",
        type:"string",
    }); 
},commitRepo)
.command("push","Push commits to S3",{},pushRepo)
.command("pull","Pull commits from S3",{},pullRepo)
.command("revert <commitID>","Revert to a specific commit",(yargs) =>{
    yargs.positional("commitID",{
        describe:"Commit ID to revert to",
        type:"string",
    });
},revertRepo)
.demandCommand(1,"you need atleast one command").help().argv; // process ke arguments read karega
  