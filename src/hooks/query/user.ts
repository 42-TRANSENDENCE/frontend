import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useFetcher } from '../fetcher';

// const awsUrl = "http://44.195.129.81";

export interface UserInfo {
  id: number,
  nickname: string,
  status: string,
  isTwoFactorAuthenticationEnabled: boolean
}

export const useUserInfo = () => {
  const fetcher = useFetcher();
  const data = useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: async () => {
      // const response = await fetch(`${awsUrl}/users`, {
      //   method: 'GET',
      //   credentials: 'include',
      // })
      const response = await fetcher(`/users`, {
        method: 'GET',
        credentials: 'include',
      })
      if (response.ok) return response.json();
      throw response;
    },
    retry: 0,
  });
  return data;
}

export const useUserAvatar = () => {
  const fetcher = useFetcher();
  const data = useQuery({
    queryKey: ['userAvatar'],
    queryFn: async () => {
      // const response = await fetch(`${awsUrl}/users/avatar`, {
      //   method: 'GET',
      //   credentials: 'include',
      // })
      const response = await fetcher(`/users/avatar`, {
        method: 'GET',
        credentials: 'include',
      })
      if (response.ok) return response.blob();
      throw response;
    },
    retry: 0,
  });
  return data;
}

// export function useRefreshToken() {
//   const fetcher = useFetcher();
//   const navigate = useNavigate();
//   useQuery({
//     queryKey: ['auth/refresh'],
//     queryFn: async () => {
//       await fetcher('/auth/refresh', {
//         method: 'GET',
//         credentials: 'include',
//       })
//     },
//     onError: (err) => {
//       if (err instanceof Response) {
//         if (err.status === 401) {
//           navigate('/');
//         }
//       }
//     },
//     retry: 0,
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//     refetchInterval: 3500 * 1000,
//   });
// }

