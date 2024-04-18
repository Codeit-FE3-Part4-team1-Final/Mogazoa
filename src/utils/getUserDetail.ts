const getUserDetail = async (id: number) => {
  try {
    const response = await fetch(`${process.env.API_URL_HOST}/users/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getUserDetail;
