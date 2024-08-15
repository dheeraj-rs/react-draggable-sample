import React from 'react';

function VendorDidPreviewList({ number, mrc, channel, region, state, city, status, carrierDate }) {
  return (
    <tr className="carrier-table">
      <td>{number}</td>

      <td>{mrc}</td>
      <td> {channel}</td>
      <td>{region}</td>
      <td>{state}</td>
      <td>{city}</td>

      <td>{status}</td>
      <td>{carrierDate}</td>
    </tr>
  );
}

export default VendorDidPreviewList;
