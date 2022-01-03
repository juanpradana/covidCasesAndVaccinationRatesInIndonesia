/* eslint-disable no-empty */
const CovidSource = require('./data/dataSource');

const reducer = (accumulator, curr) => accumulator + curr;
const appendZero = (number) => {
  if (number <= 9) {
    return `0${number}`;
  }
  if (number > 9) {
    return number;
  }
};

const getGeneralInformation = async (request, h) => {
  try {
    const data = await CovidSource.generalData();
    const { total, penambahan } = data;
    const response = h.response({
      ok: 'true',
      data: {
        total_positive: total.jumlah_positif,
        total_recovered: total.jumlah_sembuh,
        total_deaths: total.jumlah_meninggal,
        total_active: total.jumlah_dirawat,
        new_positive: penambahan.jumlah_positif,
        new_recovered: penambahan.jumlah_positif,
        new_deaths: penambahan.jumlah_meninggal,
        new_active: penambahan.jumlah_dirawat,
      },
      message: 'succes get data covid',
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      status: `${error}`,
      message: 'Data gagal ditemukan',
    });
    response.code(500);
    return response;
  }
};

const getYearlyInformation = async (request, h) => {
  try {
    const data = await CovidSource.generalData();
    const { harian } = data;
    const { year } = request.params;
    const { since, upto } = request.query;
    const dataFinal = [];
    if (year) {
      const dataPositif = [];
      const dataSembuh = [];
      const dataMeninggal = [];
      const dataAktif = [];
      harian.map((item) => {
        if (item.key_as_string.split('T')[0].split('-')[0] == year) {
          dataPositif.push(item.jumlah_positif.value);
          dataSembuh.push(item.jumlah_sembuh.value);
          dataMeninggal.push(item.jumlah_meninggal.value);
          dataAktif.push(item.jumlah_dirawat.value);
        }
      });
      const dataTahunan = {
        year: `${year}`,
        positive: dataPositif.reduce(reducer),
        recovered: dataSembuh.reduce(reducer),
        deaths: dataMeninggal.reduce(reducer),
        active: dataAktif.reduce(reducer),
      };
      const response = h.response({
        ok: 'true',
        data: dataTahunan,
        message: 'succes get data covid',
      });
      response.code(200);
      return response;
    }
    if (since || upto) {
      if (since && !upto) {
        const uptoYear = harian[harian.length - 1].key_as_string.split('T')[0].split('-')[0];
        if (since < uptoYear) {
          for (let i = since; i <= uptoYear; i++) {
            const dataPositif = [];
            const dataSembuh = [];
            const dataMeninggal = [];
            const dataAktif = [];
            harian.map((item) => {
              if (item.key_as_string.split('T')[0].split('-')[0] == i) {
                dataPositif.push(item.jumlah_positif.value);
                dataSembuh.push(item.jumlah_sembuh.value);
                dataMeninggal.push(item.jumlah_meninggal.value);
                dataAktif.push(item.jumlah_dirawat.value);
              }
            });
            const dataTahunan = {
              year: `${i}`,
              positive: dataPositif.reduce(reducer),
              recovered: dataSembuh.reduce(reducer),
              deaths: dataMeninggal.reduce(reducer),
              active: dataAktif.reduce(reducer),
            };
            dataFinal.push(dataTahunan);
          }
        }
      } else if (!since && upto) {
        const sinceYear = harian[0].key_as_string.split('T')[0].split('-')[0];
        if (sinceYear < upto) {
          for (let i = sinceYear; i <= upto; i++) {
            const dataPositif = [];
            const dataSembuh = [];
            const dataMeninggal = [];
            const dataAktif = [];
            harian.map((item) => {
              if (item.key_as_string.split('T')[0].split('-')[0] == i) {
                dataPositif.push(item.jumlah_positif.value);
                dataSembuh.push(item.jumlah_sembuh.value);
                dataMeninggal.push(item.jumlah_meninggal.value);
                dataAktif.push(item.jumlah_dirawat.value);
              }
            });
            const dataTahunan = {
              year: `${i}`,
              positive: `${dataPositif.reduce(reducer)}`,
              recovered: `${dataSembuh.reduce(reducer)}`,
              deaths: `${dataMeninggal.reduce(reducer)}`,
              active: `${dataAktif.reduce(reducer)}`,
            };
            dataFinal.push(dataTahunan);
          }
        }
      } else if (since < upto) {
        for (let i = since; i <= upto; i++) {
          const dataPositif = [];
          const dataSembuh = [];
          const dataMeninggal = [];
          const dataAktif = [];
          harian.map((item) => {
            if (item.key_as_string.split('T')[0].split('-')[0] == i) {
              dataPositif.push(item.jumlah_positif.value);
              dataSembuh.push(item.jumlah_sembuh.value);
              dataMeninggal.push(item.jumlah_meninggal.value);
              dataAktif.push(item.jumlah_dirawat.value);
            }
          });
          const dataTahunan = {
            year: `${i}`,
            positive: dataPositif.reduce(reducer),
            recovered: dataSembuh.reduce(reducer),
            deaths: dataMeninggal.reduce(reducer),
            active: dataAktif.reduce(reducer),
          };
          dataFinal.push(dataTahunan);
        }
      }
    } else {
      const sinceYear = harian[0].key_as_string.split('T')[0].split('-')[0];
      const uptoYear = harian[harian.length - 1].key_as_string.split('T')[0].split('-')[0];
      if (sinceYear < uptoYear) {
        for (let i = sinceYear; i <= uptoYear; i++) {
          const dataPositif = [];
          const dataSembuh = [];
          const dataMeninggal = [];
          const dataAktif = [];
          harian.map((item) => {
            if (item.key_as_string.split('T')[0].split('-')[0] == i) {
              dataPositif.push(item.jumlah_positif.value);
              dataSembuh.push(item.jumlah_sembuh.value);
              dataMeninggal.push(item.jumlah_meninggal.value);
              dataAktif.push(item.jumlah_dirawat.value);
            }
          });
          const dataTahunan = {
            year: `${i}`,
            positive: dataPositif.reduce(reducer),
            recovered: dataSembuh.reduce(reducer),
            deaths: dataMeninggal.reduce(reducer),
            active: dataAktif.reduce(reducer),
          };
          dataFinal.push(dataTahunan);
        }
      }
    }
    const response = h.response({
      ok: 'true',
      data: dataFinal,
      message: 'succes get data covid',
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      ok: 'false',
      message: 'not found',
      errors: error,
    });
    response.code(404);
    return response;
  }
};

