const fetch = require('node-fetch');

class CovidSource {
  static async generalData() {
    const response = await fetch('https://data.covid19.go.id/public/api/update.json');
    const responseJson = await response.json();
    return responseJson.update;
  }
}

module.exports = CovidSource;
