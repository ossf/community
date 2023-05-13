const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const orgName = "ossf";

const REPO_LIST_PATH = "./.github/repoList.yml";
const README_FILENAME = "README.md";
const DIR_PATH = path.join(__dirname, "..", "..");

const repoList = yaml.load(fs.readFileSync(REPO_LIST_PATH, "utf8"));


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
  ["Licenses"],
  ["Charter", "Governance"],
  ["Antitrust Policy", "Antitrust Policy Notice"]
];

async function clearReadmeFiles() {
  for (const repoData of repoList) {
    const readmePath = path.join(DIR_PATH, repoData.newRepoName, README_FILENAME);
    if (fs.existsSync(readmePath)) {
      await fs.writeFile(readmePath, "");
    }
  }
}

function generateLeadsMarkdown(leads) {
  return leads.map(lead => `- [${lead.name}](https://github.com/${lead.githubId})`).join("\n");
}

function reorderReadmeContent(content, description, leadsMarkdown) {
  const sections = {};
  const regex = /^#{2,4}\s(.+?)(?:\r?\n|\r)/gmi;
  let match;

  const firstParagraphRegex = /(^[\s\S]*?(?=\n#{2,3}))/;
  const firstParagraph = (content.match(firstParagraphRegex) || [""])[0].trim();

  const firstParagraphWithDescription = `${description}\n\n The designated lead(s):\n${leadsMarkdown}\n\n${firstParagraph}`;

  while ((match = regex.exec(content)) !== null) {
    const sectionTitle = match[1].trim().toLowerCase();
    const sectionStart = match.index;
    const sectionEnd = content.indexOf("\n##", sectionStart + match[0].length) || content.length;

    if (!sections[sectionTitle]) {
      sections[sectionTitle] = content.slice(sectionStart, sectionEnd).trim();
    }
  }

  let reorderedContent = firstParagraphWithDescription;
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
  await clearReadmeFiles();

  for (const repoData of repoList) {
    try {
      const readmeData = await octokit.repos.getReadme({ owner: orgName, repo: repoData.oldRepoName });
      const readmeContent = Buffer.from(readmeData.data.content, "base64").toString();

      const repoDir = path.join(DIR_PATH, repoData.newRepoName);
      if (!fs.existsSync(repoDir)) {
        await fs.mkdir(repoDir, { recursive: true });
      }

      const leadsMarkdown = generateLeadsMarkdown(repoData.leads);
      const reorderedContent = reorderReadmeContent(readmeContent, repoData.description, leadsMarkdown);

      await fs.writeFile(path.join(repoDir, README_FILENAME), reorderedContent);
    } catch (error) {
      console.error(`Error fetching README for ${repoData.oldRepoName}: ${error.message}`);
    }
  }
}

fetchReadmes();
