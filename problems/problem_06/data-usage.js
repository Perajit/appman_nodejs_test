const { readFileSync } = require('fs');
const logFilePath = __dirname + '/data-usage.log';

const raw = readFileSync(logFilePath, 'utf8');

const extractData = () => {
  let lines = raw.split(/\n/);
  return lines.map((line) => {
    let [ dateStr, userStr, dataStr ] = line.split(',');
    let [ , user ] = userStr.split('=');
    let [ , data ] = dataStr.split('=');

    return {
      date: dataStr,
      user,
      data
    }
  });
}

const groupData = (data) => {
  let groups = data.reduce((groups, item) => {
    let { user } = item;
    groups[user] = groups[user] || []
    groups[user].push(item);
  }, {})
}

const dataUsage = () => {
  let data = extractData();
  let groups = groupData(data);
  let usage = [];

  for (let user in groups) {
    // TODO
    let group = groups[user];
  }

  return usage;
};

module.exports = { dataUsage };