const getMonthlyInformation = async (request, h) => {
  try {
    const data = await CovidSource.generalData();
    const { harian } = data;
    const { year, month } = request.params;
    const dataFinal = [];
    if (month) {
      const dataPositif = [];
      const dataSembuh = [];
      const dataMeninggal = [];
      const dataAktif = [];
      harian.map((item) => {
        if (`${item.key_as_string.split('T')[0].split('-')[0]}.${item.key_as_string.split('T')[0].split('-')[1]}` == `${year}.${month}`) {
          dataPositif.push(item.jumlah_positif.value);
          dataSembuh.push(item.jumlah_sembuh.value);
          dataMeninggal.push(item.jumlah_meninggal.value);
          dataAktif.push(item.jumlah_dirawat.value);
        }
      });
      const dataBulanan = {
        moth: `${year}-${month}`,
        positive: dataPositif.reduce(reducer),
        recovered: dataSembuh.reduce(reducer),
        deaths: dataMeninggal.reduce(reducer),
        active: dataAktif.reduce(reducer),
      };
      const response = h.response({
        ok: 'true',
        data: dataBulanan,
        message: 'succes get data covid',
      });
      response.code(200);
      return response;
    }
    if (!month) {
      for (let i = 1; i <= 12; i++) {
        try {
          const dataPositif = [];
          const dataSembuh = [];
          const dataMeninggal = [];
          const dataAktif = [];
          harian.map((item) => {
            if (`${item.key_as_string.split('T')[0].split('-')[0]}.${item.key_as_string.split('T')[0].split('-')[1]}` == `${year}.${appendZero(i)}`) {
              dataPositif.push(item.jumlah_positif.value);
              dataSembuh.push(item.jumlah_sembuh.value);
              dataMeninggal.push(item.jumlah_meninggal.value);
              dataAktif.push(item.jumlah_dirawat.value);
            }
          });
          const dataBulanan = {
            moth: `${year}-${appendZero(i)}`,
            positive: dataPositif.reduce(reducer),
            recovered: dataSembuh.reduce(reducer),
            deaths: dataMeninggal.reduce(reducer),
            active: dataAktif.reduce(reducer),
          };
          dataFinal.push(dataBulanan);
        } catch (error) {}
      }
    }
    const response = h.response({
      ok: 'true',
      data: dataFinal,
      message: 'succes get data covid',
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      ok: 'false',
      message: 'not found',
      errors: error,
    });
    response.code(404);
    return response;
  }
};

