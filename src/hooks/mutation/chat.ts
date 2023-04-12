import { useFetcher } from "../fetcher";
import { Socket } from "socket.io-client";
import {
	useMutation,
	UseMutationResult,
	MutationFunction,
	useQueryClient,
} from "react-query";
import { toast } from 'react-toastify';

interface JoinChannelData {
	dataset_roomId: string;
	password: string | null;
  socket: Socket;
}

export interface CreateChannelData {
  title: string;
  password: string;
}

export function useCreatChannel(): UseMutationResult<void, Error, CreateChannelData, MutationFunction<void, CreateChannelData>> {
	const queryClient = useQueryClient();
	const fetcher = useFetcher();

  async function createChannel(data: CreateChannelData): Promise<void> {
    const { title, password } = data;
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
        if (response.status === 201)
          toast.success('New channel created');
        else if (response.status === 400)
          toast.error('Channel name alreay exists')
      })
  }
  return useMutation({
    mutationFn: createChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allChannels'] });
    }
  })
}


export function useJoinChatRoom(): UseMutationResult<void, Error, JoinChannelData, MutationFunction<void, JoinChannelData>> {
	const queryClient = useQueryClient();
	const fetcher = useFetcher();

	async function joinRoomId(data: JoinChannelData): Promise<void> {
		const { dataset_roomId, password, socket } = data;
		await fetcher("/channels/" + dataset_roomId, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ password: password }),
		}).then((response) => {
			if (response.ok) {
        console.log(`-dataset_roomId-${dataset_roomId}`);
				// socket.emit('join-channel', {"channelId":String(dataset_roomId)});
			}
		});
	}

	return useMutation(joinRoomId);
}
