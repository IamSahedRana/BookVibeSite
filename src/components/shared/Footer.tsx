import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1313130D] text-[#131313] mt-20 pt-16 pb-8 border-t border-[#1313131A]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Tagline */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#131313]">
              Book Vibe
            </h2>
            <p className="text-[#131313B3] text-sm leading-relaxed">
              Discover, organize, and track your favorite reading adventures all in one place. Your ultimate personalized bookshelf experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#131313]">Quick Links</h3>
            <ul className="space-y-2 text-[#131313B3] text-sm">
              <li>
                <Link href="/" className="hover:text-[#23BE0A] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/listed-books" className="hover:text-[#23BE0A] transition-colors">
                  Listed Books
                </Link>
              </li>
              <li>
                <Link href="/pages-to-read" className="hover:text-[#23BE0A] transition-colors">
                  Pages to Read
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Genres */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#131313]">Featured Genres</h3>
            <ul className="space-y-2 text-[#131313B3] text-sm">
              <li className="hover:text-[#23BE0A] transition-colors cursor-pointer">Classic Literature</li>
              <li className="hover:text-[#23BE0A] transition-colors cursor-pointer">Young Adult</li>
              <li className="hover:text-[#23BE0A] transition-colors cursor-pointer">Identity & Society</li>
              <li className="hover:text-[#23BE0A] transition-colors cursor-pointer">Sci-Fi & Fantasy</li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#131313]">Newsletter</h3>
            <p className="text-[#131313B3] text-sm mb-3">
              Subscribe to get the latest recommendations and updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-sm border border-[#13131333] rounded-lg w-full focus:outline-none focus:border-[#23BE0A]"
              />
              <button className="btn btn-sm bg-[#23BE0A] hover:bg-[#1fa109] text-white border-none rounded-lg px-4 normal-case">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal */}
        <div className="border-t border-[#1313131A] pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-[#13131380]">
          <p>© {new Date().getFullYear()} Book Vibe. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-[#23BE0A] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#23BE0A] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}