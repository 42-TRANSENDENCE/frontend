import { useMutation, UseMutationResult, MutationFunction, useQueryClient } from "react-query";
import { useNavigate } from 'react-router-dom';
import { useFetcher } from '../fetcher';
type ImageFile = File | null;

async function uploadAvatar(file: ImageFile): Promise<void> {
  if (!file) return;
  const awsUrl = import.meta.env.VITE_AWS_URL;
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const formData = new FormData();
  formData.append("file", file);
  
  const response = await fetch(awsUrl + '/users/avatar', {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload avatar");
  }
  else if (response.status === 401) {
    fetcher('/auth/refresh', {
      method: 'GET',
      credentials: 'include',
    })
    .then((response) => {
      if (response.status === 401) navigate('/');
      else return response;
    })
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

// export function useLogout() {
//   const fetcher = useFetcher();
//   const navigate = useNavigate();
//   const mutation = useMutation({
//     mutationFn: async () => {
//       const response = await fetcher('/auth/logout', {
//         method: 'POST',
//         credentials: 'include',
//       });
//       if (response.status === 200) {
//         navigate('/');
//       }
//       throw response;
//     },
//     onError: () => {
//       // error handling
//     },
//   });
//   return mutation;
// }
