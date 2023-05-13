const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const util = require('util');
const writeFile = util.promisify(fs.writeFile)

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
      await writeFile(readmePath, "");
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

  let mainTitle = "";
  let mainContent = "";

  while ((match = regex.exec(content)) !== null) {
    const sectionTitle = match[1].trim();
    const sectionStart = match.index;
    const sectionEnd = content.indexOf("\n##", sectionStart + match[0].length) || content.length;

    if (!mainTitle) {
      const sectionContent = content.slice(sectionStart, sectionEnd).trim();
      mainTitle = sectionTitle;
      mainContent = sectionContent;
    }

    if (!sections[sectionTitle]) {
      sections[sectionTitle] = content.slice(sectionStart, sectionEnd).trim();
    }
  }

  let reorderedContent = `# ${mainTitle}\n\n`;

  reorderedContent += `${mainContent}\n\n`;

  reorderedContent += `${description}\n\n`;

  reorderedContent += `The designated lead(s):\n${leadsMarkdown}\n\n`;

  for (const titleArr of sectionOrder) {
    let sectionAdded = false;

    for (const title of titleArr) {
      const lowerCaseTitle = title.toLowerCase();

      if (sections[lowerCaseTitle]) {
        reorderedContent += `## ${title}\n${sections[lowerCaseTitle]}\n`;
        sectionAdded = true;
        break;
      }
    }

    if (!sectionAdded) {
      reorderedContent += `## ${titleArr[0]}\n\nTBD\n\n`;
    }
  }

  return reorderedContent.trim();
}

function appendRepoInfoToMainReadme() {
  const mainReadmePath = path.join(__dirname, "..", "..", "README.md");
  let mainReadmeContent = fs.existsSync(mainReadmePath) ? fs.readFileSync(mainReadmePath, "utf8") : "";

  const startMarker = "\n\n## Repository Information\n\n";
  const endMarker = "\n\n## End of Repository Information\n\n";

  const start = mainReadmeContent.indexOf(startMarker);
  const end = mainReadmeContent.indexOf(endMarker);

  let newSectionContent = "";

  for (const repoData of repoList) {
    const repoUrl = `https://github.com/${orgName}/${repoData.oldRepoName}`;
    const newRepoUrl = `https://github.com/${orgName}/${repoData.newRepoName}`;

    newSectionContent += `### [${repoData.newRepoName}](${newRepoUrl})\n`;
    newSectionContent += `**Original Repository:** [${repoData.oldRepoName}](${repoUrl})\n`;
    newSectionContent += `\n **Description:** ${repoData.description}\n`;
    newSectionContent += `**Leads:**\n`;

    if (repoData && Array.isArray(repoData.leads)) {
      for (const lead of repoData.leads) {
        newSectionContent += `- [${lead.name}](https://github.com/${lead.githubId})\n`;
      }
    } else {
      console.log(`Leads property does not exist or is not iterable for repoData: ${JSON.stringify(repoData)}`);
    }

    newSectionContent += "\n";
  }

  if (start >= 0 && end >= 0) {
    mainReadmeContent = mainReadmeContent.slice(0, start) + startMarker + newSectionContent + endMarker + mainReadmeContent.slice(end + endMarker.length);
  } else {
    mainReadmeContent += startMarker + newSectionContent + endMarker;
  }

  fs.writeFileSync(mainReadmePath, mainReadmeContent);
}




async function fetchReadmes() {
  await clearReadmeFiles();

  for (const repoData of repoList) {
    try {
      const readmeData = await octokit.repos.getReadme({ owner: orgName, repo: repoData.oldRepoName });
      const readmeContent = Buffer.from(readmeData.data.content, "base64").toString();

      const repoDir = path.join(DIR_PATH, repoData.newRepoName);
      if (!fs.existsSync(repoDir)) {
        await fs.promises.mkdir(repoDir, { recursive: true });
      }

      const leadsMarkdown = generateLeadsMarkdown(repoData.leads);
      const reorderedContent = reorderReadmeContent(readmeContent, repoData.description, leadsMarkdown, repoData.newRepoName);

      await fs.promises.writeFile(path.join(repoDir, README_FILENAME), reorderedContent);
    } catch (error) {
      console.error(`Error fetching README for ${repoData.oldRepoName}: ${error.message}`);
    }
  }

  appendRepoInfoToMainReadme();
}

fetchReadmes();
