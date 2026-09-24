"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { BookType } from "@/types/books.type";

export default function ListedBooksPage() {
  const [activeTab, setActiveTab] = useState<"read" | "wishlist">("read");
  const [readBooks, setReadBooks] = useState<BookType[]>([]);
  const [wishlistBooks, setWishlistBooks] = useState<BookType[]>([]);
  const [displayBooks, setDisplayBooks] = useState<BookType[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>("");

// Fetch data and match with Local Storage on mount
  useEffect(() => {
    const fetchAndFilterBooks = async () => {
      try {
        // Use relative path to avoid localhost port mismatch issues
        const response = await fetch("/booksData.json");
        const allBooks: BookType[] = await response.json();

        // 1. Get saved IDs from local storage
        // 2. Use .map(String) to force EVERY ID to be a string so they match perfectly
        const readListIds = JSON.parse(localStorage.getItem("read-list") || "[]").map(String);
        const wishListIds = JSON.parse(localStorage.getItem("wish-list") || "[]").map(String);

        // Convert the JSON book.bookId to a string before checking .includes()
        const filteredRead = allBooks.filter((book) => readListIds.includes(String(book.bookId)));
        const filteredWishlist = allBooks.filter((book) => wishListIds.includes(String(book.bookId)));

        setReadBooks(filteredRead);
        setWishlistBooks(filteredWishlist);
        setDisplayBooks(filteredRead); // Set initial display to Read tab
      } catch (error) {
        console.error("Failed to load books:", error);
      }
    };

    fetchAndFilterBooks();
  }, []);

  // Handle Tab Switch
  const handleTabChange = (tab: "read" | "wishlist") => {
    setActiveTab(tab);
    const booksToShow = tab === "read" ? readBooks : wishlistBooks;
    
    // Maintain current sort order when switching tabs
    if (sortCriteria) {
      sortData(sortCriteria, booksToShow);
    } else {
      setDisplayBooks(booksToShow);
    }
  };

  // Handle Sorting logic
  const handleSort = (criteria: string) => {
    setSortCriteria(criteria);
    const currentList = activeTab === "read" ? [...readBooks] : [...wishlistBooks];
    sortData(criteria, currentList);
    toast.success(`Sorted by ${criteria.replace("-", " ")}!`, {
        position: "bottom-right",
        autoClose: 2000,
    });
  };

  const sortData = (criteria: string, listToSort: BookType[]) => {
    const sorted = listToSort.sort((a, b) => {
      if (criteria === "Rating") return b.rating - a.rating;
      if (criteria === "Number of pages") return b.totalPages - a.totalPages;
      if (criteria === "Publisher year") return b.yearOfPublishing - a.yearOfPublishing;
      return 0;
    });
    setDisplayBooks(sorted);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <ToastContainer />
      
      {/* Page Header */}
      <div className="bg-[#1313130D] rounded-3xl py-8 mb-8">
        <h1 className="text-3xl font-bold text-center text-[#131313]">Books</h1>
      </div>

      {/* Sort Dropdown Component */}
      <div className="flex justify-center mb-12">
        <details className="dropdown">
          <summary className="m-1 btn bg-[#23BE0A] hover:bg-[#1fa109] text-white border-none px-6 font-semibold rounded-lg normal-case">
            Sort By
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 text-[#131313CC] font-medium">
            <li><button onClick={() => handleSort("Rating")}>Rating</button></li>
            <li><button onClick={() => handleSort("Number of pages")}>Number of pages</button></li>
            <li><button onClick={() => handleSort("Publisher year")}>Publisher year</button></li>
          </ul>
        </details>
      </div>

      {/* DaisyUI Tabs */}
      <div role="tablist" className="tabs tabs-lifted justify-start border-b border-gray-200 mb-8">
        <button 
          role="tab" 
          className={`tab tab-lg ${activeTab === "read" ? "tab-active font-bold text-[#131313] border-b-0" : "text-[#13131380]"}`}
          onClick={() => handleTabChange("read")}
        >
          Read Books
        </button>
        <button 
          role="tab" 
          className={`tab tab-lg ${activeTab === "wishlist" ? "tab-active font-bold text-[#131313] border-b-0" : "text-[#13131380]"}`}
          onClick={() => handleTabChange("wishlist")}
        >
          Wishlist Books
        </button>
      </div>

      {/* Book List Rendering */}
      <div className="flex flex-col gap-6">
        {displayBooks.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No books found in this list.</p>
        ) : (
          displayBooks.map((book) => (
            <div key={book.bookId} className="flex flex-col md:flex-row gap-6 p-6 border border-gray-200 rounded-2xl">
              
              {/* Image Container */}
              <div className="bg-[#1313130D] rounded-2xl flex justify-center items-center p-8 w-full md:w-64 shrink-0">
                <Image
                  src={book.image}
                  alt={book.bookName}
                  width={130}
                  height={190}
                  className="object-contain drop-shadow-xl"
                />
              </div>

              {/* Details Container */}
              <div className="flex flex-col justify-center w-full">
                <h2 className="text-2xl font-bold font-serif text-[#131313] mb-3">{book.bookName}</h2>
                <p className="font-medium text-[#131313CC] mb-4">By : {book.author}</p>

                {/* Tags and Year */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex gap-3">
                    <strong className="text-[#131313]">Tag</strong>
                    {book.tags.map((tag, idx) => (
                      <span key={idx} className="bg-[#23BE0A0D] text-[#23BE0A] font-medium text-sm px-4 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[#131313CC]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    Year of Publishing: {book.yearOfPublishing}
                  </div>
                </div>

                {/* Publisher and Pages */}
                <div className="flex flex-wrap items-center gap-6 mb-4 text-[#13131399]">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Publisher: {book.publisher}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    Page {book.totalPages}
                  </div>
                </div>

                <div className="border-t border-gray-200 w-full mb-4"></div>

                {/* Bottom Row: Category, Rating, Link */}
                <div className="flex flex-wrap items-center gap-4">
                  <span className="bg-[#328EFF26] text-[#328EFF] px-5 py-2 rounded-full text-sm font-medium">
                    Category: {book.category}
                  </span>
                  <span className="bg-[#FFAC3326] text-[#FFAC33] px-5 py-2 rounded-full text-sm font-medium">
                    Rating: {book.rating}
                  </span>
                  <Link href={`/books/${book.bookId}`}>
                    <button className="bg-[#23BE0A] hover:bg-[#1fa109] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}