import { useFetcher } from './fetcher';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { ClientSocket } from '../contexts/ClientSocket';

export function useLogout() {
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const logout = async () => {
    await fetcher('/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).then((response) => {
      if (response.status === 200) {
        toast.success('Logged out');
        ClientSocket.disconnect();
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

  const userDelete = async () => {
    await fetcher('/users', {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(response => {
        if (response.status === 200) {
          ClientSocket.disconnect();
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
