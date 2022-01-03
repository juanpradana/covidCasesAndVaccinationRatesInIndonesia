# covidCasesAndVaccinationRatesInIndonesia

## Originally developed by Muhammad Juan Pradana


## How To Use

**GET**

General Info
- http://host:port

Yearly
- http://host:port/yearly
- http://host:port/yearly/<year>
- http://host:port/yearly?since=<year>
- http://host:port/yearly?upto=<year>
- http://host:port/yearly?since=<year>&upto=<year>
  
Monthly
- http://host:port/monthly
- http://host:port/monthly/<year>
- http://host:port/monthly/<year>/<month>
- http://host:port/monthly?since=<year>.<month>
- http://host:port/monthly?upto=<year>.<month>
- http://host:port/monthly?since=<year>.<month>&upto=<year>.<month>
  
Daily
- http://host:port/daily
- http://host:port/daily/<year>
- http://host:port/daily/<year>/<month>
- http://host:port/daily/<year>/<month>/<date>
- http://host:port/daily?since=<year>.<month>.<date>
- http://host:port/daily?upto=<year>.<month>.<date>
- http://host:port/daily?since=<year>.<month>.<date>&upto=<year>.<month>.<date>


## Backend-Early-Warning-System
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
