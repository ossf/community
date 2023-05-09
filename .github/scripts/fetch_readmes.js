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

function combineReadmes(readmeContents, sectionOrder) {
  const combinedSections = {};

  for (const sectionTitle of sectionOrder) {
    combinedSections[sectionTitle] = new Set();
  }

  for (const content of readmeContents) {
    const regex = /^#{2,3}\s(.+?)(?:\r?\n|\r)/gm;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const sectionTitle = match[1].trim();
      const sectionStart = match.index + match[0].length;
      const sectionEnd = content.indexOf("\n##", sectionStart) || content.length;

      if (combinedSections.hasOwnProperty(sectionTitle)) {
        combinedSections[sectionTitle].push(content.slice(sectionStart, sectionEnd).trim());
      }
    }
  }

  let combinedReadme = "";
  for (const [sectionTitle, sections] of Object.entries(combinedSections)) {
    combinedReadme += `## ${sectionTitle}\n\n`;
    combinedReadme += Array.from(sections).join("\n\n") + "\n\n";
  }

  return combinedReadme.trim();
}

async function fetchReadmes() {
  clearReadmeFiles();

  const readmeContents = [];

  for (const repoName of repoList) {
    try {
      const readmeData = await octokit.repos.getReadme({ owner: orgName, repo: repoName });
      const readmeBuffer = Buffer.from(readmeData.data.content, "base64");
      const readmeContent = reorderReadmeContent(readmeBuffer.toString("utf-8"));
      readmeContents.push(readmeContent);

      const repoDir = path.join(__dirname, "..", repoName);
      if (!fs.existsSync(repoDir)) {
        fs.mkdirSync(repoDir);
      }

      const readmePath = path.join(repoDir, "README.md");
      fs.writeFileSync(readmePath, readmeContent);

    } catch (error) {
      console.error(`Error fetching README for ${repoName}: ${error.message}`);
    }
  }

  const combinedReadme = combineReadmes(readmeContents, sectionOrder);
  fs.writeFileSync("README.md", combinedReadme);
}


async function main() {
  const readmeContents = await fetchReadmes();
  const combinedReadme = combineReadmes(readmeContents, sectionOrder);
  fs.writeFileSync('README.md', combinedReadme);
}

main();