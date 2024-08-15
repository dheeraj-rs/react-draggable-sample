/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import CompanyGroup from './CompanyGroup';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import { ListContactCompanies, ListCountries } from '../../../common/api-collection/ContactCompany';

function Companies({ setCompanyId, reload, onCountrySelect }) {
  const [companies, setcompanies] = useState();
  const [query, setQuery] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState();
  const [countries, setCountries] = useState();
  const [selectedCompany, setSelectedCompany] = useState('');

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
    ListContactCompanies()
      .then((response) => {
        setcompanies(response?.data);
      })
      .catch(() => {})
      .finally(() => {});
  };
  useEffect(() => {
    listCompanies();
    listCountries();
  }, [reload]);

  return (
    <div className="col-lg-3 col-sm-12 right-sec-voice d-none d-lg-block">
      <div className="bg-tranparent rounded-top border-0 fs-12px p-3 p-xl-3 p-lg-3 p-md-2 p-sm-2 pb-3 mt-3 pe-xl-4 pb-xl-4 pe-2">
        <div className="border-0 shadow-6 rounded bg-white">
          <div className="inbox-telephony-wrapper scroll-custom">
            <div className="p-23px gap-23px">
              <div className="d-flex align-items-center">
                <div className="text-primary fw-medium fs-14px d-flex">
                  <a id="companyBack" className="pe-2 d-block d-lg-none" href="/#">
                    <img src="/assets/back-full-arrow.svg" alt="" />
                  </a>{' '}
                  Companies
                </div>
                <div className="ms-auto">
                  <div data-bs-toggle="tooltip" data-bs-title="Add Company">
                    <a
                      href="/#"
                      // data-bs-toggle="offcanvas"
                      // data-bs-target="#offcanvasAddCompany"
                      className="bg-black d-flex align-items-center justify-content-center text-white h-5 w-5 rounded"
                      onClick={() => setCompanyId(-1, 'addCompany')}
                    >
                      <img src="/assets/add-white-icon.svg" alt="# " />
                    </a>
                  </div>
                </div>
              </div>
              <div id="category-wrap" className="d-flex">
                <div className="rounded mt-4 w-100">
                  <SearchWithBorder
                    placeholderText="Search Company"
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                    clearBtn={() => {
                      setQuery('');
                    }}
                    searchTerm={query}
                  />
                </div>
              </div>
            </div>
            <div className="pe-1">
              <div className="contact-content">
                <div
                  className={`bg-ghost-white-alt-hover d-flex align-items-center p-16px gap-13px${
                    selectedCompany === '' ? ' bg-chat-blue' : ''
                  }`}
                  onClick={() => {
                    onCountrySelect('');
                    setSelectedCompany('');
                  }}
                >
                  <div className="d-flex flex-column">
                    <p className="fs-13px fw-semibold mb-0 text-primary group-name">All contacts</p>
                    <p className="fs-12px mb-0 text-secondary">All Companies</p>
                  </div>
                  <div className="ms-auto d-flex align-items-center me-3">
                    <div className="bg-lavender-mist d-flex me-3 align-items-center justify-content-center fs-11px p-2 rounded-pill fw-semibold">
                      <img src="/assets/user-three.svg" className="me-2" alt="" />
                      {filteredCompanies?.reduce(
                        (accumulator, company) =>
                          accumulator + (company?.attributes.contacts_count || 0),
                        0
                      )}
                    </div>
                  </div>
                </div>
                {filteredCompanies?.map((company) => (
                  <CompanyGroup
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
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Companies;
