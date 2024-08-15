import React from 'react';

function VendorLotMRCList({ mrc, mrcInc, type, channel, date, title }) {
  return (
    <tr className="carrier-table">
      <td>{mrc}</td>
      <td>{mrcInc}</td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <div> {type}</div>
        </div>
      </td>
      <td>{channel}</td>
      <td>{date}</td>
      <td className="text-center">
        <a href="/#" data-bs-toggle="tooltip" data-bs-title={title}>
          <img src="/assets/description.svg" alt="" />
        </a>
      </td>
    </tr>
  );
}

export default VendorLotMRCList;
