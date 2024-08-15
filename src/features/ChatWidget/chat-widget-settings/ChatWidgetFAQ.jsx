/* eslint-disable operator-linebreak */
import React, { useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import { useParams } from 'react-router';

import 'react-tooltip/dist/react-tooltip.css';
import { ListChatWidgetFaqCategories } from '../../../common/api-collection/ChatWidget/FAQ/ChatWidgetFaqCategories';

function ChatWidgetFAQ({
  refreshChatFaqs,
  setListChatWidgetFaqCategories,
  listChatWidgetFaqCategories,
  setShowMapFaqCanvas,
  setFaqSelected,
}) {
  const params = useParams();

  const getDetails = (id) => {
    if (listChatWidgetFaqCategories?.included?.length > 0) {
      const foundValue = listChatWidgetFaqCategories?.included.find(
        (value) => parseInt(value?.id, 10) === parseInt(id, 10)
      );
      return foundValue;
    }
    return null;
  };

  useEffect(() => {
    ListChatWidgetFaqCategories(params?.id)?.then((response) => {
      setListChatWidgetFaqCategories({
        data: response?.data,
        included: response?.included,
      });
    });
  }, [refreshChatFaqs]);

  return (
    <div className="tab-pane fade " id="tab-map-faq" role="tabpanel" aria-labelledby="map-faq-tab">
      {/* <div className="scroll-wrap scroll-custom p-1 pe-3"> */}
      <div className=" p-1 pe-3">
        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <div className="d-flex align-items-center mt-30 gap-3 mb-4">
              <div className="d-flex align-items-start align-items-lg-center flex-column flex-lg-row ">
                <p className="fw-normal text-primary fs-16px mb-0 pe-4">FAQs categories</p>
                <a
                  href="/calendar-settings/link-chat-topic-list"
                  className="text-blue-active"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <img className="me-2" src="/assets/manage-topic.svg" alt="" />
                  Manage FAQs
                </a>
              </div>
              <div className="ms-auto d-flex">
                <button
                  id="mapFAQs"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasMapfaq"
                  type="button"
                  className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                  onClick={() => {
                    setShowMapFaqCanvas(true);
                  }}
                >
                  Map FAQs
                </button>
              </div>
            </div>
            <ul className="sortable-list-faq">
              {listChatWidgetFaqCategories?.data?.map((category) => (
                <li
                  key={category?.id}
                  className="mt-4  item-faq d-flex  align-items-center p-3 py-4 shadow-6 rounded bg-white mt-2 gap-4"
                >
                  <div className="d-flex gap-4 align-items-center">
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
                        src={
                          getDetails(category?.attributes?.category_id)?.attributes
                            ?.category_media_url || '/assets/questioner.svg'
                        }
                        width="52px"
                        height="52px"
                        alt=""
                      />
                    </a>
                    <div className="d-flex flex-column gap-2">
                      <div className="text-primary fw-medium">
                        {getDetails(category?.attributes?.category_id)?.attributes?.name}
                      </div>
                      <div className="text-truncate fs-12px" style={{ whiteSpace: 'break-spaces' }}>
                        {getDetails(category?.attributes?.category_id)?.attributes?.description}
                      </div>
                    </div>
                  </div>

                  <div className="ms-auto d-flex align-items-center gap-3">
                    <div
                      role="button"
                      data-bs-toggle="tooltip"
                      data-bs-title="Manage FAQ"
                      className="manage-icon d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold"
                      data-tooltip-id="tooltip-manage-FAQ"
                    >
                      <img src="/assets/manage.svg" alt="manage" />
                    </div>
                    <Tooltip id="tooltip-manage-FAQ" content="Manage FAQ" place="top" />

                    <div
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModalTopics"
                      className="delete-icon d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold"
                      onClick={() => {
                        setFaqSelected({
                          id: parseInt(category?.id, 10),
                          type: 'category',
                          title: getDetails(category?.attributes?.category_id)?.attributes?.name,
                        });
                      }}
                    >
                      <img src="/assets/Trash-img.svg" alt="trash" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {/* map to bot starts */}

            {/* map to bot ends */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWidgetFAQ;
