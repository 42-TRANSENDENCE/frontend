import { useNavigate } from 'react-router-dom';

const awsUrl = `http://${import.meta.env.VITE_AWS_URL}:${import.meta.env.VITE_AWS_PORT}`;

export function useFetcher() {
  const navigate = useNavigate();

  const fetcherWrapper = (
    url: string,
    options: RequestInit = {},
    // contentType = 'application/json',
  ) =>
    fetcher(url, options)
      .then((response) => {
        if (response.status === 401) throw response;
        else return response;
      })
      .catch((e) => {
        if (e instanceof Response) {
          if (e.status === 401) {
            fetcher('/auth/refresh', {
              method: 'GET',
              credentials: 'include',
            })
            .then((response) => {
              if (response.status === 401) navigate('/');
              else return response;
            })
          }
        }
        throw e;
      });
  return fetcherWrapper;
}

export async function fetcher(
  url: string,
  options: RequestInit = {},
  // contentType: string,
) {
  // options.headers = {
  //   ...options.headers,
  //   'content-type': contentType,
  // };

  const response = await fetch(awsUrl + url, options);

  return response;
}
