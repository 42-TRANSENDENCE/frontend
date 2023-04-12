import { useQuery } from 'react-query';
import { useFetcher } from '../fetcher';
import { toast } from 'react-toastify';

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
