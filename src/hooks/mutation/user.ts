import { useFetcher } from '../fetcher';
import { useMutation, UseMutationResult, MutationFunction, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import React from 'react';
type ImageFile = File | null;

export interface TwoFactorData {
  password: string;
  setTwoFactorError: React.Dispatch<React.SetStateAction<boolean>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export function useValidate2FA(): UseMutationResult<void, Error, TwoFactorData, MutationFunction<void, TwoFactorData>> {
  const navigate = useNavigate();
  const awsUrl = `http://${import.meta.env.VITE_AWS_URL}:${import.meta.env.VITE_AWS_PORT}`;

  async function validate2FA(data: TwoFactorData): Promise<void> {
    const { password, setTwoFactorError, setPassword } = data;
    await fetch(awsUrl + '/2fa/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ token: password }),
    }).then((response) => {
      if (response.status === 200) {
        navigate("/home");
      } else if (response.status === 401) {
        toast.error('Wrong password. Try again');
        setTwoFactorError(true);
        setPassword('');
      } else {
        throw new Error('Unexpected response status code');
      }
    });
  }
  return useMutation(validate2FA);
}

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
      queryClient.invalidateQueries({ queryKey: ['userInfo'] })
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
        navigate("/home");
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
      queryClient.invalidateQueries({ queryKey: ['userInfo'] })
    }
  });
}
