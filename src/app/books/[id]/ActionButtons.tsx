"use client";
import React from "react";
import { toast } from "react-toastify";

interface ActionButtonsProps {
  bookId: number | string;
}

export default function ActionButtons({ bookId }: ActionButtonsProps) {
  // Handle adding to Read list
  const handleRead = () => {
    const readList = JSON.parse(localStorage.getItem("read-list") || "[]");

    if (readList.includes(bookId)) {
      toast.error("You have already read this book!");
      return;
    }

    readList.push(bookId);
    localStorage.setItem("read-list", JSON.stringify(readList));
    toast.success("Successfully added to Read list!");
  };

  // Handle adding to Wishlist
  const handleWishlist = () => {
    const readList = JSON.parse(localStorage.getItem("read-list") || "[]");
    const wishList = JSON.parse(localStorage.getItem("wish-list") || "[]");

    if (readList.includes(bookId)) {
      toast.warning("You have already read this book! Cannot add to Wishlist.");
      return;
    }

    if (wishList.includes(bookId)) {
      toast.error("This book is already in your Wishlist!");
      return;
    }

    wishList.push(bookId);
    localStorage.setItem("wish-list", JSON.stringify(wishList));
    toast.success("Successfully added to Wishlist!");
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={handleRead}
        className="btn bg-transparent border border-[#1313134D] text-[#131313] hover:bg-gray-100 font-bold px-7 py-3 h-auto rounded-lg normal-case"
      >
        Read
      </button>
      <button
        onClick={handleWishlist}
        className="btn bg-[#50B1C9] hover:bg-[#3d98ae] text-white border-none font-bold px-7 py-3 h-auto rounded-lg normal-case"
      >
        Wishlist
      </button>
    </div>
  );
}