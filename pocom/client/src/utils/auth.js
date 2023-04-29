const apiUrl = process.env.REACT_APP_API_URL;

export const isAuthenticated = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/user/getSession`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      return data.loggedIn;
    } catch (error) {
      console.error(error);
      return false;
    }
  };