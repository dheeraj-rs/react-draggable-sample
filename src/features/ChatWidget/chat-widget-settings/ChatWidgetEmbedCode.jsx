/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { useParams } from 'react-router';
import copy from 'copy-to-clipboard';

function ChatWidgetEmbedCode() {
  const params = useParams();

  const copyToClipboard = (code) => {
    copy(code);
  };

  return (
    <div
      className="tab-pane fade"
      id="tab-embed-code"
      role="tabpanel"
      aria-labelledby="embed-code-tab"
    >
      <div className="scroll-wrap scroll-custom p-1 pe-3">
        <div className="embed-code mt-5">
          <div className="bg-soft-peach rounded mt-3">
            <div className="code-border-bottom bg-dark-gray-blue d-flex justify-content-between align-items-center p-4 py-4 rounded-top position-relative">
              <div className="fw-medium text-white font-m">Paste this code inside Body tag</div>

              <a
                href="/#"
                className="bg-white rounded p-2 text-primary fs-12px copy-button copy-identifier copy-widget"
                onClick={(e) => {
                  e.preventDefault();
                  copyToClipboard(`
                    <script>
                          window.WIDGET_BASE_URL = "https://${window.location.hostname}/v1";
                          window.WIDGET_ID = ${params?.id};
                          window.IFRAME_SRC = "https://cdn.softwaretech-demo.com/widget"
                    </script>
                    <script defer src="https://cdn.softwaretech-demo.com/widget/js/widgetInit.js"></script>
`);
                }}
              >
                <img className="me-1" src="/assets/CopySimpleblack.svg" alt="" />
                Copy
              </a>
            </div>
            <div className="card-body bg-dark-gray-blue rounded-bottom p-4">
              <div className="app widget-embed text-white">
                <div className="d-flex flex-column gap-2">
                  {'<script>'}
                  <br />
                  <span
                    style={{ marginLeft: '40px' }}
                  >{`window.WIDGET_BASE_URL = "https://${window.location.hostname.replace(
                    'app.',
                    ''
                  )}/v1";`}</span>
                  {/* <br /> */}
                  <span style={{ marginLeft: '40px' }}>{`window.WIDGET_ID = ${params?.id};`}</span>
                  <span style={{ marginLeft: '40px' }}>
                    {'window.IFRAME_SRC = "https://cdn.softwaretech-demo.com/widget"'}
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

        {/* agent code */}
        <div className="embed-code mt-5 mb-5 d-none">
          <div className="bg-soft-peach rounded mt-3">
            <div className="code-border-bottom bg-dark-gray-blue d-flex justify-content-between align-items-center p-4 py-4 rounded-top position-relative">
              <div className="fw-medium text-white">Identify the agent (Optional)</div>
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="bg-white rounded p-2 text-primary fs-12px copy-button copy-identifier copy-widget"
              >
                <img className="me-1" src="/assets/CopySimpleblack.svg" alt="" />
                Copy
              </a>
            </div>
            <div className="card-body bg-dark-gray-blue rounded-bottom p-4 ">
              <div className="app widget-embed text-white">
                <div className="d-flex flex-column gap-2">
                  {' // Copy the below lines under'}
                  <br />
                  window.fcWidget.init inside initFreshChat
                  <br />{' '}
                  {`//
                  To set unique agent id in your system when
                  it is available`}
                  <br />
                  window.fcWidget.setExternalId(&quot;john.doe1987&quot;);
                  <br />
                  {' // To set agent name'}
                  <br />
                  window.fcWidget.agent.setFirstName(&quot;John&quot;);
                  <br />
                  {' // To set agent email'}
                  <br />
                  window.fcWidget.agent.setEmail(&quot;john.doe@gmail.com&quot;);
                  <br />
                  {' // To set agent properties'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWidgetEmbedCode;
