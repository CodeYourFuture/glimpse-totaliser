const getToday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
};

const getYesterday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - 1);
  return date.toISOString();
};

const getDateFromString = str =>
  ({
    today: getToday(),
    yesterday: getYesterday()
  }[str]);

const paginate = async (params, request) => {
  let responses = [];
  let nextParams = params;
  do {
    const response = await request(nextParams);
    responses = [...responses, ...response];
    nextParams = response.nextPageParameters;
  } while (nextParams !== undefined);
  return responses;
};

module.exports = { getToday, getYesterday, getDateFromString, paginate };
