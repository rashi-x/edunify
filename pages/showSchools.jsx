import React, { useEffect, useState } from 'react';
import '../styles/styles.css'; 
import Head from 'next/head';

const ShowSchoolsPage = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const response = await fetch('/api/schools');
        const data = await response.json();
        setSchools(data);
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    }
    fetchSchools();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen py-8 px-4">
      <Head>
        <title>List of Schools</title>
      </Head>
      <h1 style={{ fontSize: '2.25rem' }} className="font-bold text-center mb-8">List of Schools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {schools.map((school) => (
          <div key={school.id} className="bg-white rounded-md shadow-md overflow-hidden">
            <img
              src={`/schoolImages/${school.image.split('\\').pop()}`}
              alt={school.name}
              className="w-full h-auto object-cover"
              style={{ maxHeight: '190px' }} 
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{school.name}</h2>
              <p className="text-gray-600 mb-1">{school.address}, {school.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSchoolsPage;
