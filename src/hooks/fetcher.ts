import { useQueryClient } from "react-query";

const awsUrl = import.meta.env.VITE_AWS_URL;

export function useFetcher() {
  const queryClient = useQueryClient();

  const fetcherWrapper = (
    url: string,
    options: RequestInit = {},
    contentType = 'application/json',
  ) =>
    fetcher(url, options, contentType)
      .then((response) => {
        if (response.status === 401) throw response;
        else return response;
      })
      .catch((e) => {
        if (e instanceof Response) {
          if (e.status === 401) {
            queryClient.invalidateQueries({ queryKey: ['auth/refresh'] });
          }
        }
        throw e;
      });
  return fetcherWrapper;
}

export async function fetcher(
  url: string,
  options: RequestInit = {},
  contentType: string,
) {
  options.headers = {
    ...options.headers,
    'content-type': contentType,
  };

  const response = await fetch(awsUrl + url, options);

  return response;
}
