import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedDate: "",
    genre: "",
    coverImage: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    })
      .then(() => navigate("/"))
      .catch((error) => console.error("Error adding book:", error));
  };

  return (
    <div className="container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="publishedDate">Published Date</label>
          <input
            type="date"
            id="publishedDate"
            name="publishedDate"
            value={book.publishedDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="coverImage">Book Cover Link:</label>
          <input
            type="text"
            id="coverImage"
            name="coverImage"
            value={book.coverImage}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />
        </div>
        <div className="btn-group" role="group" aria-label="Basic outlined example">
          <button type="submit" className="btn btn-outline-dark">Add Book</button>
          <Link to="/" className="btn btn-outline-dark">Back to List</Link>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
