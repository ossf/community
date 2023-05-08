const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const orgName = "ossf";

// Replace with your desired repository names
const repoList = [
  'wg-endusers',
  'wg-best-practices-os-developers',
  'wg-security-tooling',
  'wg-supply-chain-integrity',
  'wg-vulnerability-disclosures',
  'wg-securing-critical-projects',
  'wg-identifying-security-threats',
  'wg-securing-software-repos'
];

async function fetchReadmes() {
    for (const repoName of repoList) {
      try {
        const readmeData = await octokit.repos.getReadme({ owner: orgName, repo: repoName });
        const readmeContent = Buffer.from(readmeData.data.content, "base64").toString();
  
        // Create a directory for the current repository
        const repoDir = path.join("readmes", repoName);
        if (!fs.existsSync(repoDir)) {
          fs.mkdirSync(repoDir);
        }
  
        // Save the README file inside the repository directory
        fs.writeFileSync(path.join(repoDir, "README.md"), readmeContent);
      } catch (error) {
        console.error(`Error fetching README for ${repoName}: ${error.message}`);
      }
    }
  }
  
  fetchReadmes();