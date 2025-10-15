
import React from 'react';
import { Report, ReportStatus } from '../types';

interface DashboardPageProps {
  reports: Report[];
  updateReportStatus: (id: string, status: ReportStatus) => void;
  deleteReport: (id: string) => void;
}

const getStatusColor = (status: ReportStatus) => {
  switch (status) {
    case ReportStatus.Pending:
      return 'bg-yellow-200 text-yellow-800';
    case ReportStatus.InProgress:
      return 'bg-blue-200 text-blue-800';
    case ReportStatus.Resolved:
      return 'bg-green-200 text-green-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

const DashboardPage: React.FC<DashboardPageProps> = ({ reports, updateReportStatus, deleteReport }) => {
  return (
    <main className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">Admin Dashboard</h2>
      <div className="bg-white p-8 rounded-lg shadow-xl overflow-x-auto">
        {reports.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No reports have been filed yet. 🥳</p>
        ) : (
          <table className="w-full min-w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Complaint ID</th>
                <th scope="col" className="px-6 py-3">Station/Coach</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3">Image</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((report) => (
                <tr key={report.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-xs">{report.id.substring(0, 8)}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{report.location}</td>
                  <td className="px-6 py-4 max-w-sm truncate">{report.description}</td>
                  <td className="px-6 py-4">
                    {report.photo ? (
                      <a href={report.photo} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View</a>
                    ) : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={report.status}
                      onChange={(e) => updateReportStatus(report.id, e.target.value as ReportStatus)}
                      className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full border-none focus:ring-0 ${getStatusColor(report.status)}`}
                    >
                      {Object.values(ReportStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteReport(report.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      title="Delete Report"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};

export default DashboardPage;
