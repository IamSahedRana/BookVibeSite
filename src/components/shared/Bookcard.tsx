import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define the Book Data Type interface
export interface BookType {
  bookId: number;
  bookName: string;
  author: string;
  image: string;
  review: string;
  totalPages: number;
  rating: number;
  category: string;
  tags: string[];
  publisher: string;
  yearOfPublishing: number;
}

interface BookCardProps {
  book: BookType;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { bookId, bookName, author, image, category, rating, tags } = book;

  return (
    <Link href={`/books/${bookId}`}>
      <div className="bg-white border border-[#13131326] rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
        <div>
          {/* Book Cover Container */}
          <div className="bg-[#F3F3F3] rounded-2xl py-8 px-4 flex justify-center items-center h-[230px] mb-6">
            <div className="relative w-[134px] h-[166px] drop-shadow-md">
              <Image
                src={image}
                alt={bookName}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 134px"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {tags?.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#23BE0A0D] text-[#23BE0A] font-semibold text-sm px-4 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Book Title */}
          <h3 className="text-2xl font-bold font-serif text-[#131313] mb-3 line-clamp-1">
            {bookName}
          </h3>

          {/* Author */}
          <p className="text-gray-600 font-medium text-base mb-4">
            By : {author}
          </p>
        </div>

        <div>
          {/* Dashed Separator Line */}
          <div className="border-t-2 border-dashed border-[#13131326] my-4" />

          {/* Footer Info: Category & Rating */}
          <div className="flex items-center justify-between text-[#131313cc] font-medium text-base">
            <span>{category}</span>
            <div className="flex items-center gap-2">
              <span>{rating.toFixed(2)}</span>
              {/* Star Outline Icon matching design */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;