
import React from 'react';

const teamMembers = [
  { name: 'Rohan Verma', role: 'Project Lead & Backend Developer' },
  { name: 'Priya Singh', role: 'UI/UX Designer & Frontend Developer' },
  { name: 'Amit Patel', role: 'Database Architect & QA Engineer' },
];

const AboutPage: React.FC = () => {
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="bg-white p-10 rounded-lg shadow-xl max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-primary mb-4 text-center">About SwachhRail</h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          SwachhRail is a digital initiative born from the vision of a cleaner, more hygienic Indian Railways. Our mission is to leverage technology to bridge the gap between passengers and railway authorities, creating a transparent and efficient system for monitoring and resolving cleanliness issues. By empowering every passenger to be a part of the solution, we aim to foster a collective sense of responsibility and pride in our national railway network.
        </p>
        
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Purpose 🎯</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>To provide a simple and accessible platform for reporting cleanliness issues.</li>
            <li>To ensure swift and accountable action from the concerned authorities.</li>
            <li>To use data analytics to identify problem areas and improve resource allocation.</li>
            <li>To promote a culture of cleanliness and hygiene among passengers and staff.</li>
          </ul>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Meet the Team 👨‍💻👩‍💻</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-light p-6 rounded-lg text-center w-64 shadow-md">
                <p className="text-xl font-semibold text-primary">{member.name}</p>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
