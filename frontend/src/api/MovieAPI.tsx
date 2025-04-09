import { Movie } from '../types/Movie';

const api_URL = 'https://localhost:5000/api';

export interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

export const fetchMovies = async (
  pageSize: number,
  pageNum: number
): Promise<FetchMoviesResponse> => {
  try {
    const response = await fetch(
      `${api_URL}/Movie/AllMovies?pageSize=${pageSize}&pageNum=${pageNum}`,
      { method: 'GET', credentials: 'include' }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const updateMovie = async (
  showId: string,
  updatedMovie: Movie
): Promise<Movie> => {
  try {
    const response = await fetch(`${api_URL}/Movie/UpdateMovie/${showId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating movie: ', error);
    throw error;
  }
};

export const deleteMovie = async (showId: string): Promise<void> => {
  try {
    const response = await fetch(`${api_URL}/Movie/DeleteMovie/${showId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete movie');
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};

export const getNextShowId = async (): Promise<string> => {
  const response = await fetch(`${api_URL}/Movie/latestShowid`, {
    method: 'GET',
    credentials: 'include',
  });
  const lastId = await response.text(); // e.g. 's8806'

  const num = parseInt(lastId.slice(1)) + 1; // Get the number, increment
  return `s${num}`; // Return like 's8807'
};

export const addMovie = async (newMovie: Movie): Promise<Movie> => {
  try {
    const response = await fetch(`${api_URL}/Movie/AddMovie`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    });

    if (!response.ok) {
      throw new Error('Failed to add movie');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding movie:', error);
    throw error;
  }
};

export const fetchSearch = async (search: string | null): Promise<Movie[]> => {
  try {
    const response = await fetch(`${api_URL}/Movie/search?title=${search}`, {
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
    const response = await fetch(
      `${api_URL}/Movie/genre_search?genres=${genre}`,
      {
        credentials: 'include',
      }
    );

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

export const fetchAllGenres = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${api_URL}/Movie/get_genres`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data: string[] = await response.json();
    return data as string[];
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchSingle = async (showId: string): Promise<Movie> => {
  try {
    const response = await fetch(`${api_URL}/Movie/${showId}`, {
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
    const response = await fetch(
      `${api_URL}/Movie/recommender1?showId=${showId}`,
      {
        credentials: 'include',
      }
    );

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

export const getUserRecommendations = async (userId: number) => {
  try {
    const response = await fetch(
      `${api_URL}/Movie/recommender2?userId=${userId}`,
      {
        credentials: 'include',
      }
    );

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

export const getContentRecommendations = async (showId: string) => {
  try {
    const response = await fetch(
      `${api_URL}/ContentRecommender?showId=${showId}`,
      {
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch content recommendations');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie:', error);
    throw error;
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await fetch(`${api_URL}/Auth/me`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch current user: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
