const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const orgName = "ossf";


const repoListYaml = fs.readFileSync("./.github/repoList.yml", "utf8");
const repoList = yaml.load(repoListYaml);

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

const uniqueSectionHeaders = [];

function clearReadmeFiles() {
  for (const repoName of repoList) {
    const readmePath = path.join(repoName, "README.md");
    if (fs.existsSync(readmePath)) {
      fs.writeFileSync(readmePath, "");
    }
  }
}

function reorderReadmeContent(content) {
  const sections = {};
  const regex = /^#{2,3}\s(.+?)(?:\r?\n|\r)/gm;
  let match;

  const firstParagraphRegex = /(^[\s\S]*?(?=\n\n))/;
  const firstParagraph = (content.match(firstParagraphRegex) || [""])[0].trim();

  while ((match = regex.exec(content)) !== null) {
    const sectionTitle = match[1].trim();
    const sectionStart = match.index;
    const sectionEnd = content.indexOf("\n##", sectionStart + match[0].length) || content.length;

    sections[sectionTitle] = content.slice(sectionStart, sectionEnd).trim();
  }

  let reorderedContent = firstParagraph;
  for (const title of sectionOrder) {
    if (sections[title]) {
      reorderedContent += `\n\n## ${title}\n\n${sections[title]}`;
    } else {
      reorderedContent += `\n\n## ${title}\n\n`;
    }
  }

  return reorderedContent.trim();
}

async function fetchReadmes() {
  for (const repoName of repoList) {
    try {
      const readmeData = await octokit.repos.getReadme({ owner: orgName, repo: repoName });
      const readmeContent = Buffer.from(readmeData.data.content, "base64").toString();

      // Extract the section headers from the README file
      const sectionHeaders = readmeContent.match(/## (.+)/g);

      // Add the unique section headers to the new array
      for (const sectionHeader of sectionHeaders) {
        if (!uniqueSectionHeaders.includes(sectionHeader)) {
          uniqueSectionHeaders.push(sectionHeader);
        }
      }
    } catch (error) {
      console.error(`Error fetching README for ${repoName}: ${error.message}`);
    }
  }

  // Sort the unique section headers in the desired order
  uniqueSectionHeaders.sort(function(a, b) {
    return sectionOrder.indexOf(a) - sectionOrder.indexOf(b);
  });

  // Create a new README file with the unique section headers
  const newReadmeContent = uniqueSectionHeaders.map(function(sectionHeader) {
    return `## ${sectionHeader}`;
  }).join("\n\n");

  // Write the new README file to disk
  fs.writeFileSync("./new_readme.md", newReadmeContent);
}

// Create a new README index file
const indexContent = `
# Table of Contents

${uniqueSectionHeaders.map(function(sectionHeader) {
  return `* ${sectionHeader}`;
}).join("\n\n")}`;

// Write the new README index file to disk
fs.writeFileSync("./new_readme_index.md", indexContent);


// Call the fetchReadmes function
fetchReadmes();