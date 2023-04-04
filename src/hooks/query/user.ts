import { useQuery } from 'react-query';
import { useFetcher } from '../fetcher';
import { toast } from 'react-toastify';
import { ProfileEnum, ProfileProps } from '../../components/Profile';

export interface UserInfo {
  id: number,
  nickname: string,
  status: string,
  isTwoFactorAuthenticationEnabled: boolean,
  win: number,
  lose: number
}

export const useUserInfo = () => {
  const fetcher = useFetcher();
  const data = useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const response = await fetcher('/users', {
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
      const response = await fetcher('/users/avatar', {
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



interface Props {
  userSearch: string;
  userInfoData: any;
  setPopProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<ProfileProps | null>>;
}

type UseUserSearchReturnType = {
  refetch: (props: Props) => void;
  queryKey: string;
};

export const useUserSearch = (): UseUserSearchReturnType => {
  const fetcher = useFetcher();
  const queryKey = 'userSearch';
  const queryFn = async ({ userSearch, userInfoData, setPopProfile, setUser }: Props) => {
    const response = await fetcher('/users/search/' + userSearch, {
      method: 'GET',
      credentials: 'include'
    });
    if (response.ok) {
      response.json().then(data => {
        if (data.id === userInfoData.id) {
          setPopProfile(false);
          return;
        }
        const bufferObj: { type: "Buffer", data: [] } = { type: data.avatar.type, data: data.avatar.data };
        const uint8Array = new Uint8Array(bufferObj.data);
        const blob = new Blob([uint8Array], { type: "application/octet-stream" });
        const userProfile: ProfileProps = {
          id: data.id,
          imageSrc: URL.createObjectURL(blob),
          nickname: data.nickname,
          win: data.win,
          lose: data.lose,
          who: data.isFriend ? ProfileEnum.FRIEND : ProfileEnum.OTHERS
        };
        setUser(userProfile);
        setPopProfile(true);
      });
      return response;
    } else {
      toast.error('User not found (' + userSearch + ')');
    }
  };

  return {
    refetch: (props: Props) => queryFn(props),
    queryKey: queryKey,
  };
};



// export const useUser2FA = () => {
//   const fetcher = useFetcher();
//   const data = useQuery({
//     queryKey: ['2faGenerate'],
//     queryFn: async () => {
//       const response = await fetcher(`/2fa/turn-on`, {
//         method: 'GET',
//         credentials: 'include',
//       })
//       if (response.status === 200 && response.headers.get('Content-Type') === 'image/png') {
//         return response.blob();
//       } else {
//         throw new Error('Invalid QR code image response');
//       }
//     },
//     retry: 0,
//   });
//   return data;
// }

// export function useRefreshToken() {
//   const fetcher = useFetcher();
//   const navigate = useNavigate();
//   console.log('refresh');
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
