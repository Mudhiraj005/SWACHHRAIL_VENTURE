
export enum Page {
  Home = 'Home',
  Report = 'Report Issue',
  Dashboard = 'Dashboard',
  About = 'About',
}

export enum ReportStatus {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
}

export interface Report {
  id: string;
  passengerName: string;
  location: string;
  description: string;
  photo?: string; // Base64 string of the image
  status: ReportStatus;
  timestamp: string;
}
