
import { Report, ReportTemplate } from '../types/dashboard';

// Mock Report Templates
export const mockReportTemplates: ReportTemplate[] = [
  {
    id: '1',
    name: 'B-Corp Impact Assessment',
    description: 'Standardized report for B-Corp certification',
    sections: [
      'Governance',
      'Workers',
      'Community',
      'Environment',
      'Customers',
    ],
    createdAt: '2023-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Annual Sustainability Report',
    description: 'Comprehensive yearly sustainability metrics',
    sections: [
      'Executive Summary',
      'Environmental Impact',
      'Social Impact',
      'Economic Impact',
      'Goals & Targets',
    ],
    createdAt: '2023-02-10T14:20:00Z',
  },
  {
    id: '3',
    name: 'Team Activity Summary',
    description: 'Overview of team volunteering and impact',
    sections: [
      'Participation Metrics',
      'Hours Contributed',
      'Impact Areas',
      'Recognition & Achievements',
    ],
    createdAt: '2023-03-05T09:30:00Z',
  },
  {
    id: '4',
    name: 'SDG Alignment Report',
    description: 'Report aligning activities with UN Sustainable Development Goals',
    sections: [
      'SDG Overview',
      'Goal-specific Contributions',
      'Metrics & Indicators',
      'Forward Planning',
    ],
    createdAt: '2023-04-12T11:45:00Z',
  },
];

// Mock Generated Reports
export const mockReports: Report[] = [
  {
    id: '1',
    name: 'Q2 2023 B-Corp Assessment',
    templateId: '1',
    createdAt: '2023-07-01T16:30:00Z',
    createdBy: 'Admin User',
    status: 'completed',
    downloadUrl: '#',
  },
  {
    id: '2',
    name: '2023 Annual Sustainability Report',
    templateId: '2',
    createdAt: '2023-06-15T10:45:00Z',
    createdBy: 'Admin User',
    status: 'draft',
    downloadUrl: '#',
  },
  {
    id: '3',
    name: 'Marketing Team Q1 Activity',
    templateId: '3',
    createdAt: '2023-04-02T14:20:00Z',
    createdBy: 'Demo User',
    status: 'completed',
    downloadUrl: '#',
  },
];

export const getReportTemplateById = (id: string): ReportTemplate | undefined => {
  return mockReportTemplates.find(template => template.id === id);
};

export const getReportById = (id: string): Report | undefined => {
  return mockReports.find(report => report.id === id);
};
