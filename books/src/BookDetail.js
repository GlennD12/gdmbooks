import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Footer';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/books/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Error fetching book:", error));
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="container book-detail">
      <h2 className="mb-4">Book Details</h2>
      <div className="card">
        <img
          src={book.coverImage}
          className="card-img-top"
          alt="Book Cover"
        />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">Author: {book.author}</p>
          <p className="card-text">ISBN: {book.isbn}</p>
          <p className="card-text">
            Published Date: {new Date(book.publishedDate).toDateString()}
          </p>
          <p className="card-text">Genre: {book.genre}</p>
          <Link to="/" className="btn btn-dark">Back to List</Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
