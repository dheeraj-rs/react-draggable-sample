import React from 'react';
import { Link } from 'react-router-dom';

function SMSSideNavLink({ link, active, img, name }) {
  return (
    <div className="accordion-item virtual-item ">
      <h2 className="accordion-header virtual-header">
        <Link
          to={link}
          className={`virtual-button admin-button collapsed ${
            active === true ? 'admin-button-active' : null
          }`}
          role={active !== true ? 'button' : null}
        >
          <img className="pe-2" src={`/assets/${img}`} alt="" /> {name}
        </Link>
      </h2>
    </div>
  );
}

export default SMSSideNavLink;
