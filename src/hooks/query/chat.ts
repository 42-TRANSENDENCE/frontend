import { useQuery } from 'react-query';
import { useFetcher } from '../fetcher';

export const useAllChannels = () => {
  const fetcher = useFetcher();
  const data = useQuery({
    queryKey: ['allChannels'],
    queryFn: async () => {
      const response = await fetcher('/channels', {
        method: 'GET',
        credentials: 'include',
      })
      if (response.ok) return response.json();
      throw response;
    }
  });
  return data;
}

export const useMyChannels = () => {
  const fetcher = useFetcher();
  const data = useQuery({
    queryKey: ['myChannels'],
    queryFn: async () => {
      const response = await fetcher('/channels/mychannels', {
        method: 'GET',
        credentials: 'include',
      })
      if (response.ok) return response.json();
      throw response;
    }
  });
  return data;
}

export const useGetChats = (id: string) => {
  const fetcher = useFetcher();
  const data = useQuery({
    queryKey: ['getChats'],
    queryFn: async () => {
      const response = await fetcher('/chat/' + id, {
        method: 'GET',
        credentials: 'include',
      })
      if (response.ok) return response.json();
      throw response;
    }
  });
  return data;
}
