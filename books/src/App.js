import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookListing from './BookListing';
import AddBook from './AddBook';
import UpdateBook from './UpdateBook';
import BookDetail from './BookDetail';
import Footer from './Footer';
import Header from './Header';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<BookListing />} />
          <Route path="/" element={<Footer />} /> 
          <Route path="/add" element={<AddBook />} />
          <Route path="/update/:id" element={<UpdateBook />} />
          <Route path="/book/:id" element={<BookDetail />} /> 
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

