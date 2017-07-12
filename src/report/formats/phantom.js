// This is a phantomjs entrypoint. It's executed in the phantom runtime and
// *not in node*. This js file is not expected to be required by any node
// process or executed by node itself by any means. It contains instructions on
// how to generate a pdf report out of a static page. See
// [here](http://phantomjs.org/).
var fs = require('fs');
var page = require('webpage').create();
var system = require('system');

var workDir = system.args[1];
var header = fs.read(workDir + '/header.html');
var footer = fs.read(workDir + '/footer.html');

page.paperSize = {
  format: 'A4',
  margin: {
    top: '0.2cm',
    bottom: '0.2cm',
    left: '0.5cm',
    right: '0.5cm',
  },
  orientation: 'landscape',
  header: {
    height: '2.75cm',
    contents: phantom.callback(function(pageNumber, numPages) {
      return header.replace('#page', pageNumber).replace('#numPages', numPages);
    }),
  },
  footer: {
    height: '4.25cm',
    contents: phantom.callback(function(pageNumber, numPages) {
      return footer.replace('#page', pageNumber).replace('#numPages', numPages);
    }),
  },
};

page.onResourceRequested = function(requestData, networkRequest) {
  console.log('Request (#' + requestData.id + '): ' + JSON.stringify(requestData));
};

page.onResourceError = function(resourceError) {
  console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
  console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
};

page.onResourceReceived = function(response) {
  console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
};

page.open('file://' + workDir + '/body.html', function(status) {
  console.log('Page open status: ' + status);
  page.render(workDir + '/report.pdf');
  phantom.exit();
});
