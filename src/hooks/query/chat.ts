import { useQuery } from "react-query";
import { useFetcher } from "../fetcher";

export const useAllChannels = () => {
  const fetcher = useFetcher();
  const data = useQuery({
    queryKey: ["allChannels"],
    queryFn: async () => {
      const response = await fetcher("/channels", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) return await response.json();
      throw response;
    },
  });
  return data;
};

export const useMyChannels = () => {
  const fetcher = useFetcher();
  const data = useQuery({
    queryKey: ["myChannels"],
    queryFn: async () => {
      const response = await fetcher("/channels/mychannels", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) return await response.json();
      throw response;
    },
  });
  return data;
};

export const useGetChats = (id: string) => {
  const fetcher = useFetcher();
  const data = useQuery({
    queryKey: ["getChats", id],
    queryFn: async () => {
      const response = await fetcher("/chat/" + id, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) return await response.json();
      throw response;
    },
  });
  return data;
};

export const useChannelInfo = ({ id, setPopChatting }: { id: string, setPopChatting: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const fetcher = useFetcher();
  const data = useQuery({
    queryKey: ["channelInfo", id],
    queryFn: async () => {
      const response = await fetcher("/channels/" + id, {
        method: "GET",
        credentials: "include",
      });
      if (response.status === 200)
        return await response.json();
      else if (response.status === 404)
        setPopChatting(false);
    },
  });
  return data;
};
