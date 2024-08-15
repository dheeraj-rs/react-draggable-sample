import React from 'react';

function SideMenuAdminLink({ active, img, name, onClick, type }) {
  return (
    <div className="accordion-item virtual-item ">
      <h2 className="accordion-header virtual-header">
        <a
          href="/#"
          // to={link}
          className={`virtual-button admin-button collapsed ${
            active === true ? 'admin-button-active' : null
          }`}
          role={active !== true ? 'button' : null}
          onClick={(e) => {
            e.preventDefault();
            onClick(type);
          }}
        >
          <img className="pe-2" src={`/assets/${img}`} alt="" /> {name}
        </a>
      </h2>
    </div>
  );
}

export default SideMenuAdminLink;
