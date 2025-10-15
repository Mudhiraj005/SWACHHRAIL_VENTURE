
import React, { useState } from 'react';
import { Report, ReportStatus } from '../types';

interface ReportIssuePageProps {
  addReport: (report: Omit<Report, 'id' | 'status' | 'timestamp'>) => void;
}

const ReportIssuePage: React.FC<ReportIssuePageProps> = ({ addReport }) => {
  const [passengerName, setPassengerName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerName || !location || !description) {
      setError('All fields except photo are required.');
      return;
    }
    
    addReport({ passengerName, location, description, photo });
    setPassengerName('');
    setLocation('');
    setDescription('');
    setPhoto(undefined);
    setError('');
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="container mx-auto px-6 py-12 flex justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Report a Cleanliness Issue</h2>
        {submitted ? (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
            <p className="font-bold">Success!</p>
            <p>Your report has been submitted successfully. Thank you for your contribution!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <label htmlFor="passengerName" className="block text-sm font-medium text-gray-700">Passenger Name</label>
              <input
                type="text"
                id="passengerName"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="e.g., Anjali Sharma"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Station / Coach Number</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="e.g., New Delhi Station, Platform 5 or Coach S-5"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description of Issue</label>
              <textarea
                id="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="e.g., Dustbin overflowing, littered floor."
              ></textarea>
            </div>
            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Upload Photo (Optional)</label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-light file:text-primary hover:file:bg-accent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-secondary transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Submit Report
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default ReportIssuePage;
