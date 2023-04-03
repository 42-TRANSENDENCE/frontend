import { useFetcher } from '../fetcher';
import { useMutation, UseMutationResult, MutationFunction, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

export function useAddFriend(): UseMutationResult<void, Error, number, MutationFunction<void, number>> {
  const queryClient = useQueryClient();
  const fetcher = useFetcher();

  async function addFriend(id: number): Promise<void> {
    await fetcher('/users/friends/request/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
  }

  return useMutation({
    mutationFn: addFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPendingFriendList'] });
    }
  });
}

export function useApproveFriend(): UseMutationResult<void, Error, number, MutationFunction<void, number>> {
  const queryClient = useQueryClient();
  const fetcher = useFetcher();

  async function approveFriend(id: number): Promise<void> {
    await fetcher('/users/friends/approve/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(response => {
        if (response.status === 200)
          toast.success('Approved request');
      })
  }

  return useMutation({
    mutationFn: approveFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userFriendList'] });
      queryClient.invalidateQueries({ queryKey: ['userReceivedFriendList'] });
    }
  });
}

export function useRefuseFriend(): UseMutationResult<void, Error, number, MutationFunction<void, number>> {
  const queryClient = useQueryClient();
  const fetcher = useFetcher();

  async function refuseFriend(id: number): Promise<void> {
    await fetcher('/users/friends/received/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(response => {
        if (response.status === 200)
          toast.success('Refused request');
      })
  }

  return useMutation({
    mutationFn: refuseFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userReceivedFriendList'] });
    }
  });
}

export function useDeleteRequestFriend(): UseMutationResult<void, Error, number, MutationFunction<void, number>> {
  const queryClient = useQueryClient();
  const fetcher = useFetcher();

  async function deleteRequestFriend(id: number): Promise<void> {
    await fetcher('/users/friends/request/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(response => {
        if (response.status === 200)
          toast.success('Request canceled');
      })
  }

  return useMutation({
    mutationFn: deleteRequestFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPendingFriendList'] });
    }
  });
}

export function useDeleteFriend(): UseMutationResult<void, Error, number, MutationFunction<void, number>> {
  const queryClient = useQueryClient();
  const fetcher = useFetcher();

  async function deleteFriend(id: number): Promise<void> {
    await fetcher('/users/friends/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(response => {
        if (response.status === 200)
          toast.success('Friend deleted');
      })
  }

  return useMutation({
    mutationFn: deleteFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userFriendList'] });
    }
  });
}
