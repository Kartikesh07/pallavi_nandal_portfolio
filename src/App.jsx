import React from 'react';

// Utility and Global Component Imports
import SmoothScroll from './SmoothScroll'; // <-- 1. IMPORT THE NEW COMPONENT
import CustomCursor from './components/CustomCursor'; 
// Component Imports
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    // Remove any minHeight or height restrictions here
    <div style={{fontFamily: "'Montserrat', sans-serif"}} className="bg-white text-gray-800">
      <style>
        {`
          /* Global Styles */
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');
          
          html, body, #root {
            height: auto !important;
            min-height: 100% !important;
            overflow-x: hidden;
          }
          body {
            min-height: 100vh !important;
          }
          /* THE FIX: Hide the default system cursor on desktop */
          @media (min-width: 768px) {
            * {
              cursor: none;
            }
          }
        
          /* Modal & Swiper Styles (they remain the same) */
          .ReactModal__Overlay { /* ... */ }
          .ReactModal__Content { /* ... */ }
          .swiper-pagination-custom .swiper-pagination-bullet { /* ... */ }
        `}
      </style>
      
      <SmoothScroll /> {/* <-- 2. ADD THE COMPONENT HERE */}
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
