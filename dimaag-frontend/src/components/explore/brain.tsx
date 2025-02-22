import { useAxiosClient } from '@/config/axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Brain() {
  const { username } = useParams();
  const api = useAxiosClient();
  useEffect(() => {
    (async () => {
      const res = await api.get(`/permission/${username}`);
      console.log('res', res.data);
    })();
  }, [username]);
  return <div>userBrain</div>;
}
