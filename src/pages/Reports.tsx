
import React from 'react';
import Layout from '../components/Layout';
import WelcomeCard from '@/components/welcome/WelcomeCard';
import { FileBarChart2 } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Reports</h1>
        <WelcomeCard 
          title="Impact Reports"
          description="Generate and share reports about your impact activities"
          icon={<FileBarChart2 size={32} />}
          to="/dashboard"
          buttonText="Explore Reports"
        />
      </div>
    </Layout>
  );
};

export default Reports;
