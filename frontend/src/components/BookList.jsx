import BookItem from "./BookItem";

function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="empty">No books yet. Add one using the form.</p>;
  }

  return (
    <table className="book-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>ISBN</th>
          <th>Genre</th>
          <th>Published Year</th>
          <th>Available Copies</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <BookItem key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}

export default BookList;
