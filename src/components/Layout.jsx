import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AsciiBackground from './AsciiBackground';
import ScrollToTop from './ScrollToTop';

export default function Layout({ children }) {
  return (
    <div className="sk-page-wrapper">
      <ScrollToTop />
      <AsciiBackground />
      <Navbar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
