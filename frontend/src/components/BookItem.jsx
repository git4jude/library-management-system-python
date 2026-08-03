function BookItem({ book, onEdit, onDelete }) {
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.isbn}</td>
      <td>{book.genre ?? "—"}</td>
      <td>{book.published_year ?? "—"}</td>
      <td>{book.available_copies}</td>
      <td className="actions">
        <button onClick={() => onEdit(book)}>Edit</button>
        <button className="btn-danger" onClick={() => onDelete(book.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default BookItem;
