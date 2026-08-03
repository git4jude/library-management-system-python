import { useEffect, useState } from "react";

const emptyBook = {
  title: "",
  author: "",
  isbn: "",
  genre: "",
  published_year: "",
  available_copies: 1,
  is_available: true,
};

function BookForm({ editingBook, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyBook);

  useEffect(() => {
    if (editingBook) {
      setForm({
        title: editingBook.title,
        author: editingBook.author,
        isbn: editingBook.isbn,
        genre: editingBook.genre ?? "",
        published_year: editingBook.published_year ?? "",
        available_copies: editingBook.available_copies,
        is_available: editingBook.is_available,
      });
    } else {
      setForm(emptyBook);
    }
  }, [editingBook]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      title: form.title.trim(),
      author: form.author.trim(),
      isbn: form.isbn.trim(),
      genre: form.genre.trim() || null,
      published_year: form.published_year === "" ? null : Number(form.published_year),
      available_copies: Number(form.available_copies),
      is_available: form.is_available,
    });
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{editingBook ? "Edit Book" : "Add Book"}</h2>

      <div className="form-row">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          value={form.author}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="isbn">ISBN</label>
        <input
          id="isbn"
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="genre">Genre</label>
        <input
          id="genre"
          name="genre"
          value={form.genre}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <label htmlFor="published_year">Published Year</label>
        <input
          id="published_year"
          name="published_year"
          type="number"
          min="0"
          max="9999"
          value={form.published_year}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <label htmlFor="available_copies">Available Copies</label>
        <input
          id="available_copies"
          name="available_copies"
          type="number"
          min="0"
          value={form.available_copies}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row form-row-checkbox">
        <label htmlFor="is_available">
          <input
            id="is_available"
            name="is_available"
            type="checkbox"
            checked={form.is_available}
            onChange={handleChange}
          />
          Available
        </label>
      </div>

      <div className="form-actions">
        <button type="submit">{editingBook ? "Save Changes" : "Add Book"}</button>
        {editingBook && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default BookForm;
