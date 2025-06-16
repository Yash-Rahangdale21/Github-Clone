const fs = require('fs').promises; //promises use for creating filess
const path = require('path');
async function initRepo(){
    const repoPath = path.resolve(process.cwd(),".hiddenGit"); // Define the repository path
   
}

module.exports = {initRepo};