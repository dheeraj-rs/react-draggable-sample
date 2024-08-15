import React from 'react';
import '../../../styles/no-matching-records.css';

function NoMatchingRecords({ title = '' }) {
  return <div className="no-matching-records">{title || 'NO MATCHING RECORDS FOUND'}</div>;
}

export default NoMatchingRecords;
