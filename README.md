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

## Installation With Node JS
- ```git clone https://github.com/juanpradana/covidCasesInIndonesia.git```
- ```cd covidCasesInIndonesia```
- ```npm install```
- ```npm run start```

## Installation With Docker
This guideline will focusly aim to Windows based operating systems. Any command / step described below might be unsupported.

1. Install Docker
  - visit: [docker-install](https://docs.docker.com/desktop/windows/install/)
2. Clone this repo
  - run: git clone https://github.com/juanpradana/covidCasesInIndonesia.git
  - cd covidCasesInIndonesia
3. Build the image
  - run: docker build -t covid-case-indonesia-api .
4. Run the image
  - run: docker run -p 8000:8000 -d --name covid-case-indonesia-api covid-case-indonesia-api
5. Access the API server
  - open web browser / postman
  - send request defined on API CONTRACTS below to: localhost:8000

## Project Resource
- Hapi (https://hapi.dev/)

## API CONTRACTS
1. **Endpoint: '/'**
  - method: **GET**
  - params: *none*
  - query: *none*
  - response type: **application/json**
  - desc: Provide general information about covid19 case in Indonesia
  - example request: **curl --request GET *'host:port/'***
  - example response: ![Image](https://i.ibb.co/f1qcWQB/2022-01-03-14h26-26.png)

2. **Endpoint: '/yearly**
  - method: **GET**
  - params: *none*
  - query: *none*
  - response type: **application/json**
  - desc: Provide yearly Covid19 case in Indonesia from year value given in *since* query until *upto* query.
  - example request: **curl --request GET 'host:port/yearly?since=2020&upto=2023**
  - example response: ![Image](https://i.ibb.co/hBZTn3V/2022-01-03-14h30-26.png)
  
3. **Endpoint: '/yearly/:year**
  - method: **GET**
  - params: year
  - query: *none*
  - response type: **application/json**
  - desc: Provide yearly data of total covid cases of the year provided in <year>.
  - example request: **curl --request GET 'host:port/yearly/2020'**
  - example response: ![Image](https://i.ibb.co/x33rN4D/2022-01-03-14h33-17.png)

4. **Endpoint: '/yearly?since=:year&upto=:year**
  - method: **GET**
  - params: *none*
  - query: since, upto
  - response type: **application/json**
  - desc: Get yearly accumulative Covid19 case in Indonesia from value given in *since* and *upto* query
  - example request: **curl --request GET 'host:port/yearly?since=2021&upto=2022'**
  - example response: ![Image](https://i.ibb.co/vj6wv3s/2022-01-03-14h37-20.png)
  
5. **Endpoint: '/monthly'**
  - method: **GET**
  - params: *none*
  - query: *none*
  - response type: **application/json**
  - desc: Provide monthly data of total covid cases.
  - example request: **curl --request GET 'host:port/monthly'**
  - example response: ![Image](https://i.ibb.co/TY2XjSj/2022-01-03-14h41-03.png)

6. **Endpoint: '/monthly/:year'**
  - method: **GET**
  - params: year
  - query: *none*
  - response type: **application/json**
  - desc: Provide monthly data of total covid cases in the year provided in <year>.
  - example request: **curl --request GET 'host:port/monthly/2022'**
  - example response: ![Image](https://i.ibb.co/gzzZ6fw/2022-01-03-14h44-06.png)
  
7. **Endpoint: '/monthly/:year/:month'**
  - method: **GET**
  - params: year, month
  - query: *none*
  - response type: **application/json**
  - desc: Provide monthly data of total covid cases in the year provided in year and month.
  - example request: **curl --request GET 'host:port/monthly/2021/03'**
  - example response: ![Image](https://i.ibb.co/bLwWMJ1/2022-01-03-14h45-40.png)
  
8. **Endpoint: '/monthly?since=:year.month&upto=:year.month'**
  - method: **GET**
  - params: *none*
  - query: since, upto
  - response type: **application/json**
  - desc: Get monthly accumulative Covid19 case in Indonesia from value given in *since* and *upto* query
  - example request: **curl --request GET 'host:port/monthly?since=2020.09&upto=2021.12'**
  - example response: ![Image](https://i.ibb.co/bHS30Z4/2022-01-03-14h48-35.png)
  
9. **Endpoint: '/daily'**
  - method: **GET**
  - params: *none*
  - query: *none*
  - response type: **application/json**
  - desc: Provide daily data of total covid cases.
  - example request: **curl --request GET 'host:port/daily'**
  - example response: ![Image](https://i.ibb.co/bRc86mT/2022-01-03-14h50-11.png)

10. **Endpoint: '/daily/:year'**
  - method: **GET**
  - params: year
  - query: *none*
  - response type: **application/json**
  - desc: Provide daily data of total covid cases in the year provided in <year>.
  - example request: **curl --request GET 'host:port/daily/2021'**
  - example response: ![Image](https://i.ibb.co/SPtjMGF/2022-01-03-14h51-14.png)
  
11. **Endpoint: '/daily/:year/:month'**
  - method: **GET**
  - params: year, month
  - query: *none*
  - response type: **application/json**
  - desc: Provide daily data of total covid cases in the year provided in year and month.
  - example request: **curl --request GET 'host:port/daily/2021/11'**
  - example response: ![Image](https://i.ibb.co/yhZJ1HY/2022-01-03-14h52-16.png)
  
12. **Endpoint: '/daily/:year/:month/:date'**
  - method: **GET**
  - params: year, month, date
  - query: *none*
  - response type: **application/json**
  - desc: Provide daily data of total covid cases in the year provided in year, month, and date.
  - example request: **curl --request GET 'host:port/daily/2021/11/21'**
  - example response: ![Image](https://i.ibb.co/wWhDXy9/2022-01-03-14h53-44.png)
  
13. **Endpoint: '/daily?since=:year.month.date&upto=:year.month.date'**
  - method: **GET**
  - params: *none*
  - query: since, upto
  - response type: **application/json**
  - desc: Get daily accumulative Covid19 case in Indonesia from value given in *since* and *upto* query
  - example request: **curl --request GET 'host:port/daily??since=2021.11.30&upto=2021.12.31'**
  - example response: ![Image](https://i.ibb.co/d7JrfrM/2022-01-03-14h55-12.png)

## Test Postman
https://www.getpostman.com/collections/e358aef96231a2047bb3
