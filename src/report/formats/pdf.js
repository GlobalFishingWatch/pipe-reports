const dot = require('dot');
const temp = require('temp');
const fs = require('fs-extra');
const moment = require('moment');
const path = require('path');
const childProcess = require('child_process');
const util = require('util');
const countries = require('../../data/countries');
const log = require('winston');

const filePaths = {
  templates: () => path.resolve(__dirname, '../../templates'),
  template: (file) => path.resolve(__dirname, '../../templates/', file),
  images: () => path.resolve(__dirname, '../../templates/images'),
  image: (file) => path.resolve(__dirname, '../../templates/images/', file),
  script: (file) => path.resolve(__dirname, file),
};

const precompileTemplate = filename => dot.template(
  fs.readFileSync(filePaths.template(filename), 'utf8'),
  Object.assign({}, dot.templateSettings, {strip: false})
);

const templates = {
  body: precompileTemplate('body.dot'),
  header: precompileTemplate('header.dot'),
  footer: precompileTemplate('footer.dot'),
};

const createTempDirectory = util.promisify(temp.mkdir);
const readFile = util.promisify(fs.readFile);

const buildTemplateContext = (data, request) => {
  return {
    data: data.map((item) => {
      const code = countries.lookupByMMSI(item.mmsi);
      if (code) {
        return Object.assign(item, {flagState: countries.lookupByCode(code)});
      } else {
        return Object.assign(item, {flagState: {name: '', code: ''}});
      }
    }),
    report: request,
    paths: {
      image: filePaths.image,
    },
    format: {
      datetime: (value) => moment(value).format('dddd, MMMM Do YYYY, h:mm:ss a'),
      datetimeScientific: (value) => moment(value).format('YYYY-MM-DD HH:mm:ss'),
    },
  };
};

const launchPhantomJS = (workspace) => {
  return new Promise((resolve, reject) => {
    const command = [
      'phantomjs',
      '--load-images=true',
      '--local-to-remote-url-access=true',
      filePaths.script('phantom.js'),
      workspace,
    ];
    const options = {
      timeout: 5 * 60 * 1000,
    };

    log.debug("Invoking command %s", command)
    const phantom = childProcess.exec(command.join(' '), options);
    phantom.stdout.on('data', (data) => log.debug(`PHANTOMJS: ${data}`));
    phantom.stderr.on('data', (data) => log.error(`PHANTOMJS: ${data}`));
    phantom.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`PhantomJS terminated with status code ${code}`));
      }
    });
  });
};

module.exports = async (data, request) => {
  log.debug("Rendering %d elements to pdf", data.length);

  log.debug("Generating template context");
  const context = buildTemplateContext(data, request);
  log.debug("Template context ready");

  log.debug("Generating workspace directory");
  const workspace = await createTempDirectory('report');
  log.debug("Workspace directory created at %s", workspace);

  log.debug("Writing templates")
  await fs.writeFile(`${workspace}/body.html`, templates.body(context));
  await fs.writeFile(`${workspace}/header.html`, templates.header(context));
  await fs.writeFile(`${workspace}/footer.html`, templates.footer(context));
  log.debug("Templates written to workspace %s", workspace);

  log.debug("Calling phantomjs");
  await launchPhantomJS(workspace);
  log.debug("PhantomJS terminated successfully");

  const pdfFile = `${workspace}/report.pdf`;
  log.debug("Reading PDF file %s into memory", pdfFile);
  const pdfData = await readFile(pdfFile);
  log.debug("Pdf file %s loaded to memory", pdfFile);

  // log.debug("Cleaning up the workspace directory %s", workspace);
  // await fs.remove(workspace);

  return {
    contents: pdfData,
    kind: 'pdf',
  };
};

