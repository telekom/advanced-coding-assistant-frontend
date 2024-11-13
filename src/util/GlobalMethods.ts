import { isValidUrl } from './IsValidUrl';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `Request failed with status ${response.status} (${response.statusText}): ${errorText}`;

    switch (response.status) {
      case 401:
        errorMessage = 'Unauthorized: Please check your credentials.';
        break;
      case 404:
        errorMessage = 'Not Found: The requested resource could not be found.';
        break;
      case 500:
        errorMessage = 'Something went wrong: Please try again later.';
        break;
      default:
        errorMessage = `Request failed with status ${response.status} (${response.statusText}): ${errorText}`;
    }

    throw new Error(errorMessage);
  }
  return response.text().then((text) => {
    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
      throw new Error(String(e));
    }
  });
};

const handleError = (error: Error) => {
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return { error: 'Network error: Please check your internet connection or the server might be down.' };
  } else if (error instanceof SyntaxError) {
    return { error: 'Syntax error: There was a problem parsing the response.' };
  } else if (error instanceof ReferenceError) {
    return { error: 'Reference error: There was a problem with a reference in your code.' };
  } else {
    return { error: error.message };
  }
};

const request = async (method: string, url: string, body?: unknown, headers = {}, contentType = 'application/json; charset=utf-8') => {
  try {
    const BASE_URL = import.meta.env.VITE_APP_BACKEND_ENDPOINT;

    if (!isValidUrl(BASE_URL)) {
      throw new Error('Invalid URL: Access to the requested resource is not allowed.');
    }
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: {
        ...(contentType !== 'multipart/form-data' && { 'Content-Type': contentType }),
        ...headers,
      },
      body:
        method !== 'GET' && body
          ? contentType === 'application/json; charset=utf-8'
            ? JSON.stringify(body)
            : body instanceof FormData
              ? body
              : String(body)
          : undefined,
    });
    return await handleResponse(response);
  } catch (error) {
    return handleError(error as Error);
  }
};

export const post = (url: string, body: unknown, headers = {}, contentType = 'application/json; charset=utf-8') =>
  request('POST', url, body, headers, contentType);
export const get = (url: string) => request('GET', url);
export const put = (url: string, body: unknown, headers = {}, contentType = 'application/json; charset=utf-8') =>
  request('PUT', url, body, headers, contentType);
export const del = (url: string, headers = {}) => request('DELETE', url, undefined, headers);
