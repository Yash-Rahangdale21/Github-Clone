const fs = require("fs").promises; //promises use for creating filess
const path = require("path");

async function initRepo() {
  const repoPath = path.resolve(process.cwd(), ".hiddenGit"); // Define the repository path
  const commitsPath = path.join(repoPath, "commits"); // Define the commits directory path

  try {
    await fs.mkdir(repoPath, { recursive: true }); // Create the repository directory if it doesn't exist
    await fs.mkdir(commitsPath, { recursive: true }); // Create the commits directory if it doesn't exist
    await fs.writeFile(
        path.join(repoPath,"config.json"),
        JSON.stringify({ bucket: process.env.S3_BUCKET })
    );
    console.log("Repository initialized successfully.");
  } catch (err) {
    console.error("Error initializing repository:", err);
  }
}

module.exports = { initRepo };
