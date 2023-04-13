import { useFetcher } from "../fetcher";
import { useMutation, UseMutationResult, MutationFunction, useQueryClient } from "react-query";
import { Socket } from 'socket.io-client';
import { toast } from 'react-toastify';

interface JoinChannelData {
	id: string;
	password: string;
  socket: Socket | undefined;
}

export interface CreateChannelData {
  title: string;
  password: string;
  socket: Socket | undefined;
}

export function useCreatChannel(): UseMutationResult<void, Error, CreateChannelData, MutationFunction<void, CreateChannelData>> {
	const queryClient = useQueryClient();
	const fetcher = useFetcher();

  async function createChannel(data: CreateChannelData): Promise<void> {
    const { title, password, socket } = data;
    await fetcher('/channels', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        password,
      })
    })
      .then(response => {
        if (response.status === 201) {
          toast.success('New channel created');
          socket?.on('joinChannel', (data: any) => {
            socket?.emit('joinChannel', {'channelId': data.id});
          });
          return () => {
            socket?.off('joinChannel');
          }
        }
        else if (response.status === 400)
          toast.error('Channel name alreay exists')
      })
  }
  return useMutation({
    mutationFn: createChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allChannels'] });
      queryClient.invalidateQueries({ queryKey: ['myChannels'] });
    }
  })
}


export function useJoinChannel(): UseMutationResult<void, Error, JoinChannelData, MutationFunction<void, JoinChannelData>> {
	const queryClient = useQueryClient();
	const fetcher = useFetcher();

	async function joinChannel(data: JoinChannelData): Promise<void> {
		const { id, password, socket } = data;
		await fetcher("/channels/" + id, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ password: password }),
		})
      .then((response) => {
			if (response.status === 200) {
        toast.success('Successfully joined channel ' + id);
        socket?.emit('joinChannel', {'channelId': id});
      }
      else if (response.status === 400)
        toast.error('You are already in the channel');
      else if (response.status === 403)
        toast.error('Wrong password')
		});
	}

	return useMutation({
    mutationFn: joinChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myChannels'] });
    }
  });
}
