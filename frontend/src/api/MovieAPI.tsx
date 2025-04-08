import { Movie } from '../types/Movie';

const api_URL = 'https://localhost:5000/api/Movie';

export const fetchSearch = async (search: string): Promise<Movie[]> => {
  try {
    const response = await fetch(`${api_URL}/search?title=${search}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data: Movie[] = await response.json();
    console.log('API Response:', data);
    return data as Movie[];
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
