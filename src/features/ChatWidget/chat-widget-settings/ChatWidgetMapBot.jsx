/* eslint-disable operator-linebreak */
import React from 'react';
import StatusBadge from '../../../common/components/badges/StatusBadge';

function ChatWidgetMapBot({ chatTopicsList, setTopicIdSelected, setShowMapTopicCanvas }) {
  const getDetails = (id) => {
    if (chatTopicsList?.included?.length > 0) {
      const foundValue = chatTopicsList?.included.find(
        (value) => parseInt(value?.id, 10) === parseInt(id, 10)
      );
      return foundValue;
    }
    return null;
  };

  return (
    <div className="tab-pane fade " id="tab-map-bot" role="tabpanel" aria-labelledby="map-bot-tab">
      <div className=" p-1 pe-3">
        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <div className="d-flex align-items-center mt-30 gap-3 mb-4">
              <div className="d-flex align-items-start align-items-lg-center flex-column flex-lg-row ">
                <p className="fw-normal text-primary fs-16px mb-0 pe-4">Topics</p>
                <a
                  href="/#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="text-blue-active"
                >
                  <img className="me-2" src="/assets/manage-topic.svg" alt="" />
                  Manage Topics
                </a>
              </div>
              <div className="ms-auto d-flex ">
                <button
                  id="mapTopics"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasMapBot"
                  type="button"
                  className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                  onClick={() => {
                    setShowMapTopicCanvas(true);
                  }}
                >
                  Map Topics
                </button>
              </div>
            </div>
            <ul className="sortable-list">
              {chatTopicsList?.data?.length > 0 &&
                chatTopicsList?.data?.map((topic, index) => (
                  <li
                    className="maptoboat mt-4 item d-flex flex-column flex-md-row align-items-start align-items-md-center p-3 py-4 shadow-6 rounded bg-white mt-2 gap-4"
                    key={topic?.id}
                  >
                    <div className="d-flex align-items-center gap-4">
                      <div className="cursor-move" draggable="true">
                        <img src="/assets/drag-dot.svg" alt="" />
                      </div>
                      <a
                        className="position-relative"
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <img
                          src={topic?.attributes?.topic_media_url || '/assets/g-building.svg'}
                          alt=""
                          width="40px"
                          height="40px"
                        />
                      </a>
                      <div className="d-flex flex-column gap-2">
                        <div className="text-primary fw-medium">
                          <span className="pe-3">
                            {getDetails(topic?.attributes?.topic_id)?.attributes?.title}
                          </span>
                          {index === 0 && <StatusBadge title="Default" />}
                        </div>
                        <div className=" fs-12px" style={{ maxWidth: '400px', overflow: 'hidden' }}>
                          {getDetails(topic?.attributes?.topic_id)?.attributes?.message}
                        </div>
                      </div>
                    </div>

                    <div className="ms-md-auto d-flex gap-lg-3 gap-2 justify-content-between align-items-center w-100">
                      <div className="form-group">
                        <div className="dropdown bot-dropdown">
                          <div className="d-flex align-items-center justify-content-between gap-3 p-2">
                            <div className="bot-selected-name-widh">
                              <div
                                id="selectedBotName"
                                className="d-flex align-items-center gap-3 "
                              >
                                <a
                                  className="bg-saffron-mango d-flex align-items-center h-4 w-4 justify-content-center rounded"
                                  href="/#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                  }}
                                >
                                  <img src="/assets/bot-white-small.svg" alt="bot" />{' '}
                                </a>
                                <span className="selected-bot-name fw-medium">FGS Widget</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex gap-3">
                        <div
                          role="button"
                          data-bs-toggle="tooltip"
                          data-bs-title="Manage Topic"
                          className="manage-icon d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold"
                        >
                          <img src="/assets/manage.svg" alt="manage" />
                        </div>
                        <div
                          role="button"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteModalTopics"
                          className="delete-icon d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold"
                          onClick={() => {
                            setTopicIdSelected({
                              type: 'Topic',
                              id: parseInt(topic?.id, 10),
                              title: getDetails(topic?.attributes?.topic_id)?.attributes?.title,
                            });
                          }}
                        >
                          <img src="/assets/Trash-img.svg" alt="trash" />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWidgetMapBot;
