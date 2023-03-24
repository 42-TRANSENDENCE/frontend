// import { useQueryClient } from 'react-query';
// import { useRefreshToken } from './query/user';
import { useNavigate } from 'react-router-dom';

const awsUrl = import.meta.env.VITE_AWS_URL;

export function useFetcher() {
  // const queryClient = useQueryClient();
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
            // queryClient.invalidateQueries({ queryKey: ['auth/refresh'] });
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
