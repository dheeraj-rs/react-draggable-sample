import React from 'react';
import { Link } from 'react-router-dom';
import AgentBadge from './AgentBadge';
import AgentUserListing from './AgentUserListing';

function WebView() {
  return (
    <div>
      {/* <!-- table row starts --> */}
      <div>
        <table className="table agent-table">
          <tbody>
            <tr className="mt-5 bg-white shadow-deep rounded mb-3 d-flex flex-column flex-lg-row justify-content-between align-items-center">
              <td>
                <div className="d-flex flex-row align-items-center gap-3 p-3">
                  <div
                    role="button"
                    className="user-profile-icon bg-gray-blue d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded-circle fw-semibold"
                  >
                    <img src="/assets/men.svg" alt="" />
                    <img src="/assets/selected-img.svg" alt="" style={{ display: 'none' }} />
                  </div>
                  <div className="d-flex flex-column justify-content-start">
                    <div className="fw-medium">Steven Paul</div>
                    <div className="text-secondary">Ext. 1234</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex flex-column p-3">
                  <div>
                    <Link className="text-blue-active fw-normal" to="/">
                      Paige@example.com
                    </Link>
                  </div>
                  <div>
                    <span className="text-secondary">+12345678312</span>
                  </div>
                </div>
              </td>
              <td>
                <AgentBadge
                  bgColor="sandwisp"
                  color="red-fox"
                  title="Organization admin"
                  size="13px"
                />
              </td>
              <td>
                {' '}
                <div>
                  <Link to="/">
                    <img src="/assets/briefcase-light.svg" alt="" />
                  </Link>
                </div>
              </td>
              <td className="d-flex gap-4 align-items-center opacity-50">
                <div>
                  <p className="mb-0 text-muted">
                    Active
                    <Link data-bs-toggle="tooltip" data-bs-title="info" to="/">
                      <img className="ps-2" src="/assets/info-light.svg" alt="" />
                    </Link>
                  </p>
                </div>

                <div>
                  <label className="switch">
                    <input type="checkbox" checked disabled="true" />
                    <span className="slider num-check round" />
                  </label>
                </div>
                <div className="dropdown">
                  <Link to="/" className="" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="/assets/vertical-dot.svg" alt="" />
                  </Link>

                  <ul className="dropdown-menu dropdown-menu-group p-3">
                    <li>
                      <Link to="/" className="dropdown-item py-3 px-4">
                        <img className="me-2" src="/assets/user-pic.svg" alt="" />
                        profile
                      </Link>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            {/* <!-- second row starts --> */}
            <AgentUserListing
              image="/assets/anne.svg"
              name="Alex Daniel"
              ext="Ext. 1234"
              email="Paige@example.com"
              mob="+12345678312"
            >
              <AgentBadge
                bgColor="pink-lace"
                color="purple-flower"
                title="Product admin"
                size="12px"
                medium="normal"
              />
            </AgentUserListing>

            {/* <!-- second row ends --> */}
            {/* <!-- third row starts --> */}
            <AgentUserListing
              image="/assets/men.svg"
              name="Anne Teak"
              ext="Ext. 1234"
              email="Paige@example.com"
              mob="+12345678312"
            >
              <AgentBadge
                bgColor="moonraker"
                color="cerulean-blue"
                title="Agent"
                size="12px"
                medium="normal"
              />
            </AgentUserListing>

            {/* <!-- third row ends --> */}
            {/* <!-- 4th row starts --> */}
            <AgentUserListing
              image="/assets/anne.svg"
              name="Ray Sin"
              ext="Ext. 1234"
              email="Paige@example.com"
              mob="+12345678312"
            >
              <AgentBadge
                bgColor="pale-mauve"
                color="barney"
                title="Supervisor"
                size="12px"
                medium="normal"
              />
            </AgentUserListing>

            {/* <!-- 4th row ends --> */}
            <AgentUserListing
              image="/assets/men.svg"
              name="Anne Teak"
              ext="Ext. 1234"
              email="Paige@example.com"
              mob="+12345678312"
            >
              <AgentBadge
                bgColor="moonraker"
                color="cerulean-blue"
                title="Agent"
                size="12px"
                medium="normal"
              />
            </AgentUserListing>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WebView;
