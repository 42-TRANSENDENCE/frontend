import { useMutation, UseMutationResult, MutationFunction, useQueryClient } from "react-query";
import { useNavigate } from 'react-router-dom';
import { useFetcher } from '../fetcher';
type ImageFile = File | null;

async function uploadAvatar(file: ImageFile): Promise<void> {
  if (!file) return;
  
  const fetcher = useFetcher();
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetcher('/users/avatar', {
    method: "PUT",
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error("Failed to upload avatar");
  }
}

export function useUploadAvatar(): UseMutationResult<void, Error, ImageFile, MutationFunction<void, ImageFile>> {
  
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['userAvatar']})
    }
  });
}

export function useLogout() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetcher('/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.status === 200) {
        navigate('/');
      }
      throw response;
    },
    onError: () => {
      // error handling
    },
  });
  return mutation;
}
