import { useQuery } from 'react-query';

const awsUrl = "http://44.195.129.81";

export interface UserInfo {
  id: number,
  nickname: string,
  status: string,
  isTwoFactorAuthenticationEnabled: boolean
}

export const useUserInfo = () => {
  return useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const response = await fetch(`${awsUrl}/users`, {
        method: 'GET',
        credentials: 'include',
      }) 
      if (response.ok) return response.json();
      throw response;
    }
  })
}

export const useUserAvatar = () => {
  return useQuery({
    queryKey: ['userAvatar'],
    queryFn: async () => {
      const response = await fetch(`${awsUrl}/users/avatar`, {
        method: 'GET',
        credentials: 'include',
      })
      if (response.ok) return response.blob();
      throw response;
    }
  })
}
