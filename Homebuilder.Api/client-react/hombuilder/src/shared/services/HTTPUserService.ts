export const get = async (url : string) => {
    debugger;
    
    const result = await fetch(process.env.REACT_APP_API_URL + url);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
  };
