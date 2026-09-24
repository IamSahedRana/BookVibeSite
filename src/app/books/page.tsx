import React from 'react';
import BookCard from '../../components/shared/Bookcard';
import { BookType } from '@/types/books.type';


const getBooks = async (): Promise<BookType[]> => {
  const response = await fetch('http://localhost:3000/booksData.json', {
    cache: 'no-store',
  });
  return await response.json();
};

const Books = async () => {
  const booksData = await getBooks();

  return (
    <section className="container mx-auto py-12 px-4">
      {/* Title */}
      <h2 className="text-4xl font-bold font-serif text-center text-[#131313] mb-10">
        Books
      </h2>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booksData.map((book: BookType) => (
          <BookCard key={book.bookId} book={book} />
        ))}
      </div>
    </section>
  );
};

export default Books;