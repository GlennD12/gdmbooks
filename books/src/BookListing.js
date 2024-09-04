import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BookListing = () => {
  const [books, setBooks] = useState([]);
  const [sortBy, setSortBy] = useState("publishedDate");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookToDelete, setBookToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "publishedDate") {
        return new Date(a.publishedDate) - new Date(b.publishedDate);
      } else if (sortBy === "genre") {
        return a.genre.localeCompare(b.genre);
      } else {
        return 0;
      }
    });

  const handleDelete = (book) => {
    setBookToDelete(book);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    if (bookToDelete) {
      fetch(`http://localhost:3000/books/${bookToDelete.id}`, {
        method: "DELETE",
      })
        .then(() => {
          setBooks((prev) => prev.filter((book) => book.id !== bookToDelete.id));
          setShowDeleteConfirmation(false);
          setBookToDelete(null);
        })
        .catch((error) => console.error("Error deleting book:", error));
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
    setBookToDelete(null);
  };

  return (
    <div className="container">
      <div className="input-group mb-3">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control"
        />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="btn btn-outline-dark"
        >
          <option value="publishedDate" className="dropdown-item">Sort by Published Date</option>
          <option value="genre" className="dropdown-item">Sort by Genre</option>
        </select>
        <Link to="/add" className="btn btn-dark">Add New Book</Link>
      </div>
      <div className="row">
        {filteredBooks.map((book) => (
          <div className="col-md-4" key={book.id}>
            <img
                src={book.coverImage}
                className="card-img-top"
                alt="Book Cover"
              />
            <div className="card mb-4 bg-dark text-light border-light">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">ISBN: {book.isbn}</p>
                <p className="card-text">
                  Published Date: {new Date(book.publishedDate).toDateString()}
                </p>
                <p className="card-text">Genre: {book.genre}</p>


                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <Link to={`/book/${book.id}`} className="btn btn-outline-secondary">
                    View Details
                    </Link>
                    <Link to={`/update/${book.id}`} className="btn btn-outline-secondary">
                    Edit
                    </Link>
                    <button className="btn btn-outline-secondary" onClick={() => handleDelete(book)}>
                    Delete
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showDeleteConfirmation && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this book?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleDeleteCancel}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookListing;
