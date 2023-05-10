const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const orgName = "ossf";


const repoListYaml = fs.readFileSync("./.github/repoList.yml", "utf8");
const repoList = yaml.load(repoListYaml);

const sectionOrder = [
  ["Objective","Motivation"],
  ["Vision"],
  ["Scope"],
  ["Current Work", "Active Projects"],
  ["Quick Start"],
  ["Get Involved"],
  ["Meeting times"],
  ["Project Maintainers"],
  ["Project Collaborators"],
  ["Licenses"],
  ["Charter", "Governance"],
  ["Antitrust Policy"]
];

function clearReadmeFiles() {
  for (const repoName of repoList) {
    const readmePath = path.join(repoName, "README.md");
    if (fs.existsSync(readmePath)) {
      fs.writeFileSync(readmePath, "");
    }
  }
}

function createEmptySections() {
  const emptySections = {};
  for (const titleGroup of sectionOrder) {
    for (const title of titleGroup) {
      const lowerCaseTitle = title.toLowerCase();
      emptySections[lowerCaseTitle] = "";
    }
  }
  return emptySections;
}


function reorderReadmeContent(content) {
  const sections = createEmptySections();
  const regex = /^#{2,3}\s(.+?)(?:\r?\n|\r)/gmi;
  let match;

  const firstParagraphRegex = /(^[\s\S]*?(?=\n#{2,3}))/;
  const firstParagraph = (content.match(firstParagraphRegex) || [""])[0].trim();

  while ((match = regex.exec(content)) !== null) {
    const sectionTitle = match[1].trim().toLowerCase();
    const sectionStart = match.index;
    const sectionEnd = content.indexOf("\n##", sectionStart + match[0].length) || content.length;

    if (!sections[sectionTitle]) {
      sections[sectionTitle] = content.slice(sectionStart, sectionEnd).trim();
    }
  }

  let reorderedContent = firstParagraph;
  for (const titleGroup of sectionOrder) {
    let foundSection = false;
    for (const title of titleGroup) {
      const lowerCaseTitle = title.toLowerCase();
      if (sections[lowerCaseTitle]) {
        reorderedContent += `\n\n${sections[lowerCaseTitle]}`;
        foundSection = true;
        break;
      }
    }
    
    if (!foundSection) {
      reorderedContent += `\n\n## ${titleGroup[0]}\n\nTBD`;
    }
  }

  return reorderedContent.trim();
}




async function fetchReadmes() {
  clearReadmeFiles();

  for (const repoName of repoList) {
    try {
      const readmeData = await octokit.repos.getReadme({ owner: orgName, repo: repoName });
      const readmeContent = Buffer.from(readmeData.data.content, "base64").toString();

      const repoDir = path.join(__dirname, "..", "..", repoName); 
      if (!fs.existsSync(repoDir)) {
        fs.mkdirSync(repoDir);
      }

      const reorderedContent = reorderReadmeContent(readmeContent);
      fs.writeFileSync(path.join(repoDir, "README.md"), reorderedContent);
    } catch (error) {
      console.error(`Error fetching README for ${repoName}: ${error.message}`);
    }
  }
}

fetchReadmes();