import { contentType } from '@/types/content';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

async function createContent(contentData: contentType) {
  const { getToken } = useAuth();
  try {
    const token = await getToken();
    console.log('inside CREATE CONTENT', contentData);
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}content`,
      {
        contentData,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    console.log('response', response);
    return response;
  } catch (error: unknown) {
    console.error('Error creating content:', error);
    throw error;
  }
}
export default createContent;
