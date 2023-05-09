const apiUrl = process.env.REACT_APP_API_URL;

export const logout = async () => {
    try {
      
      await fetch(`${apiUrl}/api/user/destroySession`, {
        method: 'GET',
        credentials: 'include',
      });

    } catch (error) {
      console.error(error);
      return false;
    }
  };