var request = require('request')
var token = require('./secrets.js')

var parsingFunction = function(responseBody) {
  var parsed = JSON.parse(responseBody)
  console.log(parsed)
}

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + token.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    cb(body);

  });
}

getRepoContributors("jquery", "jquery", parsingFunction)


