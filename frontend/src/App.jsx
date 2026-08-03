import { useEffect, useState } from "react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import { getBooks, createBook, updateBook, deleteBook } from "./services/bookApi";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBook, setEditingBook] = useState(null);

  async function loadBooks() {
    setLoading(true);
    setError(null);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError(err.message ?? "Failed to load books.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  async function handleSubmit(bookData) {
    setError(null);
    try {
      if (editingBook) {
        await updateBook(editingBook.id, bookData);
        setEditingBook(null);
      } else {
        await createBook(bookData);
      }
      await loadBooks();
    } catch (err) {
      setError(err.response?.data?.detail ?? err.message ?? "Failed to save book.");
    }
  }

  async function handleDelete(id) {
    setError(null);
    try {
      await deleteBook(id);
      await loadBooks();
    } catch (err) {
      setError(err.response?.data?.detail ?? err.message ?? "Failed to delete book.");
    }
  }

  return (
    <div className="app">
      <h1>Library Management System</h1>

      {error && <div className="error">{error}</div>}

      <BookForm
        editingBook={editingBook}
        onSubmit={handleSubmit}
        onCancel={() => setEditingBook(null)}
      />

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <BookList books={books} onEdit={setEditingBook} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default App;
