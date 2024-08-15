/* eslint-disable no-lonely-if */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import {
  CreateFaqCategory,
  ListFaqCategories,
} from '../../../common/api-collection/ChatWidget/FAQ/FaqCategories';

function MapFaqOffcanvas({
  setShowUmmapModal,
  setToastAction,
  setRefreshChatFaqs,
  refreshChatFaqs,
  listChatWidgetFaqCategories,
  setShowMapFaqCanvas,
  showMapFaqCanvas,
}) {
  const params = useParams();

  const categorys = [];
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [faqCategoriesList, setFaqCategoriesList] = useState();
  const [availableCategoryIds, setAvailableCategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMapFaqs = () => {
    const data = {
      type: 'chat_widget_faq_categories',
      attributes: {
        widget_id: parseInt(params?.id, 10),
      },
      relationships: {
        category_ids: {
          data: selectedCategories,
        },
      },
    };
    setLoading(true);
    CreateFaqCategory(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'You have successfully Saved',
        });
        setRefreshChatFaqs(!refreshChatFaqs);
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

  const selectCategory = (selectedCategory) => {
    const foundItem = selectedCategories.find((topic) => topic?.id === selectedCategory?.id);
    if (!foundItem) {
      // add id to array
      setSelectedCategories([...selectedCategories, selectedCategory]);
    } else {
      if (selectedCategories.length === 1) {
        setShowUmmapModal({ type: 'faq', show: true });
      } else {
        // remove id from array
        const newArray = selectedCategories.filter((topic) => topic?.id !== selectedCategory?.id);
        setSelectedCategories(newArray);
      }
    }
  };

  const checkValueInArray = (id) => {
    selectedCategories.find((topic) => parseInt(topic?.id, 10) === parseInt(id, 10));
    if (selectedCategories.find((topic) => parseInt(topic?.id, 10) === parseInt(id, 10))) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    ListFaqCategories()?.then((response) => {
      setFaqCategoriesList(response);
    });
  }, []);

  useEffect(() => {
    if (faqCategoriesList?.data?.length > 0) {
      faqCategoriesList?.data?.map((category) => {
        categorys.push({
          type: 'category',
          id: parseInt(category?.id, 10),
        });
        return null;
      });
      setAvailableCategoryIds(categorys);
    }
  }, [faqCategoriesList, setShowMapFaqCanvas]);

  useEffect(() => {
    if (listChatWidgetFaqCategories?.data?.length > 0) {
      listChatWidgetFaqCategories?.data?.map((topic) => {
        categorys.push({
          type: 'chat_widget_faq_categories',
          id: parseInt(topic?.attributes?.category_id, 10),
        });
        return null;
      });
      setSelectedCategories(categorys);
    } else {
      setSelectedCategories([]);
    }
  }, [listChatWidgetFaqCategories, showMapFaqCanvas]);

  return (
    <div
      className="offcanvas offcanvas-end map-topic-canvas"
      tabIndex="-1"
      id="offcanvasMapfaq"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header d-flex align-items-center p-4">
        <div className="d-flex flex-column">
          <h5 className="offcanvas-title fs-16px fw-medium" id="offcanvasRightLabel">
            Map FAQs
          </h5>
          <p className="text-secondary mb-0 fs-13px">Choose FAQs you wish to show in the widget</p>
        </div>
        <div className="ms-auto">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={() => {
              setSelectedCategories([]);
              setShowMapFaqCanvas(false);
            }}
          />
        </div>
      </div>
      <div className="offcanvas-body p-4">
        <SearchWithBorder
          placeholderText="Search faq"
          onChange={() => {}}
          searchTerm=""
          clearBtn={() => {}}
        />

        <div className="d-flex justify-content-between mt-3">
          <p className="fs-13px text-primary mb-0">Select FAQs</p>
          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategories(availableCategoryIds);
            }}
            className="fs-13px text-blue-active mb-0 fw-medium"
          >
            Select All
          </a>
        </div>

        <div className="scroll-chat-topic scroll-custom pe-3 ps-1">
          {/* <!-- map faq starts --> */}
          {faqCategoriesList?.data?.map((category) => (
            <div
              key={category?.id}
              role="button"
              // data-bs-toggle="modal"
              // data-bs-target="#faqModal"
              className="map-topics d-flex align-items-center mt-3 gap-3 shadow-6 rounded p-3 map-topics-active"
            >
              <div>
                <img src="/assets/faq-1.svg" alt="" />
              </div>
              <div>
                <p className="fs-13px text-primary mb-0 fw-medium">{category?.attributes?.name}</p>
              </div>

              <div className="ms-auto">
                <div className="check-box">
                  <input
                    type="checkbox"
                    id="faq-1"
                    checked={checkValueInArray(category?.id)}
                    onChange={() => {}}
                  />
                  <label
                    className="text-primary mb-0"
                    // htmlFor="faq-1"
                    onClick={() => {
                      selectCategory({
                        type: 'category',
                        id: parseInt(category?.id, 10),
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* <!-- map faq ends --> */}
        </div>

        <div className="setting-buttons d-flex align-items-end mt-4 mb-4 position-absolute bottom-0">
          <button
            id="saveFaq"
            data-bs-dismiss="offcanvas"
            type="button"
            className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
            onClick={() => {
              handleMapFaqs();
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
              setSelectedCategories([]);
              setShowMapFaqCanvas(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default MapFaqOffcanvas;
