import React from 'react';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';

function PreviewOffCanvas({ show, setShow, previewComponents }) {
  const hanldeClose = () => {
    setShow({ isVisible: false, type: '' });
  };
  const getDynamicIconPath = (componentName) => {
    const iconMapping = {
      'Caller List': '/assets/call-flows-hours/callerList.svg',
      'Caller ID': '/assets/call-flows-hours/callerID.svg',
      Email: '/assets/call-flows-hours/email.svg',
      Voicemail: '/assets/call-flows-hours/voicemail.svg',
      Hours: '/assets/call-flows-hours/hours.svg',
      Connect: '/assets/call-flows-hours/connect.svg',
      'IVR menu': '/assets/call-flows-hours/ivr.svg',
      Greetify: '/assets/greetify.svg',
    };
    return iconMapping[componentName];
  };
  if (show) {
    return (
      <>
        <div
          className={`offcanvas offcanvas-end   ${show ? 'showing' : 'hiding'}`}
          tabIndex="-1"
          aria-labelledby="offcanvasPreviewComponentLabel"
        >
          <div className="offcanvas-header offcanvas-header-title p-23px pb-10px justify-content-between align-items-center">
            <div>
              <p className="fs-16px text-primary fw-medium mb-0">Preview Components</p>
            </div>
            <div>
              <button
                type="button"
                className="btn-close"
                onClick={hanldeClose}
                aria-label="Close"
              />
            </div>
          </div>
          <div className="offcanvas-body p-23px pt-0px">
            <p>Preview the component panel which see by the customer.</p>

            {previewComponents?.isLoading && (
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
            )}
            <div className={`preview-component ${previewComponents?.isLoading ? 'd-none' : ''}`}>
              <ul className="mt-3 p-3">
                {previewComponents?.data?.length > 0 &&
                  previewComponents?.data?.map((item, index) => (
                    <li className="d-flex gap-2 align-items-center" key={index}>
                      <span>
                        <img src={getDynamicIconPath(item.attributes?.name)} alt="" />
                      </span>
                      <span className="fs-12px text-primary">{item.attributes?.name}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        {show && <div className="offcanvas-backdrop fade show" />}
      </>
    );
  }
}

export default PreviewOffCanvas;
