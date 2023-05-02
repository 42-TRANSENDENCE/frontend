import { useFetcher } from './fetcher';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useContext } from "react";
import { SocketContext } from "../contexts/ClientSocket";

export function useLogout() {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const clientSocket = useContext(SocketContext);

  const logout = async () => {
    await fetcher('/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).then((response) => {
      if (response.status === 200) {
        toast.success('Logged out');
        clientSocket.disconnect();
        navigate('/');
      } else {
        throw new Error('Unexpected response status code');
      }
    })
  }
  return logout;
}

export function useUserDelete() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const clientSocket = useContext(SocketContext);

  const userDelete = async () => {
    await fetcher('/users', {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(response => {
        if (response.status === 200) {
          clientSocket.disconnect();
          navigate('/');
          toast.success('User deleted successfully.');
        } else {
          toast.error('User not deleted.');
        }
      })
  }
  return userDelete;
}

export const isValidNickname = (nickname: string): boolean => {
  const consecutivePeriodsRegex = /\.{2,}/;
  const invalidCharactersRegex = /[^\w-.']/;

  // lowercase the nickname
  nickname = nickname.toLowerCase();

  // check for consecutive periods and invalid characters
  if (
    consecutivePeriodsRegex.test(nickname) ||
    invalidCharactersRegex.test(nickname)
  ) {
    return false;
  }

  // check the length
  if (nickname.length > 12) {
    return false;
  }

  return true;
}
