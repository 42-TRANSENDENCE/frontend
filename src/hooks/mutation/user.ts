import TwoFactor from '@/pages/TwoFactor/TwoFactor';
import { useMutation, UseMutationResult, MutationFunction, useQueryClient } from 'react-query';
type ImageFile = File | null;

async function uploadAvatar(file: ImageFile): Promise<void> {
  if (!file) return;
  const awsUrl = import.meta.env.VITE_AWS_URL;
  const formData = new FormData();
  formData.append("file", file);
  
  await fetch(awsUrl + '/users/avatar', {
    method: 'PUT',
    body: formData,
    credentials: 'include',
  })
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
