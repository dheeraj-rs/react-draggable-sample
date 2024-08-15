/* eslint-disable no-unused-expressions */
/* eslint-disable operator-linebreak */
/* eslint-disable no-lonely-if */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import { ListChatTopics } from '../../../common/api-collection/ChatWidget/ChatTopics';
import { CreateChatWidgetTopic } from '../../../common/api-collection/ChatWidget/ChatWidgetTopics';

function MappTopicsCanvas({
  setToastAction,
  setShowUmmapModal,
  setRefreshChatTopics,
  refreshChatTopics,
  chatWidgetTopicsList,
  showMapTopicCanvas,
  setShowMapTopicCanvas,
}) {
  const params = useParams();

  const topicIds = [];
  const selectedIds = [];

  const [selectedTopics, setSelectedTopics] = useState([]);
  const [availableTopicIds, setAvailableTopicIds] = useState([]);
  const [chatTopicsList, setChatTopicsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMapTopics = () => {
    const data = {
      type: 'chat_widget_topics',
      attributes: {
        widget_id: parseInt(params?.id, 10),
      },
      relationships: {
        topic_ids: {
          data: selectedTopics,
        },
      },
    };
    setLoading(true);
    CreateChatWidgetTopic(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'You have successfully Saved',
        });
        setRefreshChatTopics(!refreshChatTopics);
      })
      ?.catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while Saving!',
        });
      })
      ?.finally(() => {
        setLoading(false);
      });
  };

  const selectTopic = (selectedTopic) => {
    const foundItem = selectedTopics.find((topic) => topic?.id === selectedTopic?.id);
    if (!foundItem) {
      // add id to array
      setSelectedTopics([...selectedTopics, selectedTopic]);
    } else {
      if (selectedTopics.length === 1) {
        setShowUmmapModal({ type: 'topic', show: true });
      } else {
        // remove id from array
        const newArray = selectedTopics.filter((topic) => topic?.id !== selectedTopic?.id);
        setSelectedTopics(newArray);
      }
    }
  };

  const checkValueInArray = (id) => {
    selectedTopics.find((topic) => parseInt(topic?.id, 10) === parseInt(id, 10));
    if (selectedTopics.find((topic) => parseInt(topic?.id, 10) === parseInt(id, 10))) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (chatTopicsList?.length > 0) {
      chatTopicsList?.map((topic) => {
        topicIds.push({
          type: 'topic',
          id: parseInt(topic?.id, 10),
        });
        return null;
      });
      setAvailableTopicIds(topicIds);
    }
  }, [chatTopicsList]);

  useEffect(() => {
    ListChatTopics(searchTerm)?.then((response) => {
      setChatTopicsList(response?.data);
    });
  }, [searchTerm]);

  useEffect(() => {
    if (chatWidgetTopicsList?.data?.length > 0) {
      chatWidgetTopicsList?.data?.map((topic) => {
        selectedIds.push({
          type: 'topic',
          id: parseInt(topic?.attributes?.topic_id, 10),
        });
        setSelectedTopics(selectedIds);
        return null;
      });
    } else {
      setSelectedTopics([]);
    }
  }, [chatWidgetTopicsList, showMapTopicCanvas]);

  return (
    <div
      className="offcanvas offcanvas-end map-topic-canvas"
      tabIndex="-1"
      id="offcanvasMapBot"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header d-flex align-items-center">
        <div className="d-flex flex-column">
          <h5 className="offcanvas-title fs-16px fw-medium" id="offcanvasRightLabel">
            Map Topics
          </h5>
          <p className="text-secondary mb-0 fs-13px">
            Choose topics you wish to show in the widget
          </p>
        </div>
        <div className="ms-auto">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={() => {
              setSelectedTopics([]);
              setShowMapTopicCanvas(false);
            }}
          />
        </div>
      </div>
      <div className="offcanvas-body p-4">
        <SearchWithBorder
          placeholderText="Search Topics"
          onChange={(e) => {
            setSearchTerm(e?.target?.value);
          }}
          searchTerm={searchTerm}
          clearBtn={() => {
            setSearchTerm('');
          }}
        />

        <div className="d-flex justify-content-between mt-3">
          <p className="fs-13px text-primary mb-0">Select topics</p>
          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              setSelectedTopics(availableTopicIds);
            }}
            className="fs-13px text-blue-active mb-0 fw-medium"
          >
            Select All
          </a>
        </div>

        <div className="scroll-chat-topic scroll-custom pe-3 ps-1">
          {/* <!-- map topic starts --> */}
          {chatTopicsList?.length > 0 &&
            chatTopicsList?.map((topic) => (
              <div
                key={topic?.id}
                role="button"
                // data-bs-toggle="modal"
                // data-bs-target="#unMapModal"
                className="map-topics d-flex align-items-center mt-3 gap-3 shadow-6 rounded p-3 map-topics-active"
              >
                <div>
                  <img
                    src={topic?.attributes?.topic_media_url || '/assets/welcome-build.svg'}
                    width="40px"
                    height="40px"
                    alt=""
                  />
                </div>
                <div>
                  <p className="fs-13px text-primary mb-0 fw-medium">{topic?.attributes?.title}</p>
                </div>

                <div className="ms-auto">
                  <div className="check-box">
                    <input
                      type="checkbox"
                      id="topics-1"
                      checked={checkValueInArray(topic?.id)}
                      onChange={() => {}}
                    />
                    <label
                      className="text-primary mb-0"
                      htmlFor="topics-1"
                      id="topics-1"
                      onClick={() => {
                        selectTopic({
                          type: 'topic',
                          id: parseInt(topic?.id, 10),
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          {/* <!-- map topic ends --> */}
        </div>

        <div className="setting-buttons d-flex align-items-end mt-4 mb-4 position-absolute bottom-0 bg-white faq-save">
          <button
            id="saveMapTopics"
            data-bs-dismiss="offcanvas"
            type="button"
            className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
            onClick={() => {
              handleMapTopics();
            }}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            data-bs-dismiss="offcanvas"
            className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
            onClick={() => {
              setSelectedTopics([]);
              setShowMapTopicCanvas(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default MappTopicsCanvas;
