/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import ArticleListing from '../../SupportWidget/components/ArticleListing';
import { ListChatWidgetTopics } from '../../../common/api-collection/ChatWidget/ChatWidgetTopics';
import { ListChatWidgetFaqCategories } from '../../../common/api-collection/ChatWidget/FAQ/ChatWidgetFaqCategories';

function Articles({
  showArticleDetails,
  setShowArticleDetails,
  type,
  setShowFAQListing,
  showFAQListing,
  showArticles,
  refreshChatTopics,
  isBrandingHidden,
  refreshChatFaqs,
}) {
  const params = useParams();

  const [chatTopicsList, setChatTopicsList] = useState([]);
  const [chatFaqList, setChatFaqList] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const getTopicDetails = (id) => {
    if (chatTopicsList?.included?.length > 0) {
      const foundValue = chatTopicsList?.included.find(
        (value) => parseInt(value?.id, 10) === parseInt(id, 10)
      );
      return foundValue;
    }
    return null;
  };

  const getFaqDetails = (id) => {
    if (chatFaqList?.included?.length > 0) {
      const foundValue = chatFaqList?.included.find(
        (value) => parseInt(value?.id, 10) === parseInt(id, 10)
      );
      return foundValue;
    }
    return null;
  };

  useEffect(() => {
    ListChatWidgetTopics(params?.id, searchTerm)?.then((response) => {
      setChatTopicsList({
        data: response?.data,
        included: response?.included,
      });
    });
  }, [searchTerm, refreshChatTopics]);

  useEffect(() => {
    ListChatWidgetFaqCategories(params?.id)?.then((response) => {
      setChatFaqList({
        data: response?.data,
        included: response?.included,
      });
    });
  }, [refreshChatFaqs]);

  return (
    <>
      {/* <!-- articles --> */}
      <div
        className={`scroll-wrap-right scroll-custom  ${
          showArticleDetails?.show || showFAQListing || showArticles === false ? 'd-none' : ''
        }`}
      >
        <div className="accordion-body rounded-bottom contact-form-article" id="contact-article">
          <div className="pt-3 px-4">
            <div className="ms-auto">
              <SearchWithBorder
                placeholderText="Search Topics"
                searchTerm={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e?.target?.value);
                }}
                clearBtn={() => {
                  setSearchTerm('');
                }}
              />
            </div>
          </div>
          <hr />
          <div className="pt-2 px-xl-4 px-md-3 px-sm-3 pe-lg-2 related-article">
            {chatTopicsList?.data?.length > 0 && <h6 className="fs-14 fw-600">Topics</h6>}
            <div className="pb-80px">
              {chatTopicsList?.data?.length > 0 &&
                chatTopicsList?.data?.map((topic) => (
                  <ArticleListing
                    key={topic?.id}
                    data={topic}
                    classarticle="sample-article"
                    onClick={() => {
                      setShowArticleDetails({ show: true });
                    }}
                    list={chatTopicsList}
                    mediaUrl={
                      getTopicDetails(topic?.attributes?.topic_id)?.attributes?.topic_media_url
                    }
                    id={getTopicDetails(topic?.attributes?.topic_id)?.attributes?.topic_id}
                    title={getTopicDetails(topic?.attributes?.topic_id)?.attributes?.title}
                    message={getTopicDetails(topic?.attributes?.topic_id)?.attributes?.message}
                  />
                ))}
              {/* <!-- articles list --> */}

              <div className={`faq-article ${type === 3 ? '' : 'd-none'} `}>
                {chatFaqList?.data?.length > 0 && (
                  <p className="mb-0 fw-medium text-primary mt-3">FAQs</p>
                )}
                {chatFaqList?.data?.length > 0 &&
                  chatFaqList?.data?.map((faq) => (
                    <ArticleListing
                      key={faq?.id}
                      data={faq}
                      classarticle="sample-article"
                      onClick={() => {
                        setShowFAQListing(true);
                      }}
                      list={chatFaqList}
                      mediaUrl={
                        getFaqDetails(faq?.attributes?.category_id)?.attributes?.category_media_url
                      }
                      id={getFaqDetails(faq?.attributes?.category_id)?.id}
                      title={getFaqDetails(faq?.attributes?.category_id)?.attributes?.name}
                      message={getFaqDetails(faq?.attributes?.category_id)?.attributes?.description}
                    />
                  ))}
              </div>
            </div>
            {isBrandingHidden === false && (
              <p className="text-center mt-4 text-dark-blue-bb mt-5">
                <span className="powered-label">Powered by, Gsoftcomm</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* <!-- article detail --> */}
    </>
  );
}

export default Articles;
