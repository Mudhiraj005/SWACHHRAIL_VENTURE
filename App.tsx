
import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ReportIssuePage from './components/ReportIssuePage';
import DashboardPage from './components/DashboardPage';
import AboutPage from './components/AboutPage';
import useLocalStorage from './hooks/useLocalStorage';
import { Page, Report, ReportStatus } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [reports, setReports] = useLocalStorage<Report[]>('swachh-rail-reports', []);

  const addReport = (newReportData: Omit<Report, 'id' | 'status' | 'timestamp'>) => {
    const newReport: Report = {
      ...newReportData,
      id: crypto.randomUUID(),
      status: ReportStatus.Pending,
      timestamp: new Date().toISOString(),
    };
    setReports(prevReports => [...prevReports, newReport]);
  };

  const updateReportStatus = (id: string, status: ReportStatus) => {
    setReports(prevReports =>
      prevReports.map(report =>
        report.id === id ? { ...report, status } : report
      )
    );
  };

  const deleteReport = (id: string) => {
    setReports(prevReports => prevReports.filter(report => report.id !== id));
  };
  
  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage setCurrentPage={setCurrentPage} />;
      case Page.Report:
        return <ReportIssuePage addReport={addReport} />;
      case Page.Dashboard:
        return <DashboardPage reports={reports} updateReportStatus={updateReportStatus} deleteReport={deleteReport} />;
      case Page.About:
        return <AboutPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-grow">
        {renderPage()}
      </div>
      <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
        <p>&copy; {new Date().getFullYear()} SwachhRail. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
