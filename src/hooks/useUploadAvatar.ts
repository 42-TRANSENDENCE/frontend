import { useMutation, UseMutationResult, MutationFunction, useQueryClient } from "react-query";

type ImageFile = File | null;

async function uploadAvatar(file: ImageFile): Promise<void> {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://44.195.129.81/users/avatar", {
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