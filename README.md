# covidCasesAndVaccinationRatesInIndonesia

## Originally developed by Muhammad Juan Pradana


## How To Use

**GET**

General Info
- [http://host:port]

Yearly
- [http://host:port/yearly]
- [http://host:port/yearly/[year]]
- [http://host:port/yearly?since=[year]]
- [http://host:port/yearly?upto=[year]]
- [http://host:port/yearly?since=[year]&upto=[year]]
  
Monthly
- [ttp://host:port/monthly]
- [ttp://host:port/monthly/[year]]
- [ttp://host:port/monthly/[year]/[month]]
- [ttp://host:port/monthly?since=[year].[month]]
- [ttp://host:port/monthly?upto=[year].[month]]
- [ttp://host:port/monthly?since=[year].[month]&upto=[year].[month]]
  
Daily
- [ttp://host:port/daily]
- [ttp://host:port/daily/[year]]
- [ttp://host:port/daily/[year]/[month]]
- [ttp://host:port/daily/[year]/[month]/[date]]
- [ttp://host:port/daily?since=[year].[month].[date]]
- [ttp://host:port/daily?upto=[year].[month].[date]]
- [ttp://host:port/daily?since=[year].[month].[date]&upto=[year].[month].[date]]


## covidCasesInIndonesia
This is the backend that is used to get Information Indonesia Covid Case.

## requirement
- node js
- git (optional)

## Installation
- ```git clone https://github.com/juanpradana/covidCasesInIndonesia.git```
- ```cd covidCasesInIndonesia```
- ```npm install```
- ```npm run start```

## Project Resource
- Hapi (https://hapi.dev/)
