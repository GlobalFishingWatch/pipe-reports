# Reports pipeline

Simple worker process which consumes report requests queue, generates the
corresponding reports and mails them to the user.

## Tech stack

This is a [nodejs](https://nodejs.org/en/) application which connects to our
data infrastructure at [Google Cloud](http://cloud.google.com/) to generate
reports. The queries themselves are executed on our data tables in [Google
BigQuery](https://cloud.google.com/bigquery/). Report requests are received
through a [Google Pub/Sub](https://cloud.google.com/pubsub/) queue, and
rendered using [PhantomJS](http://phantomjs.org/).

Both the development and the production environments are containerized with
[Docker](https://www.docker.com).

## Development

### Prerequisites

We use a dockerized development environment, so you will need
[docker](https://www.docker.com/) and
[docker-compose](https://docs.docker.com/compose/install/) on your machine. No
other dependencies are required.

### Configuration

The `dev` folder is ignored in git, and is expected to contain private
configuration settings and files. At the bare minimum you'll need to:

* Create an environment file at `dev/env`, where you define environment
  variables available inside the docker container. Most configuration settings
already contain a default, sensible value, but some settings are private (api
keys and such), and so you need to set them up yourself. Start the application
and it will guide you through the different settings that you need to define.
This file is a [standard docker environment
file](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables-e-env-env-file).

* Create a service account to allow your development server access to the
  Google Cloud services, and download the json key file into `dev/key.json`.
See
[here](https://googlecloudplatform.github.io/gcloud-node/#/docs/v0.36.0/guides/authentication)
for more information on how to generate a json key file.

### Common tasks

This is a standard docker-compose project, so you can start all the necessary
connected containers using `docker-compose up`. This will build images as
needed and start a docker cluster with the report generation daemon running,
and the debugging port open on your local port 5858.

If you need to run any npm-specific commands, run them inside the cluster with
`docker-compose run dev [COMMAND]`.

We provide a couple of [npm scripts](https://docs.npmjs.com/misc/scripts) used
for linting, running unit tests and so on. Check the `package.json` file for
more information.

## License

Copyright 2017 Global Fishing Watch

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by
applicable law or agreed to in writing, software distributed under the License
is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
