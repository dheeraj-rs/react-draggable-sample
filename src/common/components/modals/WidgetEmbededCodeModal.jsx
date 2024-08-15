/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import copy from 'copy-to-clipboard';

function WidgetEmbededCodeModal({ isOpen, onClose, id }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (data) => {
    copy(data);
  };

  if (isOpen) {
    return (
      <>
        <div
          className="modal mt-65"
          tabIndex="-1"
          id="widgetcodeModel"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog">
            <div className="modal-content border-0">
              {/* <!-- Modal Header --> */}
              <div className="modal-header border-0 py-4">
                <h4 className="modal-title text-dark fw-medium fs-15px">Widget embeded code</h4>

                <span
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setIsCopied(false);
                    onClose();
                  }}
                />
              </div>

              <div className="modal-body p-0">
                <div className="bg-dark-gray-blue rounded">
                  <div className="border-bottom border-border-light-gray px-3 bg-dark-gray-blue d-flex justify-content-between align-items-center py-4 px-4">
                    <div className="fw-medium text-white">Widget embed code</div>
                    <span
                      className="bg-dark rounded p-2 text-white fs-12px copy-button copy-identifier copy-widget"
                      role="button"
                      onClick={() => {
                        copyToClipboard(`
                    <script>
                          window.WIDGET_BASE_URL = "https://${window.location.hostname}/v1";
                          window.WIDGET_ID = ${id};
                          window.IFRAME_SRC = "https://cdn.softwaretech-demo.com/widget"
                    </script>
                    <script defer src="https://cdn.softwaretech-demo.com/widget/js/widgetInit.js"></script>
`);
                        setIsCopied(true);
                      }}
                    >
                      {isCopied ? (
                        <>Copied</>
                      ) : (
                        <>
                          <img className="me-1" src="/assets/copy-white.svg" alt="copy-white" />{' '}
                          Copy
                        </>
                      )}
                    </span>
                  </div>
                  <div className="text-white p-4 py-5 pt-4 embedd-code">
                    {'<script>'}
                    <br />
                    <span
                      style={{ marginLeft: '40px' }}
                    >{`window.WIDGET_BASE_URL = "https://${window.location.hostname.replace(
                      'app.',
                      ''
                    )}/v1";`}</span>
                    <br />
                    <span style={{ marginLeft: '40px' }}>{`window.WIDGET_ID = ${id};`}</span>
                    <br />
                    <span style={{ marginLeft: '40px' }}>
                      window.IFRAME_SRC = &quot; https://cdn.softwaretech-demo.com/widget&quot;
                    </span>
                    {'</script>'}
                    <span>
                      {
                        '<script defer src="https://cdn.softwaretech-demo.com/widget/js/widgetInit.js"></script>'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop show" />
      </>
    );
  }
  return <div />;
}

export default WidgetEmbededCodeModal;
