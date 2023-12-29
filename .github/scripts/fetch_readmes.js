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
  ["Contribute", "Quick Start"],
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

  // New regex for the main title
  const mainTitleRegex = /^#\s(.+?)(?:\r?\n|\r)/m;
  const mainTitle = (content.match(mainTitleRegex) || ["", ""])[1].trim();

  const firstParagraphRegex = /(^[\s\S]*?(?=\n#{2,3}))/;
  let firstParagraph = (content.match(firstParagraphRegex) || [""])[0].trim();

  // Remove the original main title from the first paragraph
  firstParagraph = firstParagraph.replace(mainTitleRegex, '').trim();

  const firstParagraphWithDescription = `# ${mainTitle}\n\n${description}\n\n The designated lead(s):\n${leadsMarkdown}\n\n${firstParagraph}`;

  // Remove the original main title from the content
  content = content.replace(mainTitleRegex, '').trim();

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

function appendRepoInfoToMainReadme() {
  const mainReadmePath = path.join(__dirname, "..", "..", "README.md");
  let mainReadmeContent = fs.existsSync(mainReadmePath) ? fs.readFileSync(mainReadmePath, "utf8") : "";

  const startMarker = "\n\n## Work Group Information\n\n";
  const endMarker = "\n\n## End of Work Group Information\n\n";

  const start = mainReadmeContent.indexOf(startMarker);
  const end = mainReadmeContent.indexOf(endMarker);

  let newSectionContent = "";

  for (const repoData of repoList) {
    const repoUrl = `https://github.com/${orgName}/${repoData.oldRepoName}`;
    const newRepoUrl = `https://github.com/${orgName}/${repoData.newRepoName}`;

    // Construct the URL for the raw logo content
    const logoUrl = repoData.logo ? `https://raw.githubusercontent.com/${orgName}/community/main/.github/logos/${repoData.logo}` : null;

    newSectionContent += `### [${repoData.newRepoName}](${newRepoUrl})\n`;

    if (logoUrl) {
      newSectionContent += `\n ![Logo](${logoUrl})\n`;
    }

    newSectionContent += `\n ${repoData.description}\n`;
    newSectionContent += `\n [Join us via this Zoom Link](${repoData.zoom})\n`;
    newSectionContent += `\n We meet ${repoData['meeting-time']}\n`;
    newSectionContent += `\n[Here are our meeting notes](${repoData.notes})\n`;
    newSectionContent += `\n[Join us on Slack channel #${repoData.slack_name}](${repoData.slack_link})\n`;
    newSectionContent += `\n **Our Group Lead(s):**\n`;

    if (repoData && Array.isArray(repoData.leads)) {
      for (const lead of repoData.leads) {
        newSectionContent += `- [${lead.name}](https://github.com/${lead.githubId})\n`;
      }
    } else {
      console.log(`Leads property does not exist or is not iterable for repoData: ${JSON.stringify(repoData)}`);
    }

    newSectionContent += "\n";
    newSectionContent += `<br clear="all"/>`;
    newSectionContent += `<hr></hr>`;
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
      const reorderedContent = reorderReadmeContent(readmeContent, repoData.description, leadsMarkdown);

      await fs.promises.writeFile(path.join(repoDir, README_FILENAME), reorderedContent);
    } catch (error) {
      console.error(`Error fetching README for ${repoData.oldRepoName}: ${error.message}`);
    }
  }

  appendRepoInfoToMainReadme();
}

fetchReadmes();

