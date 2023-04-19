import { useFetcher } from '../fetcher';
import { useMutation, UseMutationResult, MutationFunction, useQueryClient } from 'react-query';
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

interface PostChatData {
  id: string;
  chat: string;
}

interface AKBMData {
  id: string;
  user: string;
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
      queryClient.invalidateQueries({ queryKey: ['myChannels'] });
    }
  })
}


export function useJoinChannel(): UseMutationResult<void, Error, JoinChannelData, MutationFunction<void, JoinChannelData>> {
  const queryClient = useQueryClient();
  const fetcher = useFetcher();

  async function joinChannel(data: JoinChannelData): Promise<void> {
    const { id, password, socket } = data;
    await fetcher('/channels/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ password: password }),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Successfully joined channel');
          socket?.emit('joinChannel', { 'channelId': String(id) });
        }
        else if (response.status === 400)
          toast.error('You are already in the channel');
        else if (response.status === 401)
          toast.warning('You are banned to this channel');
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

export function usePostChat(): UseMutationResult<void, Error, PostChatData, MutationFunction<void, PostChatData>> {
  const fetcher = useFetcher();

  async function postChat(data: PostChatData): Promise<void> {
    const { id, chat } = data;
    await fetcher('/chat/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ content: chat }),
    })
  }

  return useMutation(postChat);
}

export function useAdmin(): UseMutationResult<void, Error, AKBMData, MutationFunction<void, AKBMData>> {
  const fetcher = useFetcher();

  async function admin(data: AKBMData): Promise<void> {
    const { id, user } = data;
    await fetcher('/channels/' + id + '/admin/' + user, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (response.status === 200)
          toast.success('Admin privileges have been successfully granted');
      })
  }
  return useMutation(admin);
}

export function useKick(): UseMutationResult<void, Error, AKBMData, MutationFunction<void, AKBMData>> {
  const fetcher = useFetcher();

  async function kick(data: AKBMData): Promise<void> {
    const { id, user, socket } = data;
    await fetcher('/channels/' + id + '/kick/' + user, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success(id + 'is kicked out');
          socket?.emit('leaveChannel', { 'channelId': String(id), 'userId': String(user) });
        }
      })
  }
  return useMutation(kick);
}

export function useBan(): UseMutationResult<void, Error, AKBMData, MutationFunction<void, AKBMData>> {
  const fetcher = useFetcher();

  async function ban(data: AKBMData): Promise<void> {
    const { id, user, socket } = data;
    await fetcher('/channels/' + id + '/ban/' + user, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success(id + ' is banned in this channel');
          socket?.emit('leaveChannel', { 'channelId': String(id), 'userId': String(user) });
        }
      })
  }
  return useMutation(ban);
}

export function useMute(): UseMutationResult<void, Error, AKBMData, MutationFunction<void, AKBMData>> {
  const fetcher = useFetcher();

  async function mute(data: AKBMData): Promise<void> {
    const { id, user } = data;
    await fetcher('/channels/' + id + '/mute/' + user, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (response.status === 200)
          toast.success(id + ' has been muted in this channel');
      })
  }
  return useMutation(mute);
}
