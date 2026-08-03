import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const client = axios.create({
  baseURL: `${API_URL}/api/books`,
});

export function getBooks() {
  return client.get("").then((res) => res.data);
}

export function createBook(book) {
  return client.post("", book).then((res) => res.data);
}

export function updateBook(id, book) {
  return client.put(`/${id}`, book).then((res) => res.data);
}

export function deleteBook(id) {
  return client.delete(`/${id}`);
}
