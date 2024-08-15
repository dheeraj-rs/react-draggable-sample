import React from 'react';

function NoContactsFound() {
  return (
    <>
      {/* <!-- table section starts --> */}

      <div className="d-flex flex-column gap-3 justify-content-center align-items-center">
        <div className="mt-4">
          {' '}
          <img src="/assets/no-company-contacts.svg" alt="" />
        </div>

        <p className="mt-4 mb-0 fw-medium fs-15px">Oh! No contacts were found.</p>
        <p className="text-secondary fs-14px">Lets add contacts by import or Add contact manualy</p>
      </div>

      {/* <!-- table section ends --> */}
    </>
  );
}

export default NoContactsFound;
