const { dataUsage } = require('./data-usage');

dataUsage().then(console.log).catch(console.error);

// module.exports = { dataUsage };
