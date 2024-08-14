import ENV from './env';

function api<Response>(url: RequestInfo | URL, options?: RequestInit): Promise<Response> {
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      [ENV.API_KEY_NAME]: ENV.API_KEY,
      ...options?.headers
    }
  };

  return fetch(url, config)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(`Error: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });
}

export default api;
