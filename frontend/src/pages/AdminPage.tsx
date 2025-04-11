import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { Movie } from '../types/Movie';
import { deleteMovie, fetchMovies } from '../api/MovieAPI';
import './AdminPage.css';
import NewMovieForm from '../components/NewMovieForm';
import EditMovieForm from '../components/EditMovieForm';
import Navbar from '../components/NavBar';

function AdminPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(pageSize, pageNum);
        setMovies(data.movies);
        setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [pageSize, pageNum]);

  const handleDelete = async (showId: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this movie?'
    );
    if (!confirmDelete) return;

    try {
      await deleteMovie(showId);
      setMovies(movies.filter((m) => m.showId !== showId));
    } catch (error) {
      alert(`Failed to delete movie due to ${error}. Please try again.`);
    }
  };

  if (loading) return <p>Loading admin...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="admin-page container-fluid py-4">
      <Navbar
        onSearchChange={() => {}}
        homePageBool={false}
        showSearch={false}
        setShowSearch={() => {}}
        searchInput=""
        setSearchInput={() => {}}
      />

      <div className="d-flex justify-content-end mb-3">
        {!showForm && (
          <button
            className="btn btn-outline-light me-2"
            onClick={() => setShowForm(true)}
          >
            Add Movie/TV Show
          </button>
        )}
      </div>

      {showForm && (
        <NewMovieForm
          onSuccess={() => {
            setShowForm(false);
            fetchMovies(pageSize, pageNum).then((data) =>
              setMovies(data.movies)
            );
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingMovie && (
        <EditMovieForm
          movie={editingMovie}
          onSuccess={() => {
            setEditingMovie(null);
            fetchMovies(pageSize, pageNum).then((data) =>
              setMovies(data.movies)
            );
          }}
          onCancel={() => setEditingMovie(null)}
        />
      )}

      <div className="card bg-dark text-light border-secondary mb-4">
        <div
          className="card-header text-center text-white"
          style={{
            fontSize: '2.5rem', // Big bold headline (adjust up if needed)
            fontWeight: '700', // Very bold
            lineHeight: '1.1', // Tight line height
            wordWrap: 'break-word',
          }}
        >
          Movie/TV Show Information
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-dark table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Director</th>
                  <th>Cast</th>
                  <th>Country</th>
                  <th>Release Year</th>
                  <th>Rating</th>
                  <th>Duration</th>
                  <th>Description</th>
                  <th>Genre</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {movies.map((m) => (
                  <tr key={m.showId}>
                    <td>{m.showId}</td>
                    <td>{m.type}</td>
                    <td>{m.title}</td>
                    <td>{m.director}</td>
                    <td>{m.cast}</td>
                    <td>{m.country}</td>
                    <td>{m.releaseYear}</td>
                    <td>{m.rating}</td>
                    <td>{m.duration}</td>
                    <td>{m.description}</td>
                    <td>{m.genre}</td>
                    <td>
                      <button
                        className="btn btn-outline-light me-3 mb-2"
                        onClick={() => {
                          setEditingMovie(m);
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'auto',
                          });
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger mb-2"
                        onClick={() => handleDelete(m.showId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </div>
  );
}

export default AdminPage;
