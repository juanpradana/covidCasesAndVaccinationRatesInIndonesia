const {
  getGeneralInformation,
  getYearlyInformation,
  getMonthlyInformation,
  getMonthlyInformationWithRange,
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
];

module.exports = routes;