const getMonthlyInformationWithRange = async (request, h) => {
  try {
    const data = await CovidSource.generalData();
    const { harian } = data;
    const { since, upto } = request.query;
    const dataFinal = [];
    if (since || upto) {
      if (since && !upto) {
        const uptoYearMonth = `${harian[harian.length - 1].key_as_string.split('T')[0].split('-')[0]}.${harian[harian.length - 1].key_as_string.split('T')[0].split('-')[1]}`;
        if (since.split('.')[0] + since.split('.')[1] < uptoYearMonth.split('.')[0] + uptoYearMonth.split('.')[1]) {
          for (let i = since.split('.')[0]; i <= uptoYearMonth.split('.')[0]; i++) {
            if (i == uptoYearMonth.split('.')[0]) {
              for (let j = 1; j <= uptoYearMonth.split('.')[1]; j++) {
                try {
                  const dataPositif = [];
                  const dataSembuh = [];
                  const dataMeninggal = [];
                  const dataAktif = [];
                  harian.map((item) => {
                    if (`${item.key_as_string.split('T')[0].split('-')[0]}.${item.key_as_string.split('T')[0].split('-')[1]}` == `${i}.${appendZero(j)}`) {
                      dataPositif.push(item.jumlah_positif.value);
                      dataSembuh.push(item.jumlah_sembuh.value);
                      dataMeninggal.push(item.jumlah_meninggal.value);
                      dataAktif.push(item.jumlah_dirawat.value);
                    }
                  });
                  const dataBulanan = {
                    moth: `${i}.${appendZero(j)}`,
                    positive: dataPositif.reduce(reducer),
                    recovered: dataSembuh.reduce(reducer),
                    deaths: dataMeninggal.reduce(reducer),
                    active: dataAktif.reduce(reducer),
                  };
                  dataFinal.push(dataBulanan);
                } catch (error) {}
              }
            } else if (i < uptoYearMonth.split('.')[0] && i > since.split('.')[0]) {
              for (let j = 1; j <= 12; j++) {
                try {
                  const dataPositif = [];
                  const dataSembuh = [];
                  const dataMeninggal = [];
                  const dataAktif = [];
                  harian.map((item) => {
                    if (`${item.key_as_string.split('T')[0].split('-')[0]}.${item.key_as_string.split('T')[0].split('-')[1]}` == `${i}.${appendZero(j)}`) {
                      dataPositif.push(item.jumlah_positif.value);
                      dataSembuh.push(item.jumlah_sembuh.value);
                      dataMeninggal.push(item.jumlah_meninggal.value);
                      dataAktif.push(item.jumlah_dirawat.value);
                    }
                  });
                  const dataBulanan = {
                    moth: `${i}.${appendZero(j)}`,
                    positive: dataPositif.reduce(reducer),
                    recovered: dataSembuh.reduce(reducer),
                    deaths: dataMeninggal.reduce(reducer),
                    active: dataAktif.reduce(reducer),
                  };
                  dataFinal.push(dataBulanan);
                } catch (error) {}
              }
            } else if (i < uptoYearMonth.split('.')[0]) {
              for (let j = parseInt(since.split('.')[1], 10); j <= 12; j++) {
                try {
                  const dataPositif = [];
                  const dataSembuh = [];
                  const dataMeninggal = [];
                  const dataAktif = [];
                  harian.map((item) => {
                    if (`${item.key_as_string.split('T')[0].split('-')[0]}.${item.key_as_string.split('T')[0].split('-')[1]}` == `${i}.${appendZero(j)}`) {
                      dataPositif.push(item.jumlah_positif.value);
                      dataSembuh.push(item.jumlah_sembuh.value);
                      dataMeninggal.push(item.jumlah_meninggal.value);
                      dataAktif.push(item.jumlah_dirawat.value);
                    }
                  });
                  const dataBulanan = {
                    moth: `${i}.${appendZero(j)}`,
                    positive: dataPositif.reduce(reducer),
                    recovered: dataSembuh.reduce(reducer),
                    deaths: dataMeninggal.reduce(reducer),
                    active: dataAktif.reduce(reducer),
                  };
                  dataFinal.push(dataBulanan);
                } catch (error) {}
              }
            }
          }
        }
      } else if (!since && upto) {
        const sinceYearMonth = `${harian[0].key_as_string.split('T')[0].split('-')[0]}.${harian[0].key_as_string.split('T')[0].split('-')[1]}`;
        if (sinceYearMonth.split('.')[0] + sinceYearMonth.split('.')[1] < upto.split('.')[0] + upto.split('.')[1]) {
          for (let i = sinceYearMonth.split('.')[0]; i <= upto.split('.')[0]; i++) {
            if (i == upto.split('.')[0]) {
              for (let j = 1; j <= upto.split('.')[1]; j++) {
                try {
                  const dataPositif = [];
                  const dataSembuh = [];
                  const dataMeninggal = [];
                  const dataAktif = [];
                  harian.map((item) => {
                    if (`${item.key_as_string.split('T')[0].split('-')[0]}.${item.key_as_string.split('T')[0].split('-')[1]}` == `${i}.${appendZero(j)}`) {
                      dataPositif.push(item.jumlah_positif.value);
                      dataSembuh.push(item.jumlah_sembuh.value);
                      dataMeninggal.push(item.jumlah_meninggal.value);
                      dataAktif.push(item.jumlah_dirawat.value);
                    }
                  });
                  const dataBulanan = {
                    moth: `${i}.${appendZero(j)}`,
                    positive: dataPositif.reduce(reducer),
                    recovered: dataSembuh.reduce(reducer),
                    deaths: dataMeninggal.reduce(reducer),
                    active: dataAktif.reduce(reducer),
                  };
                  dataFinal.push(dataBulanan);
                } catch (error) {}
              }
            } else if (i < upto.split('.')[0] && i > sinceYearMonth.split('.')[0]) {
              for (let j = 1; j <= 12; j++) {
                try {
                  const dataPositif = [];
                  const dataSembuh = [];
                  const dataMeninggal = [];
                  const dataAktif = [];
                  harian.map((item) => {
                    if (`${item.key_as_string.split('T')[0].split('-')[0]}.${item.key_as_string.split('T')[0].split('-')[1]}` == `${i}.${appendZero(j)}`) {
                      dataPositif.push(item.jumlah_positif.value);
                      dataSembuh.push(item.jumlah_sembuh.value);
                      dataMeninggal.push(item.jumlah_meninggal.value);
                      dataAktif.push(item.jumlah_dirawat.value);
                    }
                  });
                  const dataBulanan = {
                    moth: `${i}.${appendZero(j)}`,
                    positive: dataPositif.reduce(reducer),
                    recovered: dataSembuh.reduce(reducer),
                    deaths: dataMeninggal.reduce(reducer),
                    active: dataAktif.reduce(reducer),
                  };
                  dataFinal.push(dataBulanan);
                } catch (error) {}
              }
            } else if (i < upto.split('.')[0]) {
              for (let j = parseInt(sinceYearMonth.split('.')[1], 10); j <= 12; j++) {
                try {
                  const dataPositif = [];
                  const dataSembuh = [];
                  const dataMeninggal = [];
                  const dataAktif = [];
                  harian.map((item) => {
                    if (`${item.key_as_string.split('T')[0].split('-')[0]}.${item.key_as_string.split('T')[0].split('-')[1]}` == `${i}.${appendZero(j)}`) {
                      dataPositif.push(item.jumlah_positif.value);
                      dataSembuh.push(item.jumlah_sembuh.value);
                      dataMeninggal.push(item.jumlah_meninggal.value);
                      dataAktif.push(item.jumlah_dirawat.value);
                    }
                  });
                  const dataBulanan = {
                    moth: `${i}.${appendZero(j)}`,
                    positive: dataPositif.reduce(reducer),
                    recovered: dataSembuh.reduce(reducer),
                    deaths: dataMeninggal.reduce(reducer),
                    active: dataAktif.reduce(reducer),
                  };
                  dataFinal.push(dataBulanan);
                } catch (error) {}
              }
            }
          }
        }
      } else if (since.split('.')[0] + since.split('.')[1] < upto.split('.')[0] + upto.split('.')[1]) {
        for (let i = since.split('.')[0]; i <= upto.split('.')[0]; i++) {
          if (i == upto.split('.')[0] && since.split('.')[0] == upto.split('.')[0]) {
            for (let j = parseInt(since.split('.')[1], 10); j <= parseInt(upto.split('.')[1], 10); j++) {
              try {
                const dataPositif = [];
                const dataSembuh = [];
                const dataMeninggal = [];
                const dataAktif = [];
                harian.map((item) => {
                  if (`${item.key_as_string.split('T')[0].split('-')[0]}.${item.key_as_string.split('T')[0].split('-')[1]}` == `${i}.${appendZero(j)}`) {
                    dataPositif.push(item.jumlah_positif.value);
                    dataSembuh.push(item.jumlah_sembuh.value);
                    dataMeninggal.push(item.jumlah_meninggal.value);
                    dataAktif.push(item.jumlah_dirawat.value);
                  }
                });
                const dataBulanan = {
                  moth: `${i}.${appendZero(j)}`,
                  positive: dataPositif.reduce(reducer),
                  recovered: dataSembuh.reduce(reducer),
                  deaths: dataMeninggal.reduce(reducer),
                  active: dataAktif.reduce(reducer),
                };
                dataFinal.push(dataBulanan);
              } catch (error) {}
            }
          } else if (i == upto.split('.')[0] && since.split('.')[0] < upto.split('.')[0]) {
            for (let j = 1; j <= parseInt(upto.split('.')[1], 10); j++) {
              try {
                const dataPositif = [];
                const dataSembuh = [];
                const dataMeninggal = [];
                const dataAktif = [];
                harian.map((item) => {
                  if (`${item.key_as_string.split('T')[0].split('-')[0]}.${item.key_as_string.split('T')[0].split('-')[1]}` == `${i}.${appendZero(j)}`) {
                    dataPositif.push(item.jumlah_positif.value);
                    dataSembuh.push(item.jumlah_sembuh.value);
                    dataMeninggal.push(item.jumlah_meninggal.value);
                    dataAktif.push(item.jumlah_dirawat.value);
                  }
                });
                const dataBulanan = {
                  moth: `${i}.${appendZero(j)}`,
                  positive: dataPositif.reduce(reducer),
                  recovered: dataSembuh.reduce(reducer),
                  deaths: dataMeninggal.reduce(reducer),
                  active: dataAktif.reduce(reducer),
                };
                dataFinal.push(dataBulanan);
              } catch (error) {}
            }
          } else if (i < upto.split('.')[0] && i > since.split('.')[0]) {
            for (let j = 1; j <= 12; j++) {
              try {
                const dataPositif = [];
                const dataSembuh = [];
                const dataMeninggal = [];
                const dataAktif = [];
                harian.map((item) => {
                  if (`${item.key_as_string.split('T')[0].split('-')[0]}.${item.key_as_string.split('T')[0].split('-')[1]}` == `${i}.${appendZero(j)}`) {
                    dataPositif.push(item.jumlah_positif.value);
                    dataSembuh.push(item.jumlah_sembuh.value);
                    dataMeninggal.push(item.jumlah_meninggal.value);
                    dataAktif.push(item.jumlah_dirawat.value);
                  }
                });
                const dataBulanan = {
                  moth: `${i}.${appendZero(j)}`,
                  positive: dataPositif.reduce(reducer),
                  recovered: dataSembuh.reduce(reducer),
                  deaths: dataMeninggal.reduce(reducer),
                  active: dataAktif.reduce(reducer),
                };
                dataFinal.push(dataBulanan);
              } catch (error) {}
            }
          } else if (i < upto.split('.')[0]) {
            for (let j = parseInt(since.split('.')[1], 10); j <= 12; j++) {
              try {
                const dataPositif = [];
                const dataSembuh = [];
                const dataMeninggal = [];
                const dataAktif = [];
                harian.map((item) => {
                  if (`${item.key_as_string.split('T')[0].split('-')[0]}.${item.key_as_string.split('T')[0].split('-')[1]}` == `${i}.${appendZero(j)}`) {
                    dataPositif.push(item.jumlah_positif.value);
                    dataSembuh.push(item.jumlah_sembuh.value);
                    dataMeninggal.push(item.jumlah_meninggal.value);
                    dataAktif.push(item.jumlah_dirawat.value);
                  }
                });
                const dataBulanan = {
                  moth: `${i}.${appendZero(j)}`,
                  positive: dataPositif.reduce(reducer),
                  recovered: dataSembuh.reduce(reducer),
                  deaths: dataMeninggal.reduce(reducer),
                  active: dataAktif.reduce(reducer),
                };
                dataFinal.push(dataBulanan);
              } catch (error) {}
            }
          }
        }
      }
    } else {
      for (let i = harian[0].key_as_string.split('T')[0].split('-')[0]; i <= harian[harian.length - 1].key_as_string.split('T')[0].split('-')[0]; i++) {
        for (let j = 1; j <= 12; j++) {
          try {
            const dataPositif = [];
            const dataSembuh = [];
            const dataMeninggal = [];
            const dataAktif = [];
            harian.map((item) => {
              if (`${item.key_as_string.split('T')[0].split('-')[0]}.${item.key_as_string.split('T')[0].split('-')[1]}` == `${i}.${appendZero(j)}`) {
                dataPositif.push(item.jumlah_positif.value);
                dataSembuh.push(item.jumlah_sembuh.value);
                dataMeninggal.push(item.jumlah_meninggal.value);
                dataAktif.push(item.jumlah_dirawat.value);
              }
            });
            const dataBulanan = {
              moth: `${i}.${appendZero(j)}`,
              positive: dataPositif.reduce(reducer),
              recovered: dataSembuh.reduce(reducer),
              deaths: dataMeninggal.reduce(reducer),
              active: dataAktif.reduce(reducer),
            };
            dataFinal.push(dataBulanan);
          } catch (error) {}
        }
      }
    }
    const response = h.response({
      ok: 'true',
      data: dataFinal,
      message: 'succes get data covid',
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      ok: 'false',
      message: 'not found',
      errors: error,
    });
    response.code(404);
    return response;
  }
};

