import { useFetcher } from '../fetcher';
import { useMutation, UseMutationResult, MutationFunction, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
type ImageFile = File | null;

export function useUploadAvatar(): UseMutationResult<void, Error, ImageFile, MutationFunction<void, ImageFile>> {
  const queryClient = useQueryClient();
  const fetcher = useFetcher();

  async function uploadAvatar(file: ImageFile): Promise<void> {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    
    await fetcher('/users/avatar', {
      method: 'PUT',
      body: formData,
      credentials: 'include',
    })
  }

  return useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['userAvatar']})
    }
  });
}

export function useSignup(): UseMutationResult<void, Error, string, MutationFunction<void, string>> {
  const fetcher = useFetcher();
  const navigate = useNavigate();

  async function signup(nickname: string): Promise<void> {
    await fetcher('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname: nickname }),
      credentials: 'include',
    })
    .then(response => {
      if (response.ok) {
        navigate('/socket');
        toast.success('Signed up successfully.');
      } else {
        response.json().then(data => {
          if (typeof data.message === 'string') {
            toast.error(data.message);
          } else if (Array.isArray(data.message)) {
            toast.error(data.message[0]);
          } else {
            toast.error('An error occurred.');
          }
        });
      }
    })
  }

  return useMutation(signup);
}

export function useChangeNickname(): UseMutationResult<void, Error, string, MutationFunction<void, string>> {
  const queryClient = useQueryClient();
  const fetcher = useFetcher();

  async function changeNickname(newNickname: string): Promise<void> {
    await fetcher('/users/nickname', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname: newNickname }),
      credentials: 'include',
    })
    .then(response => {
      if (response.ok) {
        toast.success('Nickname changed successfully.');
      } else {
        response.json().then(data => {
          if (typeof data.message === 'string') {
            toast.error(data.message);
          } else if (Array.isArray(data.message)) {
            toast.error(data.message[0]);
          } else {
            toast.error('An error occurred.');
          }
        });
      }
    })
  }

  return useMutation({
    mutationFn: changeNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['userInfo']})
    }
  });
}
