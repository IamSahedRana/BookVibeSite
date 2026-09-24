# Book Vibe - Personal Bookshelf & Reading Tracker

**Book Vibe** is a modern, feature-rich web application designed for book lovers to explore, organize, and track their reading journey. Users can browse curated books, view detailed reviews, maintain personalized "Read" and "Wishlist" collections, and visualize their reading progress through an interactive custom chart.

The goal of this project was to build a full-stack Next.js application with TypeScript, focusing on client/server component architecture, state management using local storage, dynamic routing, custom SVG data visualizations, and modern UI components.

## 🌐 Live Demo

🔗 **Live Deployment:**  
https://book-vibe-site.vercel.app/

🔗 **GitHub Repository:**  
https://github.com/IamSahedRana/BookVibeSite

---

# Features

- **Dynamic Navigation:** Responsive navigation bar with active route indicators and quick actions.
- **Hero Banner:** Eye-catching introductory banner highlighting featured books and calls to action.
- **Book Catalog:** Interactive grid displaying book cards with ratings, tags, authors, and categories.
- **Dynamic Book Detail Pages:** Dedicated view (`/books/[id]`) with in-depth reviews, publishing metadata, and interactive tracking buttons.
- **Local Storage Management:** Persistent reading history allowing users to add books to "Read" or "Wishlist" categories.
- **Tabbed Collection View:** Filterable "Listed Books" page with tab switching and sorting capabilities (by Rating, Number of Pages, or Publisher Year).
- **Custom Recharts Visualizations:** Unique custom curved pyramid bar chart displaying total pages of read books.
- **Interactive Feedback:** Real-time toast notifications (using React Toastify) for book status updates and validation.
- **Fully Responsive Design:** Optimized layout for desktop, tablet, and mobile devices using Tailwind CSS and DaisyUI.

---

# Technologies Used

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & DaisyUI
- **Data Visualization:** Recharts
- **Notifications:** React Toastify
- **Storage:** Web Storage API (LocalStorage) & Node.js File System (`fs`)

---

# 📷 Project Sections

## 1. Navigation Bar

> Screenshot: `./Preview/navbar.png`

![Navbar](/src/Preview/navbar.png)

### Description

The navigation bar provides intuitive sitewide navigation with clean branding and quick access links.

Features include:

- **Book Vibe** brand logo
- Navigation links (`Home`, `Listed Books`, `Pages to Read`)
- User action buttons (`Sign In`, `Sign Up`)
- Active route highlighting using DaisyUI styling
- Fully responsive layout for all screen sizes

---

## 2. Hero Banner

> Screenshot: `./Preview/hero-section.png`

![Hero Banner](/src/Preview/hero-section.png)

### Description

The banner section serves as the primary visual hook on the homepage.

Features include:

- Clean typography with a bold call to action
- Prominent "Buy Now" / "Explore" action button
- High-quality visual imagery displaying featured books
- Rounded containers with subtle background contrast

---

## 3. Book Collection Section

> Screenshot: `./Preview/books-grid.png`

![Book Collection](/src/Preview/books-grid.png)

### Description

The main catalog displays all available books fetched dynamically from the dataset.

Features include:

- Grid layout displaying individual book cards
- Genre & category badges
- Rating displays with star icons
- Direct links to detail pages for each book
- Consistent image sizing with drop shadows

---

## 4. Book Detail Page (`/books/[id]`)

> Screenshot: `./Preview/book-detail.png`

![Book Detail Page](/src/Preview/book-detail.png)

### Description

A dedicated page for each book presenting complete details, publisher metadata, and interactive tracking.

Features include:

- Full book cover view with dynamic shadow styling
- Author, category, and review breakdown
- Tag lists and publishing metadata grid
- Interactive **"Read"** and **"Wishlist"** buttons
- Prevention of duplicate entries with real-time `React Toastify` alerts

Server-side file system (`fs`) integration is used to ensure seamless data fetching when deployed on Vercel.

---

## 5. Listed Books Page (`/listed-books`)

> Screenshot: `./Preview/listed-books.png`

![Listed Books Page](/src/Preview/listed-books.png)

### Description

The central hub where users manage their saved books.

Features include:

- **Tabbed Interface:** Toggle seamlessly between "Read Books" and "Wishlist Books"
- **Sort Dropdown:** Sort stored books by:
  - Rating
  - Number of Pages
  - Publisher Year
- Dynamic sync with LocalStorage
- Empty state indicator when no books are added

---

## 6. Pages to Read Section (`/pages-to-read`)

> Screenshot: `./Preview/pages-to-read.png`

![Pages to Read Chart](/src/Preview/pages-to-read.png)

### Description

A custom graphical representation of the user's reading accomplishment.

Features include:

- Custom SVG cubic Bezier curve implementation (`TriangleBar`) generating a curved pyramid shape
- Color-coded top labels displaying total page counts
- Hover tooltips powered by Recharts
- Dynamic data sync showing only books marked as "Read"

---

## 7. Footer

> Screenshot: `./Preview/footer.png`

![Footer](/src/Preview/footer.png)

### Description

A site-wide footer that anchors every page.

Features include:

- Brand overview & mission statement
- Quick navigation links
- Genre shortcuts
- Newsletter subscription input
- Copyright & legal terms

---

# 🎨 Design Highlights

- **Consistent Color Palette:** Green accents (`#23BE0A`), sky blue highlights, and soft dark neutral text.
- **DaisyUI Integration:** Utilizes DaisyUI tabs, buttons, and dropdown components for unified UI patterns.
- **Responsive Layout:** Flexbox and CSS Grid ensure fluid scaling across all devices.
- **Micro-Interactions:** Subtle hover states, smooth transitions, and feedback notifications.

---

# 📚 What I Practiced

Building this project helped strengthen key full-stack Next.js concepts:

- **App Router Architecture:** Working with file-based routing and dynamic routes (`[id]`).
- **Server vs. Client Components:** Managing client interactions (`"use client"`) vs. server-side data fetching.
- **Vercel Deployment Best Practices:** Replacing localhost HTTP endpoints with server-side `fs.readFile` and relative paths for client fetches.
- **TypeScript Typing:** Defining strict TypeScript interfaces for JSON entities, component props, and Recharts custom shapes.
- **State Persistence:** Managing client-side state synchronization with browser LocalStorage.
- **Custom Recharts Visualizations:** Creating custom SVG paths and text components within Recharts.

---

# 📂 Project Structure

```text
book-vibe-site/
│
├── public/
│   └── booksData.json          ← Main dataset
│
├── src/
│   ├── app/
│   │   ├── books/
│   │   │   └── [id]/
│   │   │       ├── ActionButtons.tsx   ← Interactive client buttons
│   │   │       └── page.tsx            ← Server component book details
│   │   ├── listed-books/
│   │   │   └── page.tsx                ← Tabbed list & sorting view
│   │   ├── pages-to-read/
│   │   │   └── page.tsx                ← Recharts custom pyramid chart
│   │   ├── globals.css
│   │   ├── layout.tsx                  ← Root layout with Navbar, Footer & ToastContainer
│   │   └── page.tsx                    ← Homepage
│   │
│   ├── components/
│   │   ├── homepage/
│   │   │   ├── Banner.tsx
│   │   │   └── Book.tsx
│   │   └── shared/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   │
│   └── types/
│       └── books.type.ts        ← TypeScript interfaces
│
├── Preview/                     ← README screenshots
├── package.json
└── README.md