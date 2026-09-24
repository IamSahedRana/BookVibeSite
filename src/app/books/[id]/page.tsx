import React from 'react';
import Image from 'next/image';
import { promises as fs } from 'fs'; // 1. Import fs to read the file
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ActionButtons from './ActionButtons';
import type { BookType } from '@/types/books.type';

interface PageProps {
  params: Promise<{
    id: string; 
  }>;
}

const getBooks = async (): Promise<BookType[] | null> => {
  try {
    // 2. Read the file directly from the public folder (Works flawlessly on Vercel)
    const file = await fs.readFile(process.cwd() + '/public/booksData.json', 'utf8');
    return JSON.parse(file);
  } catch (error) {
    console.error("Data load error:", error);
    return null; 
  }
};

export default async function BookDetailPage({ params }: PageProps) {
  const { id } = await params;
  const bookData = await getBooks();

  if (!bookData) {
    return (
      <div className="flex flex-col justify-center items-center h-[50vh]">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Error Loading Data</h2>
        <p className="text-gray-500">Failed to read booksData.json.</p>
      </div>
    );
  }

  const book = bookData.find((b) => String(b.bookId) === String(id));


  if (!book) {
    return (
      <div className="flex flex-col justify-center items-center h-[50vh]">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Book not found.</h2>
        <p className="text-gray-500">Could not find a book with ID: <span className="font-bold">{id}</span></p>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12 max-w-6xl">
      {/* ToastContainer required to display the notifications */}
      <ToastContainer position="bottom-right" autoClose={3000} />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Column: Image Container */}
        <div className="lg:w-1/2 bg-[#1313130D] rounded-2xl flex justify-center items-center p-12 min-h-[500px] lg:min-h-[600px]">
          <Image
            src={book.image}
            alt={book.bookName}
            width={400}
            height={550}
            className="object-contain drop-shadow-2xl max-h-[550px] w-auto"
            priority
          />
        </div>

        {/* Right Column: Book Details */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-bold font-serif text-[#131313] mb-4">
            {book.bookName}
          </h1>
          <p className="text-lg font-medium text-[#131313CC] mb-5">
            By : {book.author}
          </p>

          <div className="border-t border-[#13131326] w-full my-4"></div>
          
          <p className="text-lg font-medium text-[#131313CC]">{book.category}</p>
          
          <div className="border-t border-[#13131326] w-full my-4"></div>

          {/* Review Text */}
          <p className="text-[#131313B3] leading-relaxed mb-8 text-base">
            <strong className="text-[#131313]">Review : </strong> {book.review}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-4 mb-6">
            <strong className="text-[#131313]">Tag</strong>
            <div className="flex gap-3 flex-wrap">
              {book.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#23BE0A0D] text-[#23BE0A] font-bold text-sm px-4 py-1.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-[#13131326] w-full mb-6"></div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-[160px_1fr] gap-y-3 mb-8 text-[#131313B3]">
            <p>Number of Pages:</p>
            <p className="font-bold text-[#131313]">{book.totalPages}</p>

            <p>Publisher:</p>
            <p className="font-bold text-[#131313]">{book.publisher}</p>

            <p>Year of Publishing:</p>
            <p className="font-bold text-[#131313]">{book.yearOfPublishing}</p>

            <p>Rating:</p>
            <p className="font-bold text-[#131313]">{book.rating}</p>
          </div>

          {/* Replaced static buttons with interactive Client Component */}
          <ActionButtons bookId={book.bookId} />
        </div>
      </div>
    </section>
  );
}