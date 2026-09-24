"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/assets/book.ico';

const Navbar = () => {
  const pathname = usePathname();

  // Helper function to dynamically assign classes based on current path
  const getLinkClasses = (path: string) => {
    return pathname === path
      ? "border border-[#23BE0A] text-[#23BE0A] font-semibold rounded-lg px-4 py-2 hover:bg-[#23BE0A] hover:text-white transition-colors"
      : "text-gray-600 hover:text-gray-900 font-medium px-4 py-2";
  };

  const links = (
    <>
      <li>
        <Link href="/" className={getLinkClasses('/')}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/listed-books" className={getLinkClasses('/listed-books')}>
          Listed Books
        </Link>
      </li>
      <li>
        <Link href="/pages-to-read" className={getLinkClasses('/pages-to-read')}>
          Pages to Read
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 px-4 md:px-8 py-3">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-2"
          >
            {links}
          </ul>
        </div>

        {/* Brand / Logo */}
        <Link href="/" className="flex gap-2 items-center text-xl font-bold text-gray-900 cursor-pointer">
          <Image src={Logo} alt="Book Vibe Logo" width={28} height={28} className="object-contain" />
          <span>Book Vibe</span>
        </Link>
      </div>

      {/* Navbar Center (Desktop Links) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 items-center">
          {links}
        </ul>
      </div>

      {/* Navbar End (Action Buttons) */}
      <div className="navbar-end gap-3">
        <button className="btn bg-[#23BE0A] hover:bg-[#1f9d09] text-white border-none font-semibold px-6 rounded-lg normal-case text-base">
          Sign In
        </button>
        <button className="btn bg-[#59C6D2] hover:bg-[#47b2bd] text-white border-none font-semibold px-6 rounded-lg normal-case text-base">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;