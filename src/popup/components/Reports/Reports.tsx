// src/popup/components/Reports/Reports.tsx

import React, { useState, useEffect } from 'react';
import './Reports.css';

interface ReportsProps {
  petId: string;
}

const Reports: React.FC<ReportsProps> = ({ petId }) => {
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHealthRecords();
  }, [petId]);

  const loadHealthRecords = async () => {
    setLoading(true);
    try {
      const records = await HealthRecordStorage.getByPet(petId);
      setHealthRecords(records);
      setLoading(false);
    } catch (error) {
      setError('Error loading health records');
      setLoading(false);
    }
  };

  const generateReport = (type: string): string => {
    // Generate report content based on the type
    let report = '';
    switch (type) {
      case 'healthHistory':
        report = healthRecords.map(record => `${record.date.toLocaleDateString()}: ${record.details.title} - ${record.details.description}`).join('\n');
        break;
      case 'weightTracking':
        report = healthRecords.filter(record => record.type === 'weight').map(record => `${record.date.toLocaleDateString()}: ${record.details.value} ${record.details.unit}`).join('\n');
        break;
      case 'vaccinationStatus':
        report = healthRecords.filter(record => record.type === 'vaccination').map(record => `${record.date.toLocaleDateString()}: ${record.details.title}`).join('\n');
        break;
      default:
        report = 'No report available';
    }
    return report;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="reports">
      <h2>Reports for {petId}</h2>
      <button onClick={() => alert(generateReport('healthHistory'))}>Generate Health History Report</button>
      <button onClick={() => alert(generateReport('weightTracking'))}>Generate Weight Tracking Report</button>
      <button onClick={() => alert(generateReport('vaccinationStatus'))}>Generate Vaccination Status Report</button>
    </div>
  );
};

export default Reports;
