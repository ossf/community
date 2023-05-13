const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const orgName = "ossf";

const repoListYaml = fs.readFileSync("./.github/repoList.yml", "utf8");
const repoList = yaml.load(repoListYaml);

const sectionOrder = [
  ["Motivation"],
  ["Objective"],
  ["Vision"],
  ["Scope"],
  ["Current Work", "Active Projects"],
  ["Quick Start"],
  ["Get Involved"],
  ["Meeting times"],
  ["Meeting Notes"],
  ["Project Maintainers"],
  ["Project Collaborators"],
  ["Licenses"],
  ["Charter", "Governance"],
  ["Antitrust Policy", "Antitrust Policy Notice"]
];

function clearReadmeFiles() {
  for (const repoData of repoList) {
    const newRepoName = repoData.newRepoName;
    const readmePath = path.join("..", "..", newRepoName, "README.md");
    if (fs.existsSync(readmePath)) {
      fs.writeFileSync(readmePath, "");
    }
  }
}

function reorderReadmeContent(content) {
  const sections = {};
  const regex = /^#{2,4}\s(.+?)(?:\r?\n|\r)/gmi;
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
  for (const titleArr of sectionOrder) {
    for (const title of titleArr) {
      const lowerCaseTitle = title.toLowerCase();
      if (sections[lowerCaseTitle]) {
        reorderedContent += `\n\n${sections[lowerCaseTitle]}`;
        delete sections[lowerCaseTitle];
      } else {
        reorderedContent += `\n\n## ${title}\n\nTBD`;
      }
    }
  }

  for (const section in sections) {
    reorderedContent += `\n\n${sections[section]}`;
  }


  return reorderedContent.trim();
}

async function fetchReadmes() {
  clearReadmeFiles();

  for (const repoData of repoList) {
    try {
      const readmeData = await octokit.repos.getReadme({ owner: orgName, repo: repoData.oldRepoName });
      const readmeContent = Buffer.from(readmeData.data.content, "base64").toString();

      const repoDir = path.join(__dirname, "..", "..", repoData.newRepoName);
      if (!fs.existsSync(repoDir)) {
        fs.mkdirSync(repoDir);
      }

      const reorderedContent = reorderReadmeContent(readmeContent);
      fs.writeFileSync(path.join(repoDir, "README.md"), reorderedContent);
    } catch (error) {
      console.error(`Error fetching README for ${repoData.oldRepoName}: ${error.message}`);
    }
  }
}

fetchReadmes();
