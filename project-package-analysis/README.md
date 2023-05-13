# How it works

## How it works

The project's components are:

- A [scheduler](./cmd/scheduler/) - creates jobs for the analysis worker from
  Package Feeds.
- Analysis (one-shot [analyze](./cmd/analyze/) and [worker](./cmd/worker/)) -
  collects package behavior data through static and dynamic analysis of each
  package.
- A [loader](./function/loader/) - pushes the analysis results into BigQuery.

The goal is for all of these components to work together and provide extensible,
community-run infrastructure to study behavior of open source packages and to
look for malicious software. We also hope that the components can be used
independently, to provide package feeds or runtime behavior data for anyone
interested.

The Package Analysis project currently consists of the following pipeline:

![image](docs/images/Pipeline%20diagram.png)

1. Package repositories are monitored for new packages.
1. Each new package is scheduled to be analyzed by a pool of workers.
1. A worker performs dynamic analysis of the package inside a sandbox.
1. Results are stored and imported into BigQuery for inspection.

Sandboxing via [gVisor](https://gvisor.dev/) containers ensures the packages are
isolated. Detonating a package inside the sandbox allows us to capture strace
and packet data that can indicate malicious interactions with the system as well
as network connections that can be used to leak sensitive data or allow remote
access.

This is under wg-securing-critical-projects


The designated lead(s):
- [Jeff Mendoza](https://github.com/jeffmendoza)
- [Amir Hossin Montazery](https://github.com/amirhmh3)

## Motivation

TBD

## Objective

TBD

## Vision

TBD

## Scope

TBD

## Current Work

TBD

## Quick Start

TBD

## Get Involved

TBD

## Meeting times

TBD

## Meeting Notes

TBD

## Licenses

TBD

## Charter

TBD

## Antitrust Policy

TBD