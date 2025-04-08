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
    return data as Movie[];
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchGenre = async (genre: string): Promise<Movie[]> => {
  try {
    const response = await fetch(`${api_URL}/genre_search?genres=${genre}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data: Movie[] = await response.json();
    return data as Movie[];
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchSingle = async (showId: string): Promise<Movie> => {
  try {
    const response = await fetch(`${api_URL}/${showId}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch movie');
    }
    const data: Movie = await response.json();
    return data as Movie;
  } catch (error) {
    console.error('Error fetching movie:', error);
    throw error;
  }
};

export const getPosterUrl = (title: string) => {
  return `https://moviepostersgroup110.blob.core.windows.net/movieposters/${encodeURIComponent(title)}.jpg`;
};

export const getRecommendations = async (showId: string) => {
  try {
    const response = await fetch(`${api_URL}/recommender1?showId=${showId}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie:', error);
    throw error;
  }
};
