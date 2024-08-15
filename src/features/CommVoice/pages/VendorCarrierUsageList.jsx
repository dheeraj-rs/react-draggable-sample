import React from 'react';

function VendorCarrierUsageList({ particular, transactionDate, amount, creditBalance }) {
  return (
    <tr className="carrier-table">
      <td>{particular}</td>
      <td>{transactionDate}</td>
      <td>{amount}</td>
      <td>{creditBalance}</td>
    </tr>
  );
}

export default VendorCarrierUsageList;
