import React, { useState } from 'react';
import axios from 'axios';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`/api/books/search?query=${encodeURIComponent(query)}`);
      if (response.data.success) {
        setBooks(response.data.books);
      } else {
        setError('No books found.');
        setBooks([]);
      }
    } catch (err) {
      setError('Error fetching books.');
      setBooks([]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <input
        type="text"
        placeholder="Search books by title, author, genre..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        style={{
          width: '100%',
          padding: 10,
          fontSize: 16,
          border: '1px solid #ccc',
          borderRadius: 5,
        }}
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        style={{
          marginTop: 10,
          padding: '8px 16px',
          fontSize: 16,
          backgroundColor: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer'
        }}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}

      <ul style={{ marginTop: 20, paddingLeft: 0, listStyle: 'none' }}>
        {books.map((book) => (
          <li key={book._id} style={{ marginBottom: 15, borderBottom: '1px solid #eee', paddingBottom: 10 }}>
            <strong>{book.title}</strong> <br />
            Author: {book.author?.name} <br />
            Genre: {book.genre?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookSearch;
