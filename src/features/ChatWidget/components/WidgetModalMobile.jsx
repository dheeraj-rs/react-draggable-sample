/* eslint-disable no-else-return */
/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';

import Modal from '../../../common/components/modals/Modal';
import ModalClose from '../../../common/components/modals/ModalClose';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import ArticleListing from '../../SupportWidget/components/ArticleListing';
import ChatWidgetLeft from '../chat-widget-settings/ChatWidgetLeft';
import ChatWidgetRight from '../chat-widget-settings/ChatWidgetRight';
import LiveChatSectionAction from '../../SupportWidget/components/LiveChatSectionAction';
import FaqListing from './FaqListing';
import FaqDetails from './FaqDetails';

function WidgetModalMobile({
  type,
  showArticleDetails,
  setShowArticles,
  showArticles,
  setShowFAQListing,
  setShowArticleDetails,
  chatTopicsList,
  listChatWidgetFaqCategories,
  data,
  chatWidgetDetails,
  isBrandingHidden,
  showFAQListing,
  setShowFaqDetails,
  showFaqDetails,
}) {
  const [activeLauncherButton, setActiveLauncherButton] = useState({
    id: 1,
    name: 'q-chat',
  });

  const [latestMessage, setLatestMessage] = useState({
    visible: false,
    message: '',
    sendMessage: '',
  });
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
    if (listChatWidgetFaqCategories?.included?.length > 0) {
      const foundValue = listChatWidgetFaqCategories?.included.find(
        (value) => parseInt(value?.id, 10) === parseInt(id, 10)
      );
      return foundValue;
    }
    return null;
  };

  const getLauncherButton = () => {
    if (activeLauncherButton?.name === 'q-chat') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
        >
          <path
            d="M7 10.5L9.625 13.125L14 8.75"
            stroke={data?.appearanceDetails?.launcherBtnTextColor}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.5 19.25C15.3324 19.25 19.25 15.3324 19.25 10.5C19.25 5.66751 15.3324 1.75 10.5 1.75C5.66751 1.75 1.75 5.66751 1.75 10.5C1.75 12.0937 2.1761 13.588 2.92059 14.875L2.1875 18.8125L6.125 18.0794C7.41201 18.8239 8.90627 19.25 10.5 19.25Z"
            stroke={data?.appearanceDetails?.launcherBtnTextColor}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    } else if (activeLauncherButton?.name === 'chat') {
      return (
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_491_16473)">
            <path
              d="M10.4998 12.4689C9.74177 12.4695 8.99541 12.2823 8.32743 11.9241C7.65944 11.5658 7.09064 11.0475 6.67188 10.4157L7.76519 9.68896C8.06455 10.1402 8.47092 10.5103 8.94806 10.7664C9.4252 11.0224 9.95828 11.1564 10.4998 11.1564C11.0413 11.1564 11.5744 11.0224 12.0515 10.7664C12.5286 10.5103 12.935 10.1402 13.2344 9.68896L14.3277 10.4157C13.9089 11.0475 13.3401 11.5658 12.6721 11.9241C12.0042 12.2823 11.2578 12.4695 10.4998 12.4689Z"
              fill={data?.appearanceDetails?.launcherBtnTextColor}
            />
            <path
              d="M13.125 5.25006C12.8654 5.25006 12.6117 5.32704 12.3958 5.47126C12.18 5.61548 12.0117 5.82046 11.9124 6.06029C11.8131 6.30012 11.7871 6.56402 11.8377 6.81862C11.8884 7.07322 12.0134 7.30708 12.1969 7.49064C12.3805 7.6742 12.6143 7.7992 12.8689 7.84984C13.1235 7.90049 13.3874 7.8745 13.6273 7.77516C13.8671 7.67582 14.0721 7.50759 14.2163 7.29175C14.3605 7.07591 14.4375 6.82215 14.4375 6.56256C14.4392 6.38973 14.4064 6.21829 14.3411 6.05829C14.2757 5.89828 14.1791 5.75291 14.0569 5.63069C13.9347 5.50848 13.7893 5.41186 13.6293 5.34651C13.4693 5.28115 13.2978 5.24836 13.125 5.25006Z"
              fill={data?.appearanceDetails?.launcherBtnTextColor}
            />
            <path
              d="M7.875 5.25006C7.61541 5.25006 7.36165 5.32704 7.14581 5.47126C6.92998 5.61548 6.76175 5.82046 6.66241 6.06029C6.56307 6.30012 6.53708 6.56402 6.58772 6.81862C6.63836 7.07322 6.76337 7.30708 6.94692 7.49064C7.13048 7.6742 7.36434 7.7992 7.61894 7.84984C7.87354 7.90049 8.13744 7.8745 8.37727 7.77516C8.6171 7.67582 8.82209 7.50759 8.9663 7.29175C9.11052 7.07591 9.1875 6.82215 9.1875 6.56256C9.1892 6.38973 9.15641 6.21829 9.09106 6.05829C9.0257 5.89828 8.92909 5.75291 8.80687 5.63069C8.68465 5.50848 8.53929 5.41186 8.37928 5.34651C8.21927 5.28115 8.04783 5.24836 7.875 5.25006Z"
              fill={data?.appearanceDetails?.launcherBtnTextColor}
            />
            <path
              d="M11.6391 19.6875L10.5 19.0312L13.125 14.4375H17.0625C17.2349 14.4378 17.4057 14.404 17.5651 14.3382C17.7245 14.2723 17.8693 14.1757 17.9912 14.0537C18.1132 13.9318 18.2098 13.787 18.2757 13.6276C18.3415 13.4682 18.3753 13.2974 18.375 13.125V3.9375C18.3753 3.76506 18.3415 3.59425 18.2757 3.43488C18.2098 3.27551 18.1132 3.1307 17.9912 3.00877C17.8693 2.88683 17.7245 2.79016 17.5651 2.72431C17.4057 2.65845 17.2349 2.62471 17.0625 2.625H3.9375C3.76506 2.62471 3.59425 2.65845 3.43488 2.72431C3.27551 2.79016 3.1307 2.88683 3.00877 3.00877C2.88683 3.1307 2.79016 3.27551 2.72431 3.43488C2.65845 3.59425 2.62471 3.76506 2.625 3.9375V13.125C2.62471 13.2974 2.65845 13.4682 2.72431 13.6276C2.79016 13.787 2.88683 13.9318 3.00877 14.0537C3.1307 14.1757 3.27551 14.2723 3.43488 14.3382C3.59425 14.404 3.76506 14.4378 3.9375 14.4375H9.84375V15.75H3.9375C3.59276 15.7501 3.25139 15.6822 2.93288 15.5503C2.61438 15.4184 2.32498 15.2251 2.08121 14.9813C1.83744 14.7375 1.64409 14.4481 1.51219 14.1296C1.3803 13.8111 1.31244 13.4697 1.3125 13.125V3.9375C1.3124 3.59275 1.38022 3.25136 1.51211 2.93283C1.64399 2.61431 1.83734 2.32489 2.08111 2.08111C2.32489 1.83734 2.61431 1.64399 2.93283 1.51211C3.25136 1.38022 3.59275 1.3124 3.9375 1.3125H17.0625C17.4072 1.3124 17.7486 1.38022 18.0672 1.51211C18.3857 1.64399 18.6751 1.83734 18.9189 2.08111C19.1627 2.32489 19.356 2.61431 19.4879 2.93283C19.6198 3.25136 19.6876 3.59275 19.6875 3.9375V13.125C19.6876 13.4697 19.6197 13.8111 19.4878 14.1296C19.3559 14.4481 19.1626 14.7375 18.9188 14.9813C18.675 15.2251 18.3856 15.4184 18.0671 15.5503C17.7486 15.6822 17.4072 15.7501 17.0625 15.75H13.8893L11.6391 19.6875Z"
              fill={data?.appearanceDetails?.launcherBtnTextColor}
            />
          </g>
          <defs>
            <clipPath id="clip0_491_16473">
              <rect width="21" height="21" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    } else if (activeLauncherButton?.name === 'chat-bot') {
      return (
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.2001 7.4248C15.4545 7.4248 14.8501 8.02923 14.8501 8.7748C14.8501 9.52038 15.4545 10.1248 16.2001 10.1248C16.9457 10.1248 17.5501 9.52038 17.5501 8.7748C17.5501 8.02923 16.9457 7.4248 16.2001 7.4248Z"
            fill={data?.appearanceDetails?.launcherBtnTextColor}
          />
          <path
            d="M9.44995 8.7748C9.44995 8.02923 10.0544 7.4248 10.8 7.4248C11.5455 7.4248 12.15 8.02923 12.15 8.7748C12.15 9.52038 11.5455 10.1248 10.8 10.1248C10.0544 10.1248 9.44995 9.52038 9.44995 8.7748Z"
            fill={data?.appearanceDetails?.launcherBtnTextColor}
          />
          <path
            d="M14.175 3.3752C14.175 3.00241 13.8727 2.7002 13.5 2.7002C13.1272 2.7002 12.825 3.00241 12.825 3.3752V4.0502H8.775C7.65662 4.0502 6.75 4.95681 6.75 6.0752V11.4752C6.75 12.5936 7.65662 13.5002 8.775 13.5002H18.225C19.3433 13.5002 20.25 12.5936 20.25 11.4752V6.0752C20.25 4.95681 19.3433 4.0502 18.225 4.0502H14.175V3.3752ZM8.775 5.4002H18.225C18.5977 5.4002 18.9 5.70241 18.9 6.0752V11.4752C18.9 11.848 18.5977 12.1502 18.225 12.1502H8.775C8.40221 12.1502 8.1 11.848 8.1 11.4752V6.0752C8.1 5.70241 8.40221 5.4002 8.775 5.4002Z"
            fill={data?.appearanceDetails?.launcherBtnTextColor}
          />
          <path
            d="M13.8376 24.2977C17.3687 24.2525 19.5007 23.4941 20.752 22.3524C21.9335 21.2743 22.222 19.9547 22.2679 18.9025H22.2751V17.9716C22.2751 16.6226 21.1816 15.5291 19.8325 15.5291H15.5251V15.5249H11.4751V15.5291H7.16765C5.81867 15.5291 4.7251 16.6226 4.7251 17.9716V18.9025H4.73229C4.77817 19.9547 5.06661 21.2743 6.24817 22.3524C7.49943 23.4941 9.63156 24.2525 13.1626 24.2977V24.2999H13.8376V24.2977ZM7.16765 16.8791H19.8325C20.436 16.8791 20.9251 17.3682 20.9251 17.9716V18.5624C20.9251 19.4934 20.748 20.5285 19.8421 21.3551C18.914 22.202 17.0918 22.9499 13.5001 22.9499C9.90837 22.9499 8.08618 22.202 7.15812 21.3551C6.25226 20.5285 6.0751 19.4934 6.0751 18.5624V17.9716C6.0751 17.3682 6.56424 16.8791 7.16765 16.8791Z"
            fill={data?.appearanceDetails?.launcherBtnTextColor}
          />
        </svg>
      );
    } else if (activeLauncherButton?.name === 'text-message') {
      return (
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.14388 16.5312H17.9688C18.35 16.5312 18.7156 16.3798 18.9852 16.1102C19.2548 15.8406 19.4062 15.475 19.4062 15.0938V5.75C19.4062 5.36875 19.2548 5.00312 18.9852 4.73353C18.7156 4.46395 18.35 4.3125 17.9688 4.3125H5.03125C4.65 4.3125 4.28437 4.46395 4.01478 4.73353C3.7452 5.00312 3.59375 5.36875 3.59375 5.75V18.5725L6.14388 16.5312ZM6.64844 17.9688L3.3235 20.6281C3.21781 20.7125 3.09046 20.7654 2.95608 20.7806C2.82169 20.7959 2.68573 20.7729 2.56382 20.7144C2.4419 20.6558 2.33898 20.5641 2.26689 20.4496C2.19479 20.3352 2.15644 20.2027 2.15625 20.0675V5.75C2.15625 4.9875 2.45915 4.25623 2.99832 3.71707C3.53748 3.1779 4.26875 2.875 5.03125 2.875H17.9688C18.7312 2.875 19.4625 3.1779 20.0017 3.71707C20.5408 4.25623 20.8438 4.9875 20.8438 5.75V15.0938C20.8438 15.8562 20.5408 16.5875 20.0017 17.1267C19.4625 17.6658 18.7312 17.9688 17.9688 17.9688H6.64844Z"
            fill={data?.appearanceDetails?.launcherBtnTextColor}
          />
          <path
            d="M11.5001 11.2126C11.1951 11.2126 10.9026 11.0914 10.6869 10.8758C10.4713 10.6601 10.3501 10.3676 10.3501 10.0626C10.3501 9.7576 10.4713 9.46509 10.6869 9.24943C10.9026 9.03376 11.1951 8.9126 11.5001 8.9126C11.8051 8.9126 12.0976 9.03376 12.3133 9.24943C12.5289 9.46509 12.6501 9.7576 12.6501 10.0626C12.6501 10.3676 12.5289 10.6601 12.3133 10.8758C12.0976 11.0914 11.8051 11.2126 11.5001 11.2126ZM15.8126 11.2126C15.5076 11.2126 15.2151 11.0914 14.9994 10.8758C14.7838 10.6601 14.6626 10.3676 14.6626 10.0626C14.6626 9.7576 14.7838 9.46509 14.9994 9.24943C15.2151 9.03376 15.5076 8.9126 15.8126 8.9126C16.1176 8.9126 16.4101 9.03376 16.6258 9.24943C16.8414 9.46509 16.9626 9.7576 16.9626 10.0626C16.9626 10.3676 16.8414 10.6601 16.6258 10.8758C16.4101 11.0914 16.1176 11.2126 15.8126 11.2126ZM7.1876 11.2126C6.8826 11.2126 6.59009 11.0914 6.37443 10.8758C6.15876 10.6601 6.0376 10.3676 6.0376 10.0626C6.0376 9.7576 6.15876 9.46509 6.37443 9.24943C6.59009 9.03376 6.8826 8.9126 7.1876 8.9126C7.4926 8.9126 7.7851 9.03376 8.00077 9.24943C8.21644 9.46509 8.3376 9.7576 8.3376 10.0626C8.3376 10.3676 8.21644 10.6601 8.00077 10.8758C7.7851 11.0914 7.4926 11.2126 7.1876 11.2126Z"
            fill={data?.appearanceDetails?.launcherBtnTextColor}
          />
        </svg>
      );
    } else if (activeLauncherButton?.name === 'support-chat') {
      return (
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.5843 13.8061C18.5843 13.2564 18.3659 12.7292 17.9772 12.3405C17.5885 11.9518 17.0613 11.7334 16.5116 11.7334H16.5093C15.9596 11.7334 15.4324 11.9518 15.0437 12.3405C14.655 12.7292 14.4366 13.2564 14.4366 13.8061C14.4366 14.7328 14.4366 15.9433 14.4366 16.87C14.4366 17.4196 14.655 17.9468 15.0437 18.3355C15.4324 18.7242 15.9596 18.9426 16.5093 18.9426H16.5116C17.0613 18.9426 17.5885 18.7242 17.9772 18.3355C18.3659 17.9468 18.5843 17.4196 18.5843 16.87V13.8061ZM8.57389 13.8061C8.57391 13.2564 8.35553 12.7292 7.96683 12.3405C7.57813 11.9518 7.05096 11.7334 6.50124 11.7334H6.49892C5.94922 11.7334 5.42203 11.9518 5.03333 12.3405C4.64463 12.7292 4.42627 13.2564 4.42627 13.8061C4.42627 14.7328 4.42627 15.9433 4.42627 16.87C4.42627 17.4196 4.64463 17.9468 5.03333 18.3355C5.42203 18.7242 5.94922 18.9426 6.49892 18.9426H6.50124C7.05096 18.9426 7.57813 18.7242 7.96683 18.3355C8.35553 17.9468 8.57391 17.4196 8.57389 16.87V13.8061ZM17.2395 13.8061V16.87C17.2395 17.063 17.1628 17.2482 17.0263 17.3847C16.8898 17.5212 16.7047 17.5979 16.5116 17.5979C16.5116 17.5979 16.5093 17.5979 16.5093 17.5979C16.3162 17.5979 16.1311 17.5212 15.9946 17.3847C15.858 17.2482 15.7814 17.063 15.7814 16.87V13.8061C15.7814 13.613 15.858 13.4278 15.9946 13.2913C16.1311 13.1548 16.3162 13.0781 16.5093 13.0781C16.5093 13.0781 16.5116 13.0781 16.5116 13.0781C16.7047 13.0781 16.8898 13.1548 17.0263 13.2913C17.1628 13.4278 17.2395 13.613 17.2395 13.8061ZM7.22917 13.8061V16.87C7.22917 17.063 7.15249 17.2482 7.01597 17.3847C6.87946 17.5212 6.69432 17.5979 6.50128 17.5979C6.5012 17.5979 6.49894 17.5979 6.49894 17.5979C6.30584 17.5979 6.1207 17.5212 5.9842 17.3847C5.84769 17.2482 5.77098 17.063 5.77098 16.87V13.8061C5.77098 13.613 5.84769 13.4278 5.9842 13.2913C6.1207 13.1548 6.30584 13.0781 6.49889 13.0781C6.49898 13.0781 6.50124 13.0781 6.50124 13.0781C6.69432 13.0781 6.87946 13.1548 7.01597 13.2913C7.15249 13.4278 7.22917 13.613 7.22917 13.8061Z"
            fill={data?.appearanceDetails?.launcherBtnTextColor}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.3667 15.3778V10.6127C20.3666 6.2805 16.8547 2.76855 12.5225 2.76855C11.8475 2.76855 11.1632 2.76855 10.4882 2.76855C6.15599 2.76855 2.64404 6.2805 2.64404 10.6127C2.64404 13.1461 2.64404 15.3778 2.64404 15.3778C2.64404 15.7489 2.9453 16.0501 3.3164 16.0501C3.68748 16.0501 3.98876 15.7489 3.98876 15.3778V10.6127C3.98878 7.02315 6.89868 4.11327 10.4882 4.11327C11.1632 4.11327 11.8475 4.11327 12.5225 4.11327C16.112 4.11327 19.0219 7.02315 19.0219 10.6127C19.0219 10.6127 19.0219 15.3778 19.0219 15.3778C19.0219 15.7489 19.3232 16.0501 19.6943 16.0501C20.0654 16.0501 20.3667 15.7489 20.3667 15.3778ZM9.50327 6.11535H13.107C13.4781 6.11535 13.7794 5.81406 13.7794 5.44299C13.7794 5.07189 13.4781 4.77063 13.107 4.77063H9.50327C9.13217 4.77063 8.83091 5.07189 8.83091 5.44299C8.83091 5.81406 9.13217 6.11535 9.50327 6.11535Z"
            fill={data?.appearanceDetails?.launcherBtnTextColor}
          />
        </svg>
      );
    }
    return null;
  };

  useEffect(() => {
    if (chatWidgetDetails?.id) {
      setActiveLauncherButton({
        id: '',
        name: chatWidgetDetails?.attributes?.launcher_button_icon,
      });
    }
  }, [chatWidgetDetails]);

  return (
    <>
      {/* <!-- widget modal on mobile --> */}

      <Modal width="429px" id="widgetmodalmob">
        <div className="d-flex justify-content-between">
          <p className="fs-17px text-primary fw-medium mb-24px">Preview</p>
          <ModalClose />
        </div>

        <div className="bg-tranparent rounded-top border-0 fs-12px">
          <div className="border-0 shadow-8 rounded-bottom">
            <div
              className={`change d-flex align-items-center p-3 py-4 fs-12px shadow-8 ${
                data?.appearanceDetails?.bannerBgColorOne ? '' : 'bg-blue-lotus'
              }  rounded-top`}
              style={{
                backgroundColor: data?.appearanceDetails?.bannerBgColorOne,
              }}
            >
              <div id="heading">
                <div className="d-flex align-items-center text-white justify-content-center gap-3">
                  <img src="/assets/headphone.svg" alt="" />
                  <div className="d-flex flex-column">
                    <span
                      className="fs-16px"
                      style={{
                        color: data?.appearanceDetails?.bannerTextColor || 'white',
                      }}
                    >
                      {' '}
                      {data?.configurationDetails?.bannerMessage || 'Hi, good to see you!'}
                    </span>
                    <span
                      className="font-13 opacity-75"
                      style={{
                        color: data?.appearanceDetails?.bannerTextColor || 'whitesmoke',
                      }}
                    >
                      {data?.configurationDetails?.bannerDescription || 'How can we help?'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- articles --> */}
            <div
              className={`accordion-body rounded-bottom contact-form-article ${
                showArticleDetails?.show || showFAQListing || showArticles === false ? 'd-none' : ''
              }`}
              id="contact-article"
            >
              <div className="pt-3 px-4">
                <div className="ms-auto">
                  <SearchWithBorder
                    placeholderText="Search Topics"
                    onChange={() => {}}
                    clearBtn={() => {}}
                  />
                </div>
              </div>
              <hr />
              <div className="px-3 pt-2 pb-3">
                <h6 className="fs-14 fw-600">Topics</h6>

                {/* <!-- articles list --> */}
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

                <div className={`${type === 3 ? '' : 'd-none'} faq-article`}>
                  {listChatWidgetFaqCategories?.data?.length > 0 && (
                    <p className="mb-0 fw-medium text-primary mt-3">FAQs</p>
                  )}

                  {listChatWidgetFaqCategories?.data?.length > 0 &&
                    listChatWidgetFaqCategories?.data?.map((faq) => (
                      <ArticleListing
                        key={faq?.id}
                        data={faq}
                        classarticle="sample-article"
                        onClick={() => {
                          setShowFAQListing(true);
                        }}
                        list={listChatWidgetFaqCategories}
                        mediaUrl={
                          getFaqDetails(faq?.attributes?.category_id)?.attributes
                            ?.category_media_url
                        }
                        id={getFaqDetails(faq?.attributes?.category_id)?.id}
                        title={getFaqDetails(faq?.attributes?.category_id)?.attributes?.name}
                        message={
                          getFaqDetails(faq?.attributes?.category_id)?.attributes?.description
                        }
                      />
                    ))}
                </div>
                {isBrandingHidden === false && (
                  <p className="text-center mt-4 text-dark-blue-bb mt-5">
                    <span className="powered-label">Powered by, Gsoftcomm</span>
                  </p>
                )}
              </div>
            </div>
            {/* <!-- article detail --> */}
            <div
              className={`accordion-body rounded-bottom p-0 sample-article-new ${
                showArticleDetails?.show ? '' : 'd-none'
              }`}
            >
              <div className="d-flex bg-white justify-content-between p-3 align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <div className="p-1 rounded sample-back">
                    <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowArticleDetails(false);
                        setShowArticles(true);
                      }}
                    >
                      <img src="/assets/ArrowLeft.svg" alt="" />
                    </a>
                  </div>
                  <div className="">
                    <img src="/assets/sample-article2.svg" alt="" />
                  </div>
                  <div className="">
                    <p className="fw-500 mb-0">Welcome to Gsoft</p>
                  </div>
                </div>
              </div>
              <hr className="m-0 border-black o-16" />
              <div className="p-4 scroll-custom">
                <div className="scroll-chat-area scroll-custom pe-3">
                  <ChatWidgetLeft
                    BotName="Chat Bot"
                    time="5 min ago"
                    chatBotMsg="This is a name box to the Gsoft Bot Builder. This dialogue is initiated when users..."
                  />

                  <ChatWidgetRight userName="Me" userQuery="John Doe" time="2 min ago" />
                  <ChatWidgetLeft
                    BotName="Chat Bot"
                    time="5 min ago"
                    chatBotMsg="Thank you for choosing the right actions."
                  />
                  <div className="chat-left">
                    <div className="d-flex flex-row gap-2">
                      <div className="">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="22" height="22" rx="11" fill="#817EFF" />
                          <path
                            d="M14.85 11H15.4C15.6917 11 15.9715 11.1159 16.1778 11.3222C16.3841 11.5285 16.5 11.8083 16.5 12.1V13.2C16.5 13.4917 16.3841 13.7715 16.1778 13.9778C15.9715 14.1841 15.6917 14.3 15.4 14.3H14.85C14.7041 14.3 14.5642 14.2421 14.4611 14.1389C14.3579 14.0358 14.3 13.8959 14.3 13.75V11.55C14.3 11.4041 14.3579 11.2642 14.4611 11.1611C14.5642 11.0579 14.7041 11 14.85 11ZM7.15 14.3H6.6C6.30826 14.3 6.02847 14.1841 5.82218 13.9778C5.61589 13.7715 5.5 13.4917 5.5 13.2V12.1C5.5 11.8083 5.61589 11.5285 5.82218 11.3222C6.02847 11.1159 6.30826 11 6.6 11H7.15C7.29587 11 7.43576 11.0579 7.53891 11.1611C7.64205 11.2642 7.7 11.4041 7.7 11.55V13.75C7.7 13.8959 7.64205 14.0358 7.53891 14.1389C7.43576 14.2421 7.29587 14.3 7.15 14.3Z"
                            fill="#817EFF"
                          />
                          <path
                            d="M15.8129 10.6534V9.8999C15.8129 8.62355 15.3059 7.39947 14.4033 6.49695C13.5008 5.59443 12.2767 5.0874 11.0004 5.0874C9.72404 5.0874 8.49996 5.59443 7.59744 6.49695C6.69492 7.39947 6.18789 8.62355 6.18789 9.8999V10.6534C5.87257 10.7428 5.59482 10.9322 5.39644 11.193C5.19805 11.4539 5.08977 11.7722 5.08789 12.0999V13.1999C5.08789 13.601 5.24724 13.9858 5.53089 14.2694C5.81454 14.5531 6.19925 14.7124 6.60039 14.7124H7.15039C7.40522 14.711 7.64919 14.6091 7.82939 14.4289C8.00958 14.2487 8.11145 14.0047 8.11289 13.7499V11.5499C8.11145 11.2951 8.00958 11.0511 7.82939 10.8709C7.64919 10.6907 7.40522 10.5888 7.15039 10.5874H7.01289V9.8999C7.01289 8.84235 7.433 7.82812 8.1808 7.08031C8.9286 6.33251 9.94284 5.9124 11.0004 5.9124C12.0579 5.9124 13.0722 6.33251 13.82 7.08031C14.5678 7.82812 14.9879 8.84235 14.9879 9.8999V10.5874H14.8504C14.5956 10.5888 14.3516 10.6907 14.1714 10.8709C13.9912 11.0511 13.8893 11.2951 13.8879 11.5499V13.7499C13.8893 14.0047 13.9912 14.2487 14.1714 14.4289C14.3516 14.6091 14.5956 14.711 14.8504 14.7124H14.9879V15.3999C14.9879 15.5822 14.9155 15.7571 14.7865 15.886C14.6576 16.015 14.4827 16.0874 14.3004 16.0874H11.0004C10.891 16.0874 10.7861 16.1309 10.7087 16.2082C10.6314 16.2856 10.5879 16.3905 10.5879 16.4999C10.5879 16.6093 10.6314 16.7142 10.7087 16.7916C10.7861 16.8689 10.891 16.9124 11.0004 16.9124H14.3004C14.7015 16.9124 15.0862 16.7531 15.3699 16.4694C15.6535 16.1858 15.8129 15.801 15.8129 15.3999V14.6464C16.1282 14.557 16.406 14.3676 16.6043 14.1068C16.8027 13.8459 16.911 13.5276 16.9129 13.1999V12.0999C16.911 11.7722 16.8027 11.4539 16.6043 11.193C16.406 10.9322 16.1282 10.7428 15.8129 10.6534ZM7.28789 11.5499V13.7499C7.28789 13.7864 7.2734 13.8213 7.24762 13.8471C7.22183 13.8729 7.18686 13.8874 7.15039 13.8874H6.60039C6.41805 13.8874 6.24319 13.815 6.11425 13.686C5.98532 13.5571 5.91289 13.3822 5.91289 13.1999V12.0999C5.91289 11.9176 5.98532 11.7427 6.11425 11.6138C6.24319 11.4848 6.41805 11.4124 6.60039 11.4124H7.15039C7.18686 11.4124 7.22183 11.4269 7.24762 11.4527C7.2734 11.4785 7.28789 11.5134 7.28789 11.5499ZM16.0879 13.1999C16.0879 13.3822 16.0155 13.5571 15.8865 13.686C15.7576 13.815 15.5827 13.8874 15.4004 13.8874H14.8504C14.8139 13.8874 14.7789 13.8729 14.7532 13.8471C14.7274 13.8213 14.7129 13.7864 14.7129 13.7499V11.5499C14.7129 11.5134 14.7274 11.4785 14.7532 11.4527C14.7789 11.4269 14.8139 11.4124 14.8504 11.4124H15.4004C15.5827 11.4124 15.7576 11.4848 15.8865 11.6138C16.0155 11.7427 16.0879 11.9176 16.0879 12.0999V13.1999Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div className="d-flex flex-column pt-1">
                        <div className="text-dark-blue d-block fw-medium">Chat Bot</div>
                        <div className="d-flex mt-2 align-items-start">
                          <div className="chat-cvr d-flex align-items-start flex-column w-100">
                            <div className="chat-border-left bg-chat-blue p-3 d-flex flex-column align-items-end gap-2 mb-1">
                              <div>
                                <div className="d-flex gap-3">
                                  <div>
                                    <img src="/assets/CalendarCheck.svg" alt="" />
                                  </div>
                                  <div>
                                    <h6 className="fw-500">Calendar sent</h6>
                                    <p className="mb-1">Calendar link shared</p>
                                  </div>
                                </div>

                                <div>
                                  <a
                                    href="/#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                    }}
                                    className="word-mob"
                                  >
                                    https://meeting.google.in.calendar
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="text-secondary mt-2">2 min ago</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="chat-right">
                    <div className="d-flex align-items-start">
                      <div className="chat-cvr d-flex align-items-end w-100 justify-content-end">
                        <div className="d-flex flex-column align-items-end">
                          <span className="text-mist-gray text-secondary d-block ps-4">
                            <span className="tick h-3 w-3 d-inline-block me-1" /> Me
                          </span>
                          <div className="w-100 justify-content-end align-items-center mt-2">
                            <div className="chat-border-right bg-blue-active text-white p-3 d-flex flex-column align-items-end gap-2 mb-1">
                              <div className="d-flex align-items-center gap-2">
                                <div className="bg-white rounded p-2">
                                  <img src="/assets/FilePdfblue.svg" alt="" />
                                </div>
                                <div>
                                  <h6 className="fs-13px mb-0">Sample document.pdf</h6>
                                  <p className="mb-0 fs-12px">304 MB</p>
                                </div>
                                <a
                                  href="/#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                  }}
                                  className="rounded-circle bg-white p-2"
                                >
                                  <img src="/assets/DownloadSimpleIcon.svg" alt="" />
                                </a>
                              </div>
                            </div>
                            <div className="chat-border-right bg-blue-active text-white p-3 d-flex flex-column align-items-end gap-2 mb-1">
                              <div className="d-flex align-items-center gap-2">
                                <div className="bg-white rounded p-2">
                                  <img src="/assets/FilePdfblue.svg" alt="" />
                                </div>
                                <div>
                                  <h6 className="fs-13px mb-0">Sample document.pdf</h6>
                                  <p className="mb-0 fs-12px">304 MB</p>
                                </div>
                                <a
                                  href="/#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                  }}
                                  className="rounded-circle bg-white p-2"
                                >
                                  <img src="/assets/DownloadSimpleIcon.svg" alt="" />
                                </a>
                              </div>
                            </div>

                            <div className="chat-border-right bg-chat-blue text-white p-3 py-2 flex-column align-items-end gap-2 mb-1 text-center">
                              <a
                                href="/#"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                +1 more files
                              </a>
                              <p className="mb-0 text-dark">4 MB</p>
                            </div>
                          </div>
                          <div className="text-secondary mt-2">Delivered a 30 sec ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ChatWidgetLeft
                    BotName="Chat Bot"
                    time="5 min ago"
                    chatBotMsg="This is a name box to the Gsoft Bot Builder. This dialogue is initiated when users..."
                  />

                  <div className="chat-right">
                    <div className="d-flex align-items-start">
                      <div className="chat-cvr d-flex align-items-end w-100 justify-content-end">
                        <div className="d-flex flex-column align-items-end">
                          <span className="text-mist-gray text-secondary d-block ps-4">
                            <span className="tick h-3 w-3 d-inline-block me-1" /> Me
                          </span>
                          <div className="w-100 justify-content-end align-items-center mt-2">
                            <div className="chat-border-right bg-chat-blue text-white flex-column align-items-end gap-2 mb-1 text-center">
                              <img src="/assets/booksample.svg" alt="" />
                              <div className="d-flex justify-content-between align-items-center p-3 book-sample">
                                <h6 className="text-dark mb-0">Book_sample.png</h6>
                                <p className="text-dark mb-0">4MB</p>
                                <a
                                  href="/#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                  }}
                                >
                                  <img src="/assets/export-icon.svg" alt="" />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="text-secondary mt-2">Delivered a 30 sec ago</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ChatWidgetLeft
                    BotName="Chat Bot"
                    time="5 min ago"
                    chatBotMsg="Thank you for choosing the right actions."
                  />
                  <div className={latestMessage.visible ? 'chat-right' : 'd-none'}>
                    <div className="d-flex align-items-start">
                      <div className="chat-cvr d-flex align-items-end w-100 justify-content-end">
                        <div className="d-flex flex-column align-items-end">
                          <span className="text-mist-gray text-secondary d-block ps-4">
                            <span className="tick h-3 w-3 d-inline-block me-1" />
                            Me
                          </span>
                          <div className="d-flex w-100 justify-content-end align-items-center mt-2">
                            <div className="chat-border-right bg-blue-active text-white p-3 d-flex flex-column align-items-end gap-2 mb-1">
                              <span>{latestMessage.sendMessage}</span>
                            </div>
                          </div>
                          <div className="text-secondary mt-2">2 min ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- live chat section action --> */}
                <LiveChatSectionAction />
                <div className="d-flex align-items-center mt-3 h-8 border chat-area-config">
                  <textarea
                    className="chatTextBox chat-type-input bg-transparent border-0 fs-12px mt-3 ps-2"
                    placeholder="Type here"
                    onChange={(e) => {
                      setLatestMessage({ ...latestMessage, message: e?.target?.value });
                    }}
                    value={latestMessage?.message || ''}
                  />
                  <div className="ms-auto d-flex align-items-center gap-2 pe-2">
                    <div>
                      <a
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        className="trigger empty"
                      >
                        <i className="me-2">
                          <img height="20" src="/assets/Smile-icon.svg" alt="" />
                        </i>
                      </a>
                    </div>
                    <div>
                      <a
                        className="me-3"
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <img src="/assets/chat-attach.svg" alt="" />
                      </a>
                    </div>
                    <div>
                      <a
                        className="chatSendBtn"
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                          setLatestMessage({
                            sendMessage: latestMessage?.message,
                            latestMessage: '',
                            visible: true,
                          });
                        }}
                      >
                        <img src="/assets/chat-send.svg" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
                <p className="text-center mt-4 text-dark-blue-bb">
                  Powered by, <b>Gsoftcomm</b>
                </p>
              </div>
            </div>

            <FaqListing
              showFAQListing={showFAQListing}
              setShowFaqDetails={() => {
                setShowArticles(false);
                setShowArticleDetails(false);
                setShowFAQListing(false);
                setShowFaqDetails(true);
              }}
              onBack={() => {
                setShowFAQListing(false);
                setShowArticles(true);
              }}
            />

            <FaqDetails
              showFaqDetails={showFaqDetails}
              onBack={() => {
                setShowFaqDetails(false);
                setShowFAQListing(true);
              }}
            />
          </div>
          <div className="ask-btn mt-4 mb-2 text-end">
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
              }}
              className="btn text-white ask"
              style={{ backgroundColor: data?.appearanceDetails?.launcherBtnBgColorOne }}
              tabIndex="-1"
              role="button"
              data-bs-container="body"
              data-bs-toggle="popover"
              data-bs-trigger="hover focus"
              data-bs-placement="left"
              data-bs-content="Ask a question"
              data-tooltip-id="tooltip-launcher-button"
            >
              {getLauncherButton()}
              <Tooltip
                id="tooltip-launcher-button"
                content={data?.configurationDetails?.launcherButtonTooltip || 'Ask a question'}
                place="left"
              />
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default WidgetModalMobile;
