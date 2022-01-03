const {
  getGeneralInformation,
  getYearlyInformation,
  getMonthlyInformation,
  getMonthlyInformationWithRange,
  getDailyInformation,
  getDailyInformationWithRange,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: getGeneralInformation,
  },
  {
    method: 'GET',
    path: '/yearly/{year?}',
    handler: getYearlyInformation,
  },
  {
    method: 'GET',
    path: '/monthly/{year}/{month?}',
    handler: getMonthlyInformation,
  },
  {
    method: 'GET',
    path: '/monthly',
    handler: getMonthlyInformationWithRange,
  },
  {
    method: 'GET',
    path: '/daily/{year}/{month}/{date?}',
    handler: getDailyInformation,
  },
  {
    method: 'GET',
    path: '/daily/{year?}',
    handler: getDailyInformationWithRange,
  },
];

module.exports = routes;
