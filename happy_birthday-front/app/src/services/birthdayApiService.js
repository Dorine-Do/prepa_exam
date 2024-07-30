const apiBaseUrl = process.env.REACT_APP_API_URL;

export const getTodaysBirthday = async () => {

  // Ne fonctionne pas
  // let queryUrl = `${apiBaseUrl}/getBirthday`;

  try {
    const data = await fetch('http://localhost:3002/getBirthday', {
      'Content-Type': 'application/json',
    }).json();
    return data
  } catch (error) {
    return false;
  }
};