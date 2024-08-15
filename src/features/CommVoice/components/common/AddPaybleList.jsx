/* eslint-disable react/destructuring-assignment */
import React from 'react';

function AddPaybleList(Props) {
  return (
    <tr className="add-payable-table">
      <td>{Props.amountPayable}</td>

      <td>
        <h6 className="mb-0">{Props.amountPaid}</h6>
        <p className="mb-0">{Props.amountUpi}</p>
      </td>

      <td className="voice-mob">
        <h6>{Props.paymentDate}</h6>
      </td>
      <td>
        <a href="/#">{Props.paidBy}</a>
        <p className="mb-0">{Props.amountPlace}</p>
      </td>

      <td className="d-flex gap-2">
        <h6 className="mb-0">{Props.amountDue}</h6>
      </td>
    </tr>
  );
}

export default AddPaybleList;
