import React from 'react';
import Layout from '../components/Layout';
import WelcomeCard from '@/components/welcome/WelcomeCard';

const Reports: React.FC = () => {
  return (
    <Layout>
      <div>
        <h1>Reports Page</h1>
        <WelcomeCard />
      </div>
    </Layout>
  );
};

export default Reports;
