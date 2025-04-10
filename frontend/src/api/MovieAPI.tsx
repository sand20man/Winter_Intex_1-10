import { API_URL } from '../config';
import { Movie } from '../types/Movie';

const api_URL = `${API_URL}/api`;

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
    console.error('Error fetching movies for search:', error);
    throw error;
  }
};

export const fetchGenre = async (
  genre: string,
  skip: number = 0
): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${api_URL}/Movie/genre_search?genres=${genre}&skip=${skip}&take=20`,
      {
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data: Movie[] = await response.json();
    return data; // Accessing the 'Movies' array inside the result object
  } catch (error) {
    console.error('Error fetching genre-based movies:', error);
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
    console.error('Error fetching movies in all genres:', error);
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
    console.error('Error fetching single movie:', error);
    throw error;
  }
};

export const getPosterUrl = (title: string) => {
  const sanitizedTitle = title
    .replace(/[^a-z0-9 ]/gi, '') // Allow only letters, numbers, and spaces
    .trim(); // Trim leading/trailing spaces only

  const fileName = `${sanitizedTitle}.jpg`;
  return `https://moviepostersgroup110.blob.core.windows.net/movieposters/${encodeURIComponent(fileName)}`;
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
      throw new Error('Failed to fetch new recommendations');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie recommendations:', error);
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
    console.error('Error fetching user movie recommendation:', error);
    throw error;
  }
};

export const getContentRecommendations = async (showId: string) => {
  try {
    const response = await fetch(
      `${api_URL}/Movie/ContentRecommender?showId=${showId}`,
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
    console.error('Error fetching movie content-based recommendations:', error);
    throw error;
  }
};

export const fetchCurrentUser = async () => {
  try {
    const pingRes = await fetch(`${API_URL}/pingauth`, {
      method: 'GET',
      credentials: 'include',
    });

    const contentType = pingRes.headers.get('content-type');
    if (!pingRes.ok || !contentType?.includes('application/json')) {
      const errorText = await pingRes.text();
      console.error('PingAuth Fetch failed (non-JSON):', errorText);
      return {
        name: 'Unknown',
        userId: 0,
      };
    }

    const pingData = await pingRes.json();
    const email = pingData.email;
    console.log(`Email: ${email}`);

    // Step 2 - Fetch user ID
    const encodedEmail = encodeURIComponent(email);
    const userRes = await fetch(
      `${API_URL}/get-user-id?email=${encodedEmail}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    if (!userRes.ok) {
      const errorMsg = await userRes.text();
      console.error('get-user-id failed:', errorMsg);
      return { name: 'Unknown', userId: 0 };
    }

    const userData = await userRes.json();
    console.log(`UserData:`, userData);

    if (typeof userData === 'string') {
      return { name: 'Unknown', userId: 0 };
    }

    return userData;
  } catch (err) {
    console.error('Error in fetchCurrentUser:', err);
    return { name: 'Unknown', userId: 0 };
  }
};

export const submitUserRating = async (
  showId: string,
  userId: number,
  rating: number
) => {
  const response = await fetch(`${api_URL}/Movie/rating`, {
    method: 'POST', // or 'PUT' depending on your backend
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // if you're using cookie auth
    body: JSON.stringify({ showId, userId, rating }),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit rating: ${response.status}`);
  }
};

export const registerUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data; // Throw to be caught by the component
  }

  return data;
};
