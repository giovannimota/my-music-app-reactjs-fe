const baseUrl = "http://localhost:8080";

export const registrarCompositor = async (params) => {
  return await fetch(baseUrl + "/compositor", { 
      method: 'POST',  
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(params)
    });
}

export const buscarCompositor = async (filters) => {
  const params = getRequestParams(filters);

  return await fetch(baseUrl + "/compositor" + params, { 
      method: 'GET',  
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
}


const getRequestParams = params => {
  const keys = Object.keys(params);

  if(keys.length === 0) {
    return "";
  }
  let paramsStr = "?";
  keys.forEach(key => {
    paramsStr += key + "=" + params[key] + "&";
  })

  return paramsStr;
}