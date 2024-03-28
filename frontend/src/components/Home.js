import React, { useState, useEffect } from 'react';

const Home = () => {
  const [stats, setStats] = useState({ bookCount: 0, borrowerCount: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          console.error('Failed to fetch stats:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Welcome to the Library Management System</h1>
      <p className="text-lg text-center">This is a simple library management system where you can add, update, and delete books and borrowers.</p>
      <h2 className="text-xl font-bold text-center mt-8">We currently have {stats.bookCount} books and {stats.borrowerCount} users!</h2>
    </div>
  );
};

export default Home;
