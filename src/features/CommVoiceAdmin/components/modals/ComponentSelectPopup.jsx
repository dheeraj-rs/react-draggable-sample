import React, { useState } from 'react';
import SearchWithBorder from '../../../../common/components/common/SearchWithBorder';
import SpinningLoader from '../../../../common/components/Loader/SpinningLoader';
import useStore from '../../../Test/store';
import '../../../../styles/scss/components/ComponentSelectPopup.scss';

function ComponentSelectPopup({
  isVisible,
  vendorComponents = [],
  setSearch,
  search = '',
  componentsloading = false,
  iVRSearchResult = [],
  handleIVRSearch,
  handleSelectIVR,
}) {
  const { show, setShow } = useStore();

  const [tabType, setTabType] = useState('new');

  const handleSelection = (data) => {
    setShow({
      isVisible: true,
      type: data.type,
      prevNodeId: show.prevNodeId,
      prevHandleId: show.prevHandleId,
      targetType: show?.targetType,
      keyValue: show?.keyValue,
    });
  };

  const handleClose = () => {
    setShow({ isVisible: false, type: '' });
  };

  const getIcon = (type) => {
    let image = '';
    if (type === 'Greetify') {
      image = '/assets/call-flows-hours/greetify.svg';
    } else if (type === 'IVR menu') {
      image = '/assets/call-flows-hours/ivr-updated.svg';
    } else if (type === 'Connect') {
      image = '/assets/call-flows-hours/connect-updated.svg';
    } else if (type === 'Hours') {
      image = '/assets/call-flows-hours/hours-updated.svg';
    } else if (type === 'Voicemail') {
      image = '/assets/call-flows-hours/voicemail-updated.svg';
    } else if (type === 'Email') {
      image = '/assets/call-flows-hours/email-updated.svg';
    } else if (type === 'Caller ID') {
      image = '/assets/call-flows-hours/callerid-updated.svg';
    } else if (type === 'Caller List') {
      image = '/assets/call-flows-hours/calllerList-updated.svg';
    } else if (type === 'Shortcut') {
      image = '/assets/call-flows-hours/shortcut-updated.svg';
    } else if (type === 'Get value') {
      image = '/assets/call-flows-hours/getValue-updated.svg';
    } else if (type === 'Passthru') {
      image = '/assets/call-flows-hours/passthru-updated.svg';
    } else if (type === 'SMS') {
      image = '/assets/call-flows-hours/sms-updated.svg';
    } else if (type === 'Bulk SMS') {
      image = '/assets/call-flows-hours/bulk-updated.svg';
    } else if (type === 'Queue') {
      image = '/assets/call-flows-hours/queue-updated.svg';
    } else if (type === 'Hangup') {
      image = '/assets/call-flows-hours/hangUp-updated.svg';
    } else if (type === 'Go to flow') {
      image = '/assets/call-flows-hours/gotoFlow-updated.svg';
    } else if (type === 'Callback') {
      image = '/assets/call-flows-hours/callBack-updated.svg';
    }

    return image;
  };
  if (isVisible) {
    return (
      <>
        <div
          className="modal fade show"
          id="IvrComponentSelectPopup"
          tabIndex="-1"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog shadow-7" style={{ top: '80px' }}>
            <div className="modal-content" style={{ border: 'none' }}>
              <div className="modal-body" style={{ padding: '30px' }}>
                {iVRSearchResult?.length > 1 ? (
                  <div className="d-flex justify-content-end mb-4 mt-n4">
                    <span
                      className="cursor-pointer"
                      data-bs-dismiss="modal"
                      onClick={handleClose}
                    >
                      <img src="/assets/X.svg" alt="" />
                    </span>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between mb-4 mt-n2">
                    <h5 className="fs-16px text-primary fw-500 m-0">
                      Components
                    </h5>
                    <span
                      className="cursor-pointer"
                      data-bs-dismiss="modal"
                      onClick={handleClose}
                    >
                      <img src="/assets/X.svg" alt="" />
                    </span>
                  </div>
                )}

                <div className="row component-tab mb-3">
                  <div
                    className={`col-sm-6 ${
                      iVRSearchResult?.length > 1 ? '' : 'd-none'
                    }`}
                    onClick={() => {
                      setTabType('new');
                    }}
                  >
                    <div
                      className={`component-tab-item cursor-pointer ${
                        tabType === 'new' ? 'active' : ''
                      }`}
                    >
                      New Component
                    </div>
                  </div>
                  <div
                    className={`col-sm-6 ${
                      show?.isIVR && iVRSearchResult?.length > 1 ? '' : 'd-none'
                    }`}
                    onClick={() => {
                      setTabType('existing');
                    }}
                  >
                    <div
                      className={`component-tab-item cursor-pointer ${
                        tabType === 'existing' ? 'active' : ''
                      }`}
                    >
                      Existing Component
                    </div>
                  </div>
                </div>
                {/* ######################## New Components -- start ######################### */}
                <div
                  className={`all-component ${
                    tabType === 'new' ? '' : 'd-none'
                  }`}
                >
                  <div>
                    <SearchWithBorder
                      placeholderText="Search component"
                      onChange={(e) => {
                        setSearch(e?.target?.value);
                      }}
                      clearBtn={() => {
                        setSearch('');
                      }}
                      searchTerm={search}
                    />
                  </div>
                  <div className={componentsloading ? 'd-none' : ''}>
                    <ul className="mt-3 component-select-popup-items d-flex flex-wrap">
                      {vendorComponents?.map((component, index) => {
                        if (
                          component?.attributes?.is_enabled &&
                          component?.attributes?.is_published
                        ) {
                          return (
                            <li
                              key={index}
                              className="d-flex gap-2 align-items-center p-3 bg-alice-blue-three-hover rounded"
                              onClick={() => {
                                handleSelection({
                                  type: component?.attributes?.name,
                                });
                              }}
                            >
                              <span>
                                <img
                                  src={getIcon(component?.attributes?.name)}
                                  alt=""
                                />
                              </span>
                              <span className="fs-13px text-primary">
                                {component?.attributes?.name}
                              </span>
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ul>
                  </div>
                  <div
                    className={`mt-3 component-select-popup-items d-flex flex-wrap justify-content-center align-items-center ${
                      componentsloading ? '' : 'd-none'
                    }`}
                  >
                    <SpinningLoader />
                  </div>
                </div>
                {/* ######################## New Component -- end ######################### */}

                {/* ############### existing component starts ##################### */}
                <div
                  className={`${
                    tabType === 'existing' ? 'existing-component' : 'd-none'
                  }`}
                >
                  <div>
                    <div className="bg-white mb-2">
                      <SearchWithBorder
                        placeholderText="Search"
                        onChange={(e) => {
                          handleIVRSearch(e?.target?.value);
                        }}
                        clearBtn={() => {
                          handleIVRSearch('');
                        }}
                      />
                    </div>

                    {iVRSearchResult?.map((ivr, index) => {
                      if (ivr?.id !== show?.prevNodeId) {
                        return (
                          <div key={index} className="rounded">
                            <a
                              className="dropdown-item rounded p-3"
                              href="/#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleSelectIVR(ivr?.id);
                              }}
                            >
                              <img
                                className="me-1"
                                alt=""
                                src="/assets/call-flows-hours/ivr-square.svg"
                              />
                              {ivr?.name}
                            </a>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
                {/* ############### existing component ends ##################### */}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-backdrop fade show" style={{ zIndex: '666' }} />
      </>
    );
  }
}

export default ComponentSelectPopup;
