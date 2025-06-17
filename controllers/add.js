const fs = require('fs').promises; // Use promises for file operations
const path = require('path'); // Use path for handling file paths
// Function to add a repository


async function addRepo(filePath) {
    const repoPath = path.resolve(process.cwd(), '.hiddenGit'); // Define the repository path
    const stagingPath = path.join(repoPath, 'staging'); // Define the staging directory path

    try {
        await fs.mkdir(stagingPath, { recursive: true }); 
        const fileName = path.basename(filePath); // Get the file name from the provided path
        await fs.copyFile(filePath, path.join(stagingPath, fileName));
        console.log(`File ${fileName} added to the Staging area.`);
    } catch (err) {
        console.error("Error adding file:", err);
    }
}

module.exports = { addRepo };