import { useQuery } from 'react-query';
import { useFetcher } from '../fetcher';

export const useGetFriendList = () => {
  const fetcher = useFetcher();
  const data = useQuery({
    queryKey: ['userFriendList'],
    queryFn: async () => {
      const response = await fetcher('/users/friends', {
        method: 'GET',
        credentials: 'include',
      })
      if (response.ok) return response.json();
      throw response;
    }
  });
  return data;
}

export const usePendingFriendList = () => {
  const fetcher = useFetcher();
  const data = useQuery({
    queryKey: ['userPendingFriendList'],
    queryFn: async () => {
      const response = await fetcher('/users/friends/pending', {
        method: 'GET',
        credentials: 'include',
      })
      if (response.ok) return response.json();
      throw response;
    }
  });
  return data;
}

export const useReceivedFriendList = () => {
  const fetcher = useFetcher();
  const data = useQuery({
    queryKey: ['userReceivedFriendList'],
    queryFn: async () => {
      const response = await fetcher('/users/friends/received', {
        method: 'GET',
        credentials: 'include',
      })
      if (response.ok) return response.json();
      throw response;
    }
  });
  return data;
}

export const useBlocklist = () => {
  const fetcher = useFetcher();
  const data = useQuery({
    queryKey: ['blocklist'],
    queryFn: async () => {
      const response = await fetcher('/users/friends/blocklist', {
        method: 'GET',
        credentials: 'include',
      })
      if (response.ok) return response.json();
      throw response;
    }
  });
  return data;
}
