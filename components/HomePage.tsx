
import React from 'react';
import { Page } from '../types';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  return (
    <main className="container mx-auto px-6 py-12 text-center">
      <div className="bg-white p-12 rounded-lg shadow-xl">
        <h2 className="text-5xl font-extrabold text-primary mb-4">
          Cleaner, Safer, Smarter Railways.
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          Welcome to SwachhRail, a digital platform to ensure cleanliness and hygiene across the Indian Railways network. Help us maintain a pristine environment by reporting issues instantly.
        </p>
        <button
          onClick={() => setCurrentPage(Page.Report)}
          className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-secondary transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Report an Issue Now
        </button>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="text-left bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">The Problem  गंदगी</h3>
          <p className="text-gray-600 leading-relaxed">
            Maintaining cleanliness in a vast network like Indian Railways is a monumental task. Unattended litter, dirty coaches, and unhygienic stations can lead to passenger dissatisfaction and health concerns. Timely reporting and resolution are often challenging.
          </p>
        </div>
        <div className="text-left bg-success text-white p-8 rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold mb-4">Our Solution ✨</h3>
          <p className="leading-relaxed">
            SwachhRail empowers passengers to become cleanliness monitors. With our easy-to-use platform, you can report an issue with a photo in seconds. This data is instantly available to the admin team, enabling swift action and ensuring a cleaner journey for everyone.
          </p>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