const getDailyInformation = async (request, h) => {
  try {
    const data = await CovidSource.generalData();
    const { harian } = data;
    const { year, month, date } = request.params;
    const dataFinal = [];
    if (date) {
      const dateDate = new Date(`${year}-${month}-${date}T00:00:00.000Z`);
      const dataPositif = [];
      const dataSembuh = [];
      const dataMeninggal = [];
      const dataAktif = [];
      harian.map((item) => {
        if ((new Date(item.key_as_string)).toString() == dateDate.toString()) {
          dataPositif.push(item.jumlah_positif.value);
          dataSembuh.push(item.jumlah_sembuh.value);
          dataMeninggal.push(item.jumlah_meninggal.value);
          dataAktif.push(item.jumlah_dirawat.value);
        }
      });
      const dataBulanan = {
        date: `${dateDate.getFullYear()}-${appendZero(dateDate.getMonth() + 1)}-${appendZero(dateDate.getDate())}`,
        positive: dataPositif.reduce(reducer),
        recovered: dataSembuh.reduce(reducer),
        deaths: dataMeninggal.reduce(reducer),
        active: dataAktif.reduce(reducer),
      };
      const response = h.response({
        ok: 'true',
        data: dataBulanan,
        message: 'succes get data covid',
      });
      response.code(200);
      return response;
    }
    if (!date) {
      const sinceDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
      const uptoDate = new Date(`${year}-${month}-31T00:00:00.000Z`);
      while (sinceDate <= uptoDate) {
        const dataPositif = [];
        const dataSembuh = [];
        const dataMeninggal = [];
        const dataAktif = [];
        harian.map((item) => {
          if ((new Date(item.key_as_string)).toString() == sinceDate.toString()) {
            dataPositif.push(item.jumlah_positif.value);
            dataSembuh.push(item.jumlah_sembuh.value);
            dataMeninggal.push(item.jumlah_meninggal.value);
            dataAktif.push(item.jumlah_dirawat.value);
          }
        });
        try {
          const dataBulanan = {
            date: `${sinceDate.getFullYear()}-${appendZero(sinceDate.getMonth() + 1)}-${appendZero(sinceDate.getDate())}`,
            positive: dataPositif.reduce(reducer),
            recovered: dataSembuh.reduce(reducer),
            deaths: dataMeninggal.reduce(reducer),
            active: dataAktif.reduce(reducer),
          };
          dataFinal.push(dataBulanan);
        } catch (error) {}
        sinceDate.setTime(sinceDate.getTime() + 86400000);
      }
    }
    const response = h.response({
      ok: 'true',
      data: dataFinal,
      message: 'succes get data covid',
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      ok: 'false',
      message: 'not found',
      errors: error,
    });
    response.code(404);
    return response;
  }
};

