## Motivation







Most developers are not security experts and even the most seasoned developers, security experts or not, make mistakes.  Tools can be used to help weed out security defects allowing developers to focus on the features they want to develop.



Supply chain issues and attacks cause significant damage worldwide including lost revenue, costs of ransomware payments, costs of mitigation, denial of access to resources, reduced customer trust, and public deception. As a matter of public trust, governments are beginning to mandate actions aimed at improving the security and integrity of supply chains. The [US White House Executive Order on Improving the Nation’s Cybersecurity](https://www.whitehouse.gov/briefing-room/presidential-actions/2021/05/12/executive-order-on-improving-the-nations-cybersecurity/) is one such example.





<table align="right">
  <tr><td><img align="right" src="https://imgs.xkcd.com/comics/dependency.png"></td></tr>
  <tr><td><a href="https://xkcd.com/2347">Source</a>. Randall Munroe. Licensed under <a href="https://creativecommons.org/licenses/by-nc/2.5/">CC BY-NC 2.5</a></td></tr>
</table>

Open Source Software has long suffered from a "tragedy of the commons" problem.
Organizations large and small make use of OSS every day, but many projects are struggling for the time, resources and attention they need.

This is a resource allocation problem - and we can help solve it together.
We need ways to connect critical projects we all rely on with organizations that can provide them with support.

Whether it is dedicated help from specialized experts or simply grant money or cloud credits, we recognize that no two
projects are the same, and support can come in many shapes.
We intend to work with upstream maintainers to understand what help and support they need, and then develop scalable processes to make
this help available.



Open source software is an essential part of modern software development, and
of practically all technology solutions. Adoption of open source software has
grown over the past two decades, powering everything from tiny "Internet of
Things" devices to the most advanced supercomputers in the world. This has led
to enormous productivity gains, allowing software engineers to focus more on
solving business problems and less on creating and re-creating the same
building blocks needed in many situations.

With these benefits, however, comes some risk. Attackers frequently target
open source projects and the ecosystems they are a part of in order to 
compromise the organizations or users that use those projects. It's
essential that we understand these threats and work to build defenses against
them.



This working group is for and focuses on the maintainers of software repositories, software registries, and tools which rely on them, at various levels including system, language, plugin, extensions and container systems. It provides a forum to share experiences and to discuss shared problems, risks and threats.

## Objective



The End User Working Group aims to ensure that the distinct and impactful voice of end users is heard in the development and delivery of the technical vision of OpenSSF.



Our objective is to provide open source developers with best practices recommendations, and with an easy way to learn and apply them.

Unlike other existing best practices list, we want it to be widely distributed to open source developers and community-sourced. And we want these practices to stick, thanks to an effective learning platform.



Our mission is to Identify, Evaluate, Improve, Develop & Ease Deployment of universally-accessible, developer focused tooling to help the open source community secure their code.  This space allows members to collaborate together on these goals.

* Identify - There are a large number of tools that developers can utilize in various development environments.  We need to ensure we understand the options available.
* Evaluate - Some tools are better than others.  We need to ensure quality tools are available to the open source community.
* Improve - Some tools need just a little bit of help to offer the best solution.  We need to, where possible, contribute to improve those tools.
* Develop - Despite the large number of tools available, there are still large areas of the security problem space that do not have tools to help developers find issues.  We will develop those tools where there is interest and bandwidth.
* Ease Deployment - __Most critically__, open source developers need to know what tools they should be using and how to easily integrate them into their development process.  Unless developers have an easy way to drop in security tooling, it is unlikely to be included.  We will provide this information to open source developers.



The objective of the Supply Chain Integrity Working Group (WG) is to provide a global community for collaborating to help individuals and organizations assess and improve the security of end-to-end supply chains for open source software.







Our objective is to enable stakeholders to have informed confidence in the
security of open source projects. This includes identifying threats to the
open source ecosystem and recommending practical mitigations. We will also
identify a set of key metrics and build tooling to communicate those metrics
to stakeholders, enabling a better understanding of the security posture of
individual open source software components.



* Enable faster cross-pollination of existing ideas across ecosystems (including technical measures, infrastructure approaches, and policies)
* Act as a clearinghouse for new ideas that could benefit multiple ecosystems
* Enable maintainers to better align and coordinate policies and changes between different ecosystems
* Identify & escalate needs for infrastructure and assistance for shared tooling and/or services (to be filled by supportive or sponsoring organizations (such as the [OpenSSF](https://www.openssf.org/)))
* Develop methods for sharing data related to software repositories, software registries, and tools which rely on them
* Delegate solving particular problems and goals to subgroups or other workgroups as appropriate

The working group may create:

* Normative, non-binding recommendations on common schemas
* Descriptive documentation of experiences and best practices

## Vision



The End Users Working Group (WG) represents the interests of public and private sector organizations that primarily consume open source rather than produce it.

We strive to:

- Ensure that the use cases for end user consumption of open-source software are understood and factored into OSSF programs.
- Provide the resources required by end users to develop and implement more efficient and effective strategies, processes, tools, best practices and solutions that secure software supply-chains.
- Provide a forum for learning from the experience and insights of peers.
- Create an End Users Working Group, with representation from key private industry, public sectors, and multiple geographical regions.
- Establish end user representation and active participation in OpenSSF working groups and leadership, both in the TAC and the Governing Board.



Our vision is to make it easy for developers to adopt these best practices, thanks to:

- _Identifying_ good practices, requirements, and tools that help open source developers create and maintain more secure software
- Helping maintainers _Learn_ to write secure software
- Provide tools to help developers _Adopt_ these good practices into their daily work

<img align="top" src="https://github.com/ossf/wg-best-practices-os-developers/blob/main/img/OpenSSF%20Dev%20Best%20Practices%20Projects%20Relations.png">



Our vision is to improve the perception of security in open source software.

# Governance

The [CHARTER.md](CHARTER.md) outlines the scope and governance of our group activities.

This group is chaired by Josh Bressers (@joshbressers).











## Scope



Based on the objective, mission, and goals above, we look to deliver specific delivereables:

- _Ensure that the use cases for end user consumption of open-source software are understood and factored into OSSF programs._
  - Refine Personas document
  - Develop a high level architecture and threat model of an end user within the supply chain
  - Identify controls/checks of interest to end users when ingesting OSS / vendor software (OSSF Scorecard)
- _Provide the resources required by end users to develop and implement more efficient and effective strategies, processes, tools, best practices and solutions that secure software supply-chains_
  - Bring more end users and their perspectives into the End Users Working Group, ensuring representation from as many industries, sectors and geographical regions as possible
  - Contact list showing multiple Linux Foundation groups contacted, individual companies also contacted
  - Development of guides, whitepapers, and materials focused on strategies and solutions for better security in software supply chains, open source software, and targeted towards end users.
    - Phase 1: Identify which guides / material is missing from existing material
- _Provide a forum for learning from the experience and insights of peers_
  - Establish end user representation and active participation in OpenSSF leadership, both TAC and the Governing Board_
  - Create matrix to show representation within working groups
    - Identify sub-team / focus areas
      - Recruitment
      - Marketing
      - Promote best practices and outreach



The Developer Best Practices group wants to help identify and curate an accessible [inventory](https://github.com/ossf/wg-best-practices-os-developers/blob/main/docs/inventory.md) of best practices

- Prioritized according to ROI for open source developers
- Categorized per technology, language, framework
- Community-curated

Help build a community

- Program to attract open source contributors and incentivize them to use and contribute to the inventory

Supply a Learning platform
-Any free course can be integrated into the platform

- The learner can follow a track, track their progress and get badges
- A suite of exercises are available for each best practice of the inventory











The scope of this working group includes "security", as opposed to privacy,
resiliency, or other related areas. We also consider the broad open source
ecosystem, as opposed to focusing exclusively on critical open source projects.



## Current Work



TBD



Our work is organized into several discrete-yet-related projects that help us achieve our goals:

- Concise guides for (1) developing software and (2) evaluating OSS (sandbox)

  - [Concise Guide for Developing More Secure Software](https://github.com/ossf/wg-best-practices-os-developers/blob/main/docs/Concise-Guide-for-Developing-More-Secure-Software.md#readme)
  - [Concise Guide for Evaluating Open Source Software](https://github.com/ossf/wg-best-practices-os-developers/blob/main/docs/Concise-Guide-for-Evaluating-Open-Source-Software.md#readme)

- _Common Requirement Enumeration (CRE) Project_ - (incubating) <https://www.opencre.org/>

  - Purpose - (Identify) Identify similar requirements in different specifications

- _Secure Software Development Fundamentals_ (online course) - <https://openssf.org/training/courses/> and <https://github.com/ossf/secure-sw-dev-fundamentals>
  - Purpose - (Learn) Teach software developers fundamentals of developing secure software
- _SKF - Security Knowledge Framework_ - <https://www.securityknowledgeframework.org/>
  - Purpose - (Identify/Adopt/Learn) Learn to integrate security by design in your web application
- _OpenSSF Best Practices Badge_ (formerly CII Best Practices badge) - <https://bestpractices.coreinfrastructure.org/> and <https://github.com/coreinfrastructure/best-practices-badge>
  - Purpose - (Identify/Adopt) Identifies FLOSS best practices & implements a badging system for those practices,
- _OpenSSF Scorecard Project_ - <https://github.com/ossf/scorecard>
  - Purpose - (Adopt) Automate analysis and trust decisions on the security posture of open source projects.
- _Great MFA Distribution Project_ - (incubating) <https://github.com/ossf/great-mfa-project>
  - Distribute MFA tokens to OSS developers and best practices on how to easily use them
- [_Compiler Options Hardening Guide for C and C++_](https://github.com/ossf/wg-best-practices-os-developers/blob/main/docs/Compiler_Hardening_Guides/Compiler-Options-Hardening-Guide-for-C-and-C%2B%2B.md) (incubating)
  - Recommended compiler option flags for C/C++ programs, especially warning and hardening flags, for developers & distributionss.
You can also see our older work, [Recommended compiler option flags for C/C++ programs](https://docs.google.com/document/d/1SslnJuqbFUyTFnhzkhC_Q3PPGZ1zrG89COrS6LV6pz4/edit#heading=h.b3casmpemf1b).
- _Interactive artwork_ - (incubating) <https://github.com/blabla1337/wg-best-practices-os-developers/tree/main/infinity2>
  - Place where we want to guide developers in what stage they can use what type of tooling or approach. We have tons of great tools and materials but hard to find for devs, using this page and interactive loop we want to guide them to find the right stuff.
- _Existing Guidelines for Developing and Distributing Secure Software_ [GitHub Repo](https://github.com/ossf/wg-best-practices-os-developers/blob/main/docs/Existing%20Guidelines%20for%20Developing%20and%20Distributing%20Secure%20Software.md)
  - Purpose - (Identify) - Highlight documentation and training materials that educate OSS developers on good secure coding practices
- _Package Manager Best Practices_ - (incubating) - <https://github.com/ossf/package-manager-best-practices>

  - Purpose - (Identify/Learn) Collect and document security best practices for projects using various package managers.

- [npm Best Practices Guide](https://github.com/ossf/package-manager-best-practices/blob/main/published/npm.md) - This document aims to be a one-time stop explaining the security supply-chain best practices when using npm's package manager.

  - Purpose - (Identify/Learn) Collect and document security best practices for projects npm.

- _Education SIG_ - (incubating) - <https://github.com/ossf/education/>

  - Purpose - (Learn) To provide industry standard secure software development training materials that will educate learners of all levels and backgrounds on how to create, compose, deploy, and maintain software securely using best practices in cyber and application security.

We welcome contributions, suggestions and updates to our projects. To contribute please fill in an [issue](https://github.com/ossf/wg-best-practices-os-developers/issues) or create a [pull request](https://github.com/ossf/wg-best-practices-os-developers/pulls).













## Quick Start



















The best way to get started is to simply join a working group meeting. You can also
read our [Meeting Minutes](https://docs.google.com/document/d/1AfI0S6VjBCO0ZkULCYZGHuzzW8TPqO3zYxRjzmKvUB4/edit?usp=sharing) to get up to speed with what we're up to.



## Get Involved





Anyone is welcome to join our open discussions related to the group's mission and charter.

- [2023 Meeting Notes](https://docs.google.com/document/d/1x-fMIt6ZIV6SM-M29xEVKeB505GbDzSIVXg-8uF_FQU/edit#)
- [2022 Meeting Minutes](https://docs.google.com/document/d/1ttqkcYPmYZyqvtkaHs92bx2UeVUiXDhuzP-0WbP11Fw/edit#)
- [Historic Group Notes 1](https://github.com/ossf/wg-best-practices-oss-developers/blob/main/meeting-minutes.md)
- [Historic Notes 2021](https://docs.google.com/document/d/1sJhaZxG_9Wb2Sg6a4KxqnIvo_to5OkhMkbBk_7UqtEc/edit#heading=h.cbmnhvjm63mj)
- [Recent WG report to the TAC on activities and project statuses](https://docs.google.com/presentation/d/1n_zaIdwaG7Tv1UA0ZPnxl0Z7sFenKt7aB2A1vfMtgjc/edit#slide=id.g13dc63f7ee3_0_114)
- [Discussions](https://github.com/ossf/wg-best-practices-os-developers/discussions)
- Official communications occur on the Best Practices [mailing list](https://lists.openssf.org/g/openssf-wg-best-practices)
- [Manage your subscriptions to Open SSF mailing lists](https://lists.openssf.org/g/main/subgroups)
- Join the conversation on [Slack](https://openssf.slack.com/archives/C01AHCRP8BT)











* Please get involved with our specific projects, e.g,.
* [Mailing List](https://lists.openssf.org/g/openssf-wg-security-threats) and [Security Reviews](https://github.com/ossf/security-reviews).
  ([Manage your subscriptions to OpenSSF mailing lists](https://lists.openssf.org/g/main/subgroups))
* [OpenSSF Community Calendar](https://calendar.google.com/calendar?cid=czYzdm9lZmhwNWk5cGZsdGI1cTY3bmdwZXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ)
* [Join us on Slack](https://openssf.slack.com/archives/C01A50B978T)



## Meeting times



Every 2 weeks, Thursday 10am EST/3pm UTC. The meeting invite with zoom details is available on the [public OSSF calendar](https://calendar.google.com/calendar?cid=czYzdm9lZmhwNWk5cGZsdGI1cTY3bmdwZXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ)



Every 2 weeks, Tuesday 10am EST. The meeting invite is available on the [public OSSF calendar](https://calendar.google.com/calendar?cid=czYzdm9lZmhwNWk5cGZsdGI1cTY3bmdwZXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ)


| Effort       |    Meeting Times                                         |    Meeting Notes/Agenda    |       Git Repo        | Slack Channel | Mailing List |
| :----------: | :------------------------------------------------------: | :------------------------: | :-------------------: | :-----------: | :----------: |
|   Full WG    | Every 2nd Tuesday 7:00a PT/10:00a ET/1400 UTC   | [Meeting Notes](https://docs.google.com/document/d/1x-fMIt6ZIV6SM-M29xEVKeB505GbDzSIVXg-8uF_FQU/edit#heading=h.o9i5dy8de481)           |  [Git Repo](https://github.com/ossf/wg-best-practices-os-developers) | [Slack](https://openssf.slack.com/archives/C01AHCRP8BT) | [Mailing List](https://lists.openssf.org/g/openssf-wg-best-practices) |
| Concise Guides - C/C++ Compiler Hardening Options | Occurs every 2nd Wednesday 6:00a PT/9:00a ET/1400 UTC | [Meeting Notes](https://docs.google.com/document/d/1x-fMIt6ZIV6SM-M29xEVKeB505GbDzSIVXg-8uF_FQU/edit#heading=h.o9i5dy8de481)           |  [Git Repo](https://github.com/ossf/wg-best-practices-os-developers/blob/main/docs/Compiler_Hardening_Guides/Compiler-Options-Hardening-Guide-for-C-and-C%2B%2B.md) | [Slack](https://openssf.slack.com/archives/C01AHCRP8BT) | [Mailing List](https://lists.openssf.org/g/openssf-wg-best-practices) | [Mailing List](https://lists.openssf.org/g/openssf-wg-best-practices) |
| Concise Guides - Source Code Management Best Practices | Occurs every 2nd Thursday 7:00a PT/10:00a ET/1400 UTC  | [Meeting Notes](https://docs.google.com/document/d/1x-fMIt6ZIV6SM-M29xEVKeB505GbDzSIVXg-8uF_FQU/edit#heading=h.o9i5dy8de481)           |  [Git Repo](https://github.com/ossf/wg-best-practices-os-developers/tree/main/docs/SCM-BestPractices) | [Slack](https://openssf.slack.com/archives/C01AHCRP8BT) | [Mailing List](https://lists.openssf.org/g/openssf-wg-best-practices) | [Mailing List](https://lists.openssf.org/g/openssf-wg-best-practices) |
|   EDU.SIG   | Occurs every 2nd Wednesday 6:00a PT/9:00a ET/1400 UTC   | [Meeting Notes](https://docs.google.com/document/d/18GBwvQJNcPnwxKrnp43DhBZC7K1JM0xzGkDoKh5mu8U/edit#heading=h.9m0zi4b0wnne)                       |  [Git Repo](https://github.com/ossf/education) | [Slack](https://openssf.slack.com/archives/C03FW3YGXH9) | [Mailing List](https://lists.openssf.org/g/openssf-sig-education) |
|   EDU.SIG - DEI Subcommittee  | Occurs every 2nd Tuesday 8:00a PT/11:00a ET/1600 UTC   | [Meeting Notes](https://docs.google.com/document/d/1LdQ07veOcJ596Vo3aQZCFy-HHeEO7cHnbE_6u_uq9Fk/edit#heading=h.9m0zi4b0wnne)                       |  [Git Repo](https://github.com/ossf/education) | [Slack](https://openssf.slack.com/archives/C04FMD5HSC9) | [Mailing List](https://lists.openssf.org/g/openssf-sig-education-dei) |
|  Memory Safety SIG   | Every 2nd Thursday 10:00a PT/1:00p ET/1500 UTC           | [Meeting Notes](https://docs.google.com/document/d/1Ehpp1UmAIqMs0ZdKr15sd5MS48OeaGKB9H40htVehs4/edit?usp=sharing)                       |  [Git Repo](https://github.com/ossf/Memory-Safety) | [Slack](https://openssf.slack.com/archives/C03G8NZH58R) | [Mailing List](https://lists.openssf.org/g/openssf-sig-memory-safety) |
|  Scorecard  | Occurs every 2nd Thursday 1:00p PT/4:00p ET/1800 UTC    | [Meeting Notes](https://docs.google.com/document/d/1dB2U7_qZpNW96vtuoG7ShmgKXzIg6R5XT5Tc-0yz6kE/edit%23&sa=D&source=calendar&usd=2&usg=AOvVaw0dlm9r67uXVvpla6TQtT28 )           |  [Git Repo](https://github.com/ossf/scorecard) | [Slack](https://openssf.slack.com/archives/C0235AR8N2C ) | [Mailing List]( ) |
|  Security Knowledge Framework -  SKF  | TBD   | [Meeting Notes]( )           |  [Git Repo]( ) | [Slack](https://openssf.slack.com/archives/C04B7EZLTM1) | [Mailing List]( ) |



[Zoom](https://zoom.us/j/96055397788?pwd=bzFxYjNrUTZvNDFLdjVCZHQyWDhNdz09) every other Tuesday at 16:00 GMT from Aug 11.

The meeting invite is available on the public [OSSF calendar](https://calendar.google.com/calendar?cid=czYzdm9lZmhwNWk5cGZsdGI1cTY3bmdwZXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ).











[Zoom](https://zoom.us/j/94941582286?pwd=SjdwZmY1eit6RlhiS1RsLzBZK3pVdz09) every other Wednesday, alternating between EMEA (13:00 UTC) and APAC-friendly times (22:00 UTC).

The meeting invite is available on the public [OSSF calendar](https://calendar.google.com/calendar?cid=czYzdm9lZmhwNWk5cGZsdGI1cTY3bmdwZXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ).

## Governance



The [CHARTER.md](CHARTER.md) outlines the scope and governance of our group activities.

- Lead - Jon Meadows
- Co-Lead -



The [CHARTER.md](CHARTER.md) outlines the scope and governance of our group activities.

- Lead - [Christopher "CRob" Robinson](https://github.com/SecurityCRob)
- Co-Lead - [Xavier René-Corail](https://github.com/xcorail)
- "*" denotes a project/SIG lead





This WG is chaired by Isaac Hepworth. Melba Lopez and Jay White are co-chairs.

Working Group operations are consistent with standard operating guidelines provided by the OSSF Technical Advisory Committee
[TAC](https://github.com/ossf/tac).

Full details of process and roles are linked from [governance README](/governance).





This group is chaired by Amir Montazery (OSTIF) and Jeff Mendoza (Kusari).

Full details of process and roles are linked from [governance README](/governance).



The [CHARTER](https://github.com/ossf/wg-identifying-security-threats/blob/main/CHARTER.md)
document outlines the scope and governance of our group activities.

* Lead: [Michael Scovetta](mailto:michael.scovetta@microsoft.com)



We use the [securing-software-repos-wg](https://github.com/orgs/ossf/teams/securing-software-repos-wg) GitHub team.

The [CHARTER.md](https://github.com/ossf/wg-securing-software-repos/blob/main/CHARTER.md) outlines the scope and governance of our group activities.

This group is chaired by [Dustin Ingram](https://github.com/di).

## Project Maintainers



TBD



- [Christopher "CRob" Robinson*, Intel](https://github.com/SecurityCRob)
- [Xavier René-Corail, GitHub](https://github.com/xcorail)
- [David A Wheeler, LF/OSSF](https://github.com/david-a-wheeler)
- [Dave Russo*, Red Hat](https://github.com/drusso-rh)







- [Christopher "CRob" Robinson, Intel](https://github.com/SecurityCRob)
- [Anne Bertucio, Google](https://github.com/annabellegoth2boss)







## Project Collaborators



TBD



- [Christine Abernathy*, F5](https://github.com/caabernathy)
- [Daniel Applequist*, Snyk](https://github.com/Torgo)
- Avishay Balter, Microsoft
- [Jeffrey Borek, IBM](https://github.com/jtborek)
- [VM Brasseur, WiPro](https://github.com/)
- [Glenn ten Cate*, OWASP/SKF](https://github.com/)
- [Judy Kelly, Red Hat](https://github.com/judyobrienie)
- [Georg Kunz, Ericsson](https://github.com/gkunz)
- [Arnaud J Le Hors, IBM](https://github.com/lehors)
- [Matt Rutkowski, IBM](https://github.com/mrutkows)
- [Marta Rybczynska, Syslinbit](https://github.com/mrybczyn)
- Yotam Perkal, Rezilion
- [Eric Tice, WiPro](https://github.com/)
- [Randall T. Vasquez*, Gentoo/Homebrew](https://github.com/ran-dall)
- [Jay White, Microsoft](https://github.com/camaleon2016)







- [Crystal Hazen, HackerOne](https://github.com/)
- [Jonathan Leitschuh, Dan Kaminsky Fellowship - HUMAN](https://github.com/)
- [Madison Oliver, GitHub Security Lab](https://github.com/)
- [VM Brasseur, WiPro](https://github.com/)
- Jennifer Mitchell, Tidelift
- [David A Wheeler, LF/OSSF](https://github.com/david-a-wheeler)
- [Randall T. Vasquez (SKF/Gentoo/Homebrew)](https://github.com/ran-dall)







## Active projects



















## Licenses





Unless otherwise specifically noted, software released by this working
group is released under the [Apache 2.0 license](LICENSES/Apache-2.0.txt),
and documentation is released under the
[CC-BY-4.0 license](LICENSES/CC-BY-4.0.txt).
Formal specifications would be licensed under the
[Community Specification License](https://github.com/CommunitySpecification/1.0)
(though at this time we don't have any examples of that).













## Charter





Like all OpenSSF working groups, this working group reports to the
[OpenSSF Technical Advisory Council (TAC)](https://github.com/ossf/tac).
For more organizational information, see the
[OpenSSF Charter](https://openssf.org/about/charter/).













## Antitrust Policy Notice



Linux Foundation meetings involve participation by industry competitors, and it is the intention of the Linux Foundation to conduct all of its activities in accordance with applicable antitrust and competition laws. It is therefore extremely important that attendees adhere to meeting agendas, and be aware of, and not participate in, any activities that are prohibited under applicable US state, federal or foreign antitrust and competition laws.

Examples of types of actions that are prohibited at Linux Foundation meetings and in connection with Linux Foundation activities are described in the Linux Foundation Antitrust Policy available at <http://www.linuxfoundation.org/antitrust-policy>. If you have questions about these matters, please contact your company counsel, or if you are a member of the Linux Foundation, feel free to contact Andrew Updegrove of the firm of Gesmer Updegrove LLP, which provides legal counsel to the Linux Foundation



Linux Foundation meetings involve participation by industry competitors, and it is the intention of the Linux Foundation to conduct all of its activities in accordance with applicable antitrust and competition laws. It is therefore extremely important that attendees adhere to meeting agendas, and be aware of, and not participate in, any activities that are prohibited under applicable US state, federal or foreign antitrust and competition laws.

Examples of types of actions that are prohibited at Linux Foundation meetings and in connection with Linux Foundation activities are described in the Linux Foundation Antitrust Policy available at <http://www.linuxfoundation.org/antitrust-policy>. If you have questions about these matters, please contact your company counsel, or if you are a member of the Linux Foundation, feel free to contact Andrew Updegrove of the firm of Gesmer Updegrove LLP, which provides legal counsel to the Linux Foundation