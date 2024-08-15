/* eslint-disable function-paren-newline */
/* eslint-disable indent */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-nested-ternary */
import React from 'react';

import CheckboxTick from '../../../common/components/forms/CheckBoxTick';
import { generateUniqueId } from '../../../common/helpers/utils';
import Input from '../../../common/components/forms/Input';

function WebsiteDomainSection({
  showWebsiteDomain,
  setShowWebsiteDomain,
  setDomainList,
  domainList,
  websiteDomainError,
  setWebsiteDomainError,
  handleDeleteValue,
}) {
  const validateURL = (url) => {
    // Regular expression pattern for URL validation
    const urlPattern = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;

    // Test the URL against the pattern
    return urlPattern.test(url);
  };

  const handleChangeValue = (domain, newValue, type) => {
    if (type === 'domain-name') {
      if (newValue === '') {
        setWebsiteDomainError({ ...websiteDomainError, domainName: true });
      } else {
        setWebsiteDomainError({ ...websiteDomainError, domainName: false });
      }
      setDomainList((prevArray) =>
        prevArray.map((element) =>
          element?.id === domain?.id
            ? {
                type: 'domains',
                id: domain?.id,
                attributes: {
                  name: newValue,
                  domain: domain?.attributes?.domain,
                },
              }
            : element
        )
      );
    } else if (type === 'url') {
      if (newValue === '' || validateURL(newValue) === false) {
        setWebsiteDomainError({ ...websiteDomainError, url: true });
      } else {
        setWebsiteDomainError({ ...websiteDomainError, url: false });
      }
      setDomainList((prevArray) =>
        prevArray.map((element) =>
          element?.id === domain?.id
            ? {
                type: 'domains',
                id: domain?.id,
                attributes: {
                  name: domain?.attributes?.name,
                  domain: newValue,
                },
              }
            : element
        )
      );
    }
  };

  return (
    <div className="shadow-10 mt-4 p-4 rounded pb-5">
      <div className="row gx-5">
        <div className="">
          <h6 className="fs-14 mt-2 fw-500">Website Domain</h6>
        </div>
        <div className="col-lg-12 col-sm-12">
          <div className="mt-4">
            <CheckboxTick
              checkid="enabledomain"
              title="Enable Restricted mode"
              onChange={() => {
                setShowWebsiteDomain(!showWebsiteDomain);
              }}
              checked={showWebsiteDomain}
              classAttributeChild="fw-normal text-primary check-title"
              classAttributeParent="d-flex gap-2 align-items-center"
            />
          </div>
        </div>
        <div className={`enable-domain ${showWebsiteDomain ? '' : 'd-none'}`}>
          {domainList?.length > 0 &&
            domainList?.map((domain, index) => (
              <div className="row gx-5 mutiple-domain" key={index}>
                <div className="col-lg-6 col-sm-6">
                  {/* <input
                    value={domain?.attributes?.name}
                    onChange={(e) => {
                      handleChangeValue(domain, e.target.value, 'domain-name');
                    }}
                  /> */}
                  <Input
                    label="Domain name"
                    id={domain?.id}
                    placeholder="Mydomain"
                    type="textbox"
                    disabled=""
                    name="domainName"
                    value={domain?.attributes?.name}
                    onChange={(e) => {
                      handleChangeValue(domain, e.target.value, 'domain-name');
                    }}
                    style={domain?.attributes?.name ? {} : { border: '1px solid red' }}
                    warningMessage={
                      domain?.attributes?.name ? null : (
                        <span className="invalid-message">
                          <sup>*</sup>
                          Domain name Required
                        </span>
                      )
                    }
                  />
                </div>

                <div className="col-lg-6 col-sm-6 d-flex align-items-center gap-4">
                  <Input
                    label="URL"
                    id="URL"
                    placeholder="https://mydomain.com"
                    type="textbox"
                    disabled=""
                    value={domain?.attributes?.domain}
                    onChange={(e) => {
                      handleChangeValue(domain, e.target.value, 'url');
                    }}
                    style={
                      domain?.attributes?.domain && validateURL(domain?.attributes?.domain)
                        ? {}
                        : { border: '1px solid red' }
                    }
                    warningMessage={
                      domain?.attributes?.domain ? (
                        validateURL(domain?.attributes?.domain) ? null : (
                          <span className="invalid-message">
                            <sup>*</sup>
                            Not a valid url
                          </span>
                        )
                      ) : (
                        <span className="invalid-message">
                          <sup>*</sup>
                          URL Required
                        </span>
                      )
                    }
                  />

                  <div className={`bg-ash-white p-1 mt-5 rounded ${index === 0 ? 'd-none' : ''}`}>
                    <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div
                        role="button"
                        // data-bs-toggle="tooltip"
                        // data-bs-title="Delete"
                        // data-bs-placement="top"
                        className="d-block delete"
                        onClick={() => {
                          handleDeleteValue(domain?.id);
                        }}
                      >
                        <img src="/assets/Trash-img.svg" alt="" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            ))}

          <div className="gx-5 mt-4">
            <a
              href="/#"
              className="add-domain"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (websiteDomainError?.url === false && websiteDomainError?.domainName === false) {
                  setWebsiteDomainError({
                    domainName: true,
                    url: true,
                  });
                  setDomainList((prevArray) => [
                    ...prevArray,
                    {
                      type: 'domains',
                      // id: domainList[domainList.length - 1].id + 1,
                      // id: `A${domainList.length + 1}`,
                      id: `A${generateUniqueId()}`,
                      attributes: {
                        name: '',
                        domain: '',
                      },
                    },
                  ]);
                }
              }}
            >
              <img src="/assets/enable-domain.svg" alt="" />
              Add Domain
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebsiteDomainSection;