const getDailyInformationWithRange = async (request, h) => {
  try {
    const data = await CovidSource.generalData();
    const { harian } = data;
    const { since, upto } = request.query;
    const { year } = request.params;
    const dataFinal = [];
    if (year) {
      const sinceDate = new Date(`${year}-01-01T00:00:00.000Z`);
      const uptoDate = new Date(`${year}-12-31T00:00:00.000Z`);
      while (sinceDate <= uptoDate) {
        const dataPositif = [];
        const dataSembuh = [];
        const dataMeninggal = [];
        const dataAktif = [];
        harian.map((item) => {
          if ((new Date(item.key_as_string)).toString() == sinceDate.toString()) {
            dataPositif.push(item.jumlah_positif.value);
            dataSembuh.push(item.jumlah_sembuh.value);
            dataMeninggal.push(item.jumlah_meninggal.value);
            dataAktif.push(item.jumlah_dirawat.value);
          }
        });
        try {
          const dataBulanan = {
            date: `${sinceDate.getFullYear()}-${appendZero(sinceDate.getMonth() + 1)}-${appendZero(sinceDate.getDate())}`,
            positive: dataPositif.reduce(reducer),
            recovered: dataSembuh.reduce(reducer),
            deaths: dataMeninggal.reduce(reducer),
            active: dataAktif.reduce(reducer),
          };
          dataFinal.push(dataBulanan);
        } catch (error) {}
        sinceDate.setTime(sinceDate.getTime() + 86400000);
      }
    } else if (since || upto) {
      if (since && !upto) {
        const uptoYearMonthDate = new Date(`${harian[harian.length - 1].key_as_string}`);
        const sinceDate = new Date(`${since.split('.')[0]}-${since.split('.')[1]}-${since.split('.')[2]}T00:00:00.000Z`);
        while (sinceDate <= uptoYearMonthDate) {
          const dataPositif = [];
          const dataSembuh = [];
          const dataMeninggal = [];
          const dataAktif = [];
          harian.map((item) => {
            if ((new Date(item.key_as_string)).toString() == sinceDate.toString()) {
              dataPositif.push(item.jumlah_positif.value);
              dataSembuh.push(item.jumlah_sembuh.value);
              dataMeninggal.push(item.jumlah_meninggal.value);
              dataAktif.push(item.jumlah_dirawat.value);
            }
          });
          const dataBulanan = {
            date: `${sinceDate.getFullYear()}-${appendZero(sinceDate.getMonth() + 1)}-${appendZero(sinceDate.getDate())}`,
            positive: dataPositif.reduce(reducer),
            recovered: dataSembuh.reduce(reducer),
            deaths: dataMeninggal.reduce(reducer),
            active: dataAktif.reduce(reducer),
          };
          dataFinal.push(dataBulanan);
          sinceDate.setTime(sinceDate.getTime() + 86400000);
        }
      } else if (!since && upto) {
        const sinceYearMonthDate = new Date(`${harian[0].key_as_string}`);
        const uptoDate = new Date(`${upto.split('.')[0]}-${upto.split('.')[1]}-${upto.split('.')[2]}T00:00:00.000Z`);
        while (sinceYearMonthDate <= uptoDate) {
          const dataPositif = [];
          const dataSembuh = [];
          const dataMeninggal = [];
          const dataAktif = [];
          harian.map((item) => {
            if ((new Date(item.key_as_string)).toString() == sinceYearMonthDate.toString()) {
              dataPositif.push(item.jumlah_positif.value);
              dataSembuh.push(item.jumlah_sembuh.value);
              dataMeninggal.push(item.jumlah_meninggal.value);
              dataAktif.push(item.jumlah_dirawat.value);
            }
          });
          const dataBulanan = {
            date: `${sinceYearMonthDate.getFullYear()}-${appendZero(sinceYearMonthDate.getMonth() + 1)}-${appendZero(sinceYearMonthDate.getDate())}`,
            positive: dataPositif.reduce(reducer),
            recovered: dataSembuh.reduce(reducer),
            deaths: dataMeninggal.reduce(reducer),
            active: dataAktif.reduce(reducer),
          };
          dataFinal.push(dataBulanan);
          sinceYearMonthDate.setTime(sinceYearMonthDate.getTime() + 86400000);
        }
      } else {
        const sinceDate = new Date(`${since.split('.')[0]}-${since.split('.')[1]}-${since.split('.')[2]}T00:00:00.000Z`);
        const uptoDate = new Date(`${upto.split('.')[0]}-${upto.split('.')[1]}-${upto.split('.')[2]}T00:00:00.000Z`);
        while (sinceDate <= uptoDate) {
          const dataPositif = [];
          const dataSembuh = [];
          const dataMeninggal = [];
          const dataAktif = [];
          harian.map((item) => {
            if ((new Date(item.key_as_string)).toString() == sinceDate.toString()) {
              dataPositif.push(item.jumlah_positif.value);
              dataSembuh.push(item.jumlah_sembuh.value);
              dataMeninggal.push(item.jumlah_meninggal.value);
              dataAktif.push(item.jumlah_dirawat.value);
            }
          });
          const dataBulanan = {
            date: `${sinceDate.getFullYear()}-${appendZero(sinceDate.getMonth() + 1)}-${appendZero(sinceDate.getDate())}`,
            positive: dataPositif.reduce(reducer),
            recovered: dataSembuh.reduce(reducer),
            deaths: dataMeninggal.reduce(reducer),
            active: dataAktif.reduce(reducer),
          };
          dataFinal.push(dataBulanan);
          sinceDate.setTime(sinceDate.getTime() + 86400000);
        }
      }
    } else {
      const sinceYearMonthDate = new Date(`${harian[0].key_as_string}`);
      const uptoYearMonthDate = new Date(`${harian[harian.length - 1].key_as_string}`);
      while (sinceYearMonthDate <= uptoYearMonthDate) {
        const dataPositif = [];
        const dataSembuh = [];
        const dataMeninggal = [];
        const dataAktif = [];
        harian.map((item) => {
          if ((new Date(item.key_as_string)).toString() == sinceYearMonthDate.toString()) {
            dataPositif.push(item.jumlah_positif.value);
            dataSembuh.push(item.jumlah_sembuh.value);
            dataMeninggal.push(item.jumlah_meninggal.value);
            dataAktif.push(item.jumlah_dirawat.value);
          }
        });
        const dataBulanan = {
          date: `${sinceYearMonthDate.getFullYear()}-${appendZero(sinceYearMonthDate.getMonth() + 1)}-${appendZero(sinceYearMonthDate.getDate())}`,
          positive: dataPositif.reduce(reducer),
          recovered: dataSembuh.reduce(reducer),
          deaths: dataMeninggal.reduce(reducer),
          active: dataAktif.reduce(reducer),
        };
        dataFinal.push(dataBulanan);
        sinceYearMonthDate.setTime(sinceYearMonthDate.getTime() + 86400000);
      }
    }
    const response = h.response({
      ok: 'true',
      data: dataFinal,
      message: 'succes get data covid',
    });
    response.code(200);
    return response;
  } catch (error) {
    console.log(error);
    const response = h.response({
      ok: 'false',
      message: 'not found',
      errors: error,
    });
    response.code(404);
    return response;
  }
};

module.exports = {
  getGeneralInformation,
  getYearlyInformation,
  getMonthlyInformation,
  getMonthlyInformationWithRange,
  getDailyInformation,
  getDailyInformationWithRange,
};
