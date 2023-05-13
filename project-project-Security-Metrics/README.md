# Installing a Local Development Environment

## Installing a Local Development Environment

Setting up a basic development environment is straightforward:

1. Clone the repository (`git clone https://github.com/ossf/Project-Security-Metrics`).
1. Ensure that you have [Docker Compose](https://docs.docker.com/compose/) installed.
1. Copy `docker/web/.env.dev.web-example` to `docker/web/.env.dev.web` and modify the values
   in that file for your local environment.
1. Do the same thing for `docker/db/.env.dev.db-example` and `docker/worker/.env.dev.worker-example`.
1. Run `start.ps1`.
1. Open https://127.0.0.1:8000

The first configuration file has a template at `docker/db/.env.dev.db-example`, which should
be copied or renamed to `docker/db/.env.dev.db`. There is only one field in that file
that you need to change, the password for your local PostgreSQL database.

The second configuration file has a template at `docker/web/.env.dev.web-example`, which
similarly should be copied or renamed to `docker/web/.env.dev.web`. Open this file in your
favorite text editor and update the `SECRET_KEY`, `DJANGO_SUPERUSER_PASSWORD` and
`DB_PASSWORD` fields. Use the same value for `DB_PASSWORD` as you specified in the first
configuration file.

When you're done, you can try building and running the Docker application. From the root
of the repository, run:

`docker-compose -f docker/docker-compose.yml build`

This should take 5-10 minutes to complete (perhaps more, depending on bandwidth and the
images that Docker needs to pull).

Now you can run the application with:

`docker-compose -f docker/docker-compose.yml run`

**NOTE**: You might see some errors the first or second time you run this. I know about
them, but haven't had cycles to fix them yet. Press Ctrl-C to exit the application,
and then re-run `docker-compose -f docker/docker-compose.yml run`. In my testing,
"third time's the charm". I hope this to be fixed shortly.

This is under wg-identifying-security-threats


The designated lead(s):
- [Michael Scovetta](https://github.com/scovetta)

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