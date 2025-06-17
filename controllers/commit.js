const fs = require('fs').promises;
const path = require("path");
const {v4:uuidv4} = require('uuid'); // For generating unique commit IDs  v4 is secure and loading time is fast

async function commitRepo(message)
{
    const repoPath = path.resolve(process.cwd(), '.hiddenGit'); // Define the repository path
    const stagingPath = path.join(repoPath, 'staging'); // Define the staging directory path
    const commitsPath = path.join(repoPath, 'commits'); // Define the commits directory path

    try {
        const files = await fs.readdir(stagingPath); // Read files from the staging area
        if (files.length === 0) {
            console.log("No files to commit.");
            return;
        }

        const commitID = uuidv4(); // Generate a unique commit ID
        const commitDir = path.join(commitsPath, commitID); // Create a directory for the commit
        await fs.mkdir(commitDir, { recursive: true });

        // Copy staged files to the commit directory
        for (const file of files) {
            await fs.copyFile(
                path.join(stagingPath, file),
                path.join(commitDir, file));
        }

        // Write commit metadata
        const metadata = {
            id: commitID,
            message: message,
            timestamp: new Date().toISOString(),
            files: files,
        };
        await fs.writeFile(path.join(commitDir, 'commits.json'), JSON.stringify(metadata, null, 2));

        console.log(`Commit successful with ID: ${commitID}`);
    } catch (err) {
        console.error("Error committing files:", err);
    }
    
}

module.exports = { commitRepo };