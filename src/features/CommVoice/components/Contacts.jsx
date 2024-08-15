/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import { ListContactCompanies, ListCountries } from '../../../common/api-collection/ContactCompany';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import ContactsCompanyGroup from './ContactsCompanyGroup';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';

function Contacts({
  setCompanyId,
  reload,
  onCountrySelect,
  isMobile,
  setIsMobile,
  editCompanyData,
  setEditCompanyData,
}) {
  const [companies, setcompanies] = useState();
  const [query, setQuery] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState();
  const [countries, setCountries] = useState();
  const [selectedCompany, setSelectedCompany] = useState('');
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line max-len
    const filteredItems = companies?.filter((item) =>
      item.attributes.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCompanies(filteredItems);
  }, [query, companies]);

  const listCountries = () => {
    ListCountries()
      .then((response) => {
        if (response?.data) {
          setCountries(response?.data);
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

  const listCompanies = () => {
    setSpinner(true);
    ListContactCompanies()
      .then((response) => {
        setcompanies(response?.data);
      })
      .catch(() => {})
      .finally(() => {
        setSpinner(false);
      });
  };
  useEffect(() => {
    listCompanies();
    listCountries();
  }, [reload]);
  return (
    <div
      className={` ${
        isMobile
          ? 'col-lg-3 col-sm-12 right-sec-voice d-lg-block'
          : 'col-lg-3 col-sm-12 right-sec-voice d-lg-block d-none'
      }`}
    >
      <div className="bg-tranparent rounded-top border-0 fs-12px p-3 p-xl-3 p-lg-3 p-md-2 p-sm-2 pb-3 mt-3 pe-xl-4 pb-xl-4 pe-2">
        <div className="border-0 shadow-6 rounded bg-white">
          <div className="inbox-telephony-wrapper scroll-custom">
            <div className="p-3 gap-23px">
              <div className="contact-content">
                <div
                  role="button"
                  className="hover-effect rounded d-flex align-items-center p-3 gap-13px active-company"
                  onClick={() => {
                    onCountrySelect('');
                    setSelectedCompany('');
                  }}
                >
                  <div className="d-flex flex-column">
                    <p className="fs-13px fw-semibold mb-0 text-primary group-name">All contacts</p>
                    <p className="fs-12px mb-0 fw-medium text-secondary">All Companies</p>
                  </div>
                  <div className="ms-auto d-flex align-items-center me-3">
                    <div className="bg-lavender-mist d-flex me-3 align-items-center justify-content-center fs-11px p-2 rounded-pill fw-semibold">
                      <img src="/assets/user-three.svg" className="me-2" alt="" />{' '}
                      {filteredCompanies?.reduce(
                        (accumulator, company) =>
                          accumulator + (company?.attributes.contacts_count || 0),
                        0
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* <hr className="m-0 border-black o-16 mt-4" /> */}
              <div className="d-flex align-items-center mt-4">
                <div className="text-primary fw-medium fs-14px d-flex">
                  <a
                    id="companyBack"
                    className="pe-2 d-block d-lg-none"
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobile(false);
                    }}
                  >
                    <img src="/assets/back-full-arrow.svg" alt="" />
                  </a>{' '}
                  Companies
                </div>
                <div className="ms-auto">
                  <div data-bs-toggle="tooltip" data-bs-title="Add Company">
                    <a
                      href="#/"
                      // data-bs-toggle="offcanvas"
                      // data-bs-target="#offcanvasAddCompany"
                      className="d-flex gap-2 fs-13px align-items-center"
                      onClick={() => setCompanyId('', 'addCompany')}
                    >
                      <img src="/assets/addplus.svg" alt="" /> Add
                    </a>
                  </div>
                </div>
              </div>
              <div id="category-wrap" className="d-flex mb-2">
                <div className="rounded mt-3 w-100">
                  <SearchWithBorder
                    placeholderText="Search Company"
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                    searchTerm={query}
                    clearBtn={() => {
                      setQuery('');
                    }}
                  />
                </div>
              </div>
              {spinner ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <SpinningLoader />
                  </div>
                </div>
              ) : (
                filteredCompanies?.map((company) => (
                  <ContactsCompanyGroup
                    key={company.id}
                    id={company.id}
                    active={selectedCompany === company.id}
                    onClick={(id) => {
                      setSelectedCompany(id);
                      onCountrySelect(id);
                    }}
                    setCompanyId={setCompanyId}
                    iconBgColor="indigo-100"
                    countries={countries}
                    title={company.attributes.name}
                    email={company.attributes.email}
                    countryId={company?.attributes?.country_id}
                    phoneNumber={company?.attributes?.phone}
                    subTitle={
                      countries?.find(
                        (country) =>
                          // eslint-disable-next-line operator-linebreak
                          parseInt(country.id, Number) ===
                          parseInt(company?.attributes?.country_id, Number)
                      )?.attributes.name
                    }
                    count={company?.attributes.contacts_count}
                    iconCountColor="lavender-mist"
                    editCompanyData={editCompanyData}
                    setEditCompanyData={setEditCompanyData}
                  />
                ))
              )}
              {filteredCompanies?.length === 0 ? <NoMatchingRecords /> : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
