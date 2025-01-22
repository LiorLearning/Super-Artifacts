import axios from 'axios';

export const fetchGameState = async (sessionId: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/super_artifacts/session/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game state:', error);
    return null;
  }
};