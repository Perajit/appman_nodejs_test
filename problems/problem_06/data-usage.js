const { readFileSync } = require('fs');
const logFilePath = __dirname + '/data-usage.log';

const raw = readFileSync(logFilePath, 'utf8');

const extractData = (raw) => {
  let lines = raw.split(/\n/);
  return lines.map((line) => {
    let [ dateStr, userStr, dataStr ] = line.split(',');
    let [ , user ] = userStr.split('=');
    let [ , data ] = dataStr.split('=');

    return {
      date: dateStr,
      user,
      data
    }
  });
}

const groupData = (data) => {
  let groups = {};

  data.forEach((item) => {
    let { date, user, data } = item;
    groups[user] = groups[user] || {}; // user: { ...dataByDate }
    groups[user][date] = groups[user][date] || 0; // date: data
    groups[user][date] += +data;
  }, {});

  return groups;
}

const dataUsage = () => {
  let data = extractData(raw);
  let groups = groupData(data);
  let usage = [];

  for (let user in groups) {
    let dataByDate = groups[user];
    let totalDates = Object.keys(dataByDate).length;

    // Find total data used
    let totalData = 0;
    for (let date in dataByDate) {
      totalData += dataByDate[date];
    }

    usage.push({
      user,
      total: totalData,
      average: totalData / totalDates
    })
  }

  return usage;
};

module.exports = { dataUsage };
