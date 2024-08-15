/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Link } from 'react-router-dom';

function SideMenuLink(props) {
  return (
    <div className="accordion-item virtual-item ">
      <h2 className="accordion-header virtual-header">
        <Link
          to={props.link}
          className={`virtual-button collapsed ${props.active === true ? 'bg-pattens-blue' : null}`}
          role={props.active !== true ? 'button' : null}
        >
          <img className="pe-2" src="/assets/check-list.svg" alt="" /> {props.name}
        </Link>
      </h2>
    </div>
  );
}

export default SideMenuLink;
