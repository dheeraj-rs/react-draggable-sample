import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../badges/StatusBadge';

function ChannelBox({
  widget,
  channelImg,
  isDefault,
  setShowDeleteWidgetModal,
  setShowRenameWidgetModal,
  setShowWidgetEmbededCodeModal,
  path = '',
  creatdBy = '',
}) {
  const navigate = useNavigate();

  const handleDivClick = (event) => {
    // Check if the clicked element is not with id "dropdownMenuLink" or "dropdown-action-img"
    if (
      event?.target?.id !== 'dropdownMenuLink' &&
      event?.target?.id !== 'dropdown-action-img' &&
      event?.target?.id !== 'widget-action'
    ) {
      // Navigate to another page when the user clicks on the div
      navigate(path);
    }
  };

  return (
    <div
      className="col-lg-3 col-sm-6 mt-4 col-md-6"
      id={widget?.id}
      onClick={(event) => {
        handleDivClick(event);
      }}
    >
      <div>
        <div className="shadow-6 rounded chat-settings-box cursor-pointer">
          <div className="d-flex gap-4 px-4 py-4 justify-content-between create-channel">
            <div>
              <img src={channelImg} alt="" />
            </div>
            {isDefault ? (
              <div>
                <StatusBadge title="Default" />
              </div>
            ) : null}

            <div>
              <div className="dropdown dropup drop-lg-down mt-n3" id="widget-actions">
                <a
                  data-bs-display="static"
                  className="dropdown-toggle-new"
                  href="/#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src="/assets/vertical-dots.svg" alt="" id="dropdown-action-img" />
                </a>

                <ul
                  className="dropdown-menu dropdown-menu-right rounded shadow-6 dropdown-widget"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li id="widget-action">
                    <a
                      id="widget-action"
                      href="/#"
                      className="dropdown-item dropdown-channel py-3 px-4"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowWidgetEmbededCodeModal({
                          id: widget?.id,
                          isVisible: true,
                        });
                      }}
                    >
                      Widget code
                    </a>
                  </li>
                  <li id="widget-action">
                    <a
                      id="widget-action"
                      href="/#"
                      className="dropdown-item dropdown-channel py-3 px-4"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowRenameWidgetModal({
                          id: widget?.id,
                          isVisible: true,
                          name: widget?.attributes?.name,
                        });
                      }}
                    >
                      Rename
                    </a>
                  </li>
                  {isDefault === false ? (
                    <li id="widget-action">
                      <a
                        id="widget-action"
                        href="/#"
                        className="dropdown-item dropdown-channel py-3 px-4"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowDeleteWidgetModal({
                            id: widget?.id,
                            isVisible: true,
                            name: widget?.attributes?.name,
                          });
                        }}
                      >
                        Delete
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>

          <div
            className="px-4 pb-4 create-channel"
            onClick={() => {
              navigate(path);
            }}
          >
            <span className="mb-0 fw-medium text-primary">{widget?.attributes?.name}</span>
            <p className="mb-0 text-secondary">
              Created by: {creatdBy}
              <span> </span>
            </p>
          </div>
        </div>
      </div>
      {/* </a> */}
    </div>
  );
}

export default ChannelBox;
