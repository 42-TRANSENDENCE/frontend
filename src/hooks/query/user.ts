import { useQuery } from 'react-query';
import { useFetcher } from '../fetcher';
import { toast } from 'react-toastify';
import { ProfileEnum, ProfileProps } from '../../components/Profile';

export interface UserInfo {
  id: number,
  nickname: string,
  avatar: {},
  isTwoFactorAuthenticationEnabled: boolean,
  achievements: [],
  win: number,
  lose: number,
}

export const useUserInfo = () => {
  const fetcher = useFetcher();
  const data = useQuery({
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
    refetchOnWindowFocus: false,
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
          who: data.isFriend ? ProfileEnum.FRIEND : ProfileEnum.OTHERS,
          achievements: data.achievements
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


// interface Props {
//   userSearch: string;
//   userInfoData: any;
//   setPopProfile: React.Dispatch<React.SetStateAction<boolean>>;
//   setUser: React.Dispatch<React.SetStateAction<ProfileProps | null>>;
// }

// export function useUserSearch(variables: Props): () => void {
//   const queryKey = 'userSearch';
//   const fetcher = useFetcher();

//   if (variables) {
//     const { data } = useQuery(queryKey, async () => {
//       const response = await fetcher('/users/search/' + variables.userSearch, {
//         method: 'GET',
//         credentials: 'include'
//       });
//       if (response.ok) {
//         const data = await response.json();
//         if (data.id === variables.userInfoData.id) {
//           variables.setPopProfile(false);
//           return null;
//         }
//         const bufferObj: { type: "Buffer", data: [] } = { type: data.avatar.type, data: data.avatar.data };
//         const uint8Array = new Uint8Array(bufferObj.data);
//         const blob = new Blob([uint8Array], { type: "application/octet-stream" });
//         const userProfile: ProfileProps = {
//           id: data.id,
//           imageSrc: URL.createObjectURL(blob),
//           nickname: data.nickname,
//           win: data.win,
//           lose: data.lose,
//           who: data.isFriend ? ProfileEnum.FRIEND : ProfileEnum.OTHERS
//         };
//         variables.setUser(userProfile);
//         variables.setPopProfile(true);
//         return data;
//       } else {
//         throw new Error('User not found (' + variables.userSearch + ')');
//       }
//     });
//     return data;
//   }
//   return () => {};
// };
