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

// Define your desired section order
const sectionOrder = [
  "Motivation",
  "Objective",
  "Vision",
  "Scope",
  "Current Work",
  "Quick Start",
  "Get Involved",
  "Meeting times",
  "Governance",
  "Project Maintainers",
  "Project Collaborators",
  "Active projects",
  "Licenses",
  "Charter",
  "Antitrust Policy Notice"
];



function reorderReadmeContent(content) {
  const sections = {};
  const regex = /^##\s(.+)$/gm; // A regex pattern to match sections with their headings
  let match;

  // Extract the first paragraph
  const firstParagraphRegex = /(^[\s\S]*?(?=\n\n))/;
  const firstParagraph = (content.match(firstParagraphRegex) || [""])[0].trim();

  while ((match = regex.exec(content)) !== null) {
    const sectionTitle = match[1].trim();
    const sectionStart = match.index;
    const sectionEnd = content.indexOf("\n##", sectionStart + match[0].length) || content.length;

    // Extract the section content and store it in the 'sections' object
    sections[sectionTitle] = content.slice(sectionStart, sectionEnd).trim();
  }

  // Reorder the sections based on the 'sectionOrder' array
  let reorderedContent = firstParagraph;
  for (const title of sectionOrder) {
    if (sections[title]) {
      reorderedContent += `\n\n## ${title}\n\n${sections[title]}`;
    }
  }

  return reorderedContent.trim();
}

async function fetchReadmes() {
    for (const repoName of repoList) {
      try {
        const readmeData = await octokit.repos.getReadme({ owner: orgName, repo: repoName });
        const readmeContent = Buffer.from(readmeData.data.content, "base64").toString();
  
        // Create a directory for the current repository
        const repoDir = path.join(repoName);
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