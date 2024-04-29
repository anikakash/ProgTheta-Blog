import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    // Force re-render of Header component on route change
    // This ensures that the header is always visible when navigating between routes
    // You might need to adjust this logic based on your specific requirements
  }, [location]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
