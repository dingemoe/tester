'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [page, setPage] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContacts = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.fiken.no/api/v2/companies/telemeny-as/contacts?page=${page}&pageSize=100`,
        {
          headers: {
            Authorization: 'Bearer 5638707890.qzsBpgv1UC0ov5mEOY3f19l2bR5l7uip',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Error fetching contacts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Fiken Contact Fetcher
      </h1>
      <form onSubmit={fetchContacts} className="mb-6">
        <div className="mb-4">
          <label
            htmlFor="page"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Page Number:
          </label>
          <input
            type="number"
            id="page"
            value={page}
            onChange={(e) => setPage(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Fetch Contacts'}
        </button>
      </form>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div>
        <h2 className="text-xl font-bold mb-2">Contacts:</h2>
        {contacts.length > 0 ? (
          <ul className="list-disc pl-5">
            {contacts.map((contact, index) => (
              <li key={index} className="mb-1">
                {contact.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No contacts fetched yet.</p>
        )}
      </div>
    </div>
  );
}
