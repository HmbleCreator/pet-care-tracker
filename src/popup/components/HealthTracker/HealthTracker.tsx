// src/popup/components/HealthTracker/HealthTracker.tsx

import React, { useState, useEffect } from 'react';
import './HealthTracker.css';

interface HealthTrackerProps {
  petId: string;
}

const HealthTracker: React.FC<HealthTrackerProps> = ({ petId }) => {
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

  const renderHealthRecord = (record: HealthRecord) => (
    <div key={record.id} className="health-record">
      <h3>{record.details.title}</h3>
      <p>{record.details.description}</p>
      <p>{record.date.toLocaleDateString()}</p>
      {record.details.findings && <p>Findings: {record.details.findings}</p>}
      {record.details.recommendations && <p>Recommendations: {record.details.recommendations}</p>}
    </div>
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="health-tracker">
      <h2>Health Tracker for {petId}</h2>
      {healthRecords.length > 0 ? (
        healthRecords.map(renderHealthRecord)
      ) : (
        <p>No health records found.</p>
      )}
    </div>
  );
};

export default HealthTracker;
