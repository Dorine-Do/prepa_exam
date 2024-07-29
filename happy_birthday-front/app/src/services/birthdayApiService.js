const apiBaseUrl = process.env.REACT_APP_API_URL;

export const getTodaysBirthday = async () => {

  // Ne fonctionne pas
  // let queryUrl = `${apiBaseUrl}/getBirthday`;

  try {
    const data = await fetch('http://localhost:3002/getBirthday').json();
    return data
  } catch (error) {
    return false;
  }
};

export const getRandomQuote = async () => {
  // Ne fonctionne pas
  // let queryUrl = `${apiBaseUrl}/getQuote`;
  console.log('*****************************************************************************************')

  try {
    const data = await (await fetch('http://localhost:3002/getQuote')).json();
    console.log(data)

     return data;
  } catch (error) {
    return false;
  }
};
