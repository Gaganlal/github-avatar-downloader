var request = require('request')
var token = require('./secrets.js')
var fs = require('fs')

function downloadImageByURL(url, filePath) {
  // console.log(url, filePath);
  fs.existsSync("avatars") || fs.mkdirSync("avatars");
  request.get(url).pipe(fs.createWriteStream(filePath));
}

var parsingFunction = function(responseBody) {
  var parsed = JSON.parse(responseBody)
  //console.log(parsed)
parsed.forEach(function(user) {
  const url = user.avatar_url;
  const filePath = `avatars/${user.login}.jpg`
  downloadImageByURL(url, filePath)
})


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


