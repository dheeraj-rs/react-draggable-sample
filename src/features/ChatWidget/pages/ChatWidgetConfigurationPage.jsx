/* eslint-disable no-else-return */
/* eslint-disable no-dupe-else-if */
/* eslint-disable operator-linebreak */
/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import Layout from '../../../common/layout';
import Articles from '../components/Articles';
import UmmapModal from '../components/UmmapModal';
import FaqListing from '../components/FaqListing';
import FaqDetails from '../components/FaqDetails';
import DeleteModal from '../components/DeleteModal';
import TabsHead from '../chat-widget-settings/TabsHead';
import ArticleDetails from '../components/ArticleDetails';
import NeedHelpCanvas from '../components/NeedHelpCanvas';
import RenameSaveModal from '../components/RenameSaveModal';
import MapFaqOffcanvas from '../components/MapFaqOffcanvas';
import MappTopicsCanvas from '../components/MappTopicsCanvas';
import WidgetModalMobile from '../components/WidgetModalMobile';
import ChatWidgetFAQ from '../chat-widget-settings/ChatWidgetFAQ';
import ChatWidgetMapBot from '../chat-widget-settings/ChatWidgetMapBot';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ChatWidgetEmbedCode from '../chat-widget-settings/ChatWidgetEmbedCode';
import ChatWidgetAppearance from '../chat-widget-settings/ChatWidgetAppearance';
import ChatWidgetConfiguration from '../chat-widget-settings/ChatWidgetConfiguration';
import DeleteColorSchemeModal from '../../../common/components/modals/DeleteColorSchemeModal';
import { GetChatWidgetDetails } from '../../../common/api-collection/ChatWidget/ChatWidgets';
import ToastError from '../../../common/components/toast/ToastError';
import {
  DeleteChatWidgetTopic,
  ListChatWidgetTopics,
} from '../../../common/api-collection/ChatWidget/ChatWidgetTopics';
import UnMapModalFaq from '../components/UnMapModalFaq';
import { DeleteChatWidgetFaqCategory } from '../../../common/api-collection/ChatWidget/FAQ/ChatWidgetFaqCategories';

function ChatWidgetConfigurationPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [activeLauncherButton, setActiveLauncherButton] = useState({
    id: 1,
    name: 'q-chat',
  });

  const [showArticleDetails, setShowArticleDetails] = useState({ show: false });
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const [type, setType] = useState(1);

  const [showFAQListing, setShowFAQListing] = useState(false);
  const [showFaqDetails, setShowFaqDetails] = useState(false);
  const [showArticles, setShowArticles] = useState(true);

  const [chatWidgetDetails, setChatWidgetDetails] = useState();
  const [chatWidgetDetailsIncluded, setChatWidgetDetailsIncluded] = useState();

  const [refresh, setRefresh] = useState(false);
  const [refreshChatTopics, setRefreshChatTopics] = useState(false);
  const [refreshChatFaqs, setRefreshChatFaqs] = useState(false);

  const [chatTopicsList, setChatTopicsList] = useState([]);
  const [showUmmapModal, setShowUmmapModal] = useState(false);

  const [showMapTopicCanvas, setShowMapTopicCanvas] = useState(false);
  const [showMapFaqCanvas, setShowMapFaqCanvas] = useState(false);

  const [data, setData] = useState({});
  const [creatorName, setCreatorName] = useState('');

  const [listChatWidgetFaqCategories, setListChatWidgetFaqCategories] = useState({
    data: [],
    included: [],
  });

  // for topic delete
  const [selectedForDelete, setSelectedForDelete] = useState({
    id: '',
    isDeleting: false,
    type: 'Topic',
  });

  const handleDeleteTopic = () => {
    setSelectedForDelete({ ...selectedForDelete, isDeleting: true });
    DeleteChatWidgetTopic(selectedForDelete?.id)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Deleted: You have successfully deleted the topic',
          type: 'success',
        });
        setChatTopicsList({ data: [], included: [] });
        setRefreshChatTopics(!refreshChatTopics);
      })
      ?.catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while Deleting !',
        });
      })
      ?.finally(() => {
        setSelectedForDelete({ id: '', isDeleting: false, type: '' });
      });
  };

  const handleDeleteFaq = () => {
    setSelectedForDelete({ ...selectedForDelete, isDeleting: true });
    DeleteChatWidgetFaqCategory(selectedForDelete?.id)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Deleted: You have successfully deleted the FAQ',
          type: 'success',
        });
        setListChatWidgetFaqCategories({ data: [], included: [] });
        setRefreshChatFaqs(!refreshChatFaqs);
      })
      ?.catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while Deleting !',
        });
      })
      ?.finally(() => {
        setSelectedForDelete({ id: '', isDeleting: false, type: '' });
      });
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
    ListChatWidgetTopics(params?.id)?.then((response) => {
      setChatTopicsList({
        data: response?.data ? response?.data : [],
        included: response?.included ? response?.included : [],
      });
    });
  }, [refreshChatTopics]);

  useEffect(() => {
    GetChatWidgetDetails(params?.id)?.then((response) => {
      setChatWidgetDetails(response?.data);
      setChatWidgetDetailsIncluded(response?.included);
      response?.included?.map((e) => {
        if (e?.type === 'creator') {
          setCreatorName(e?.attributes?.display_name);
        }
        return null;
      });
    });
  }, [params?.id, refresh]);

  const getWidgetConfigurationDetails = (configurationDetails) => {
    setData({
      ...data,
      configurationDetails,
    });
  };

  const getWidgetAppearanceDetails = (appearanceDetails, isBrandingHidden) => {
    setData({
      ...data,
      appearanceDetails,
      isBrandingHidden,
    });
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
      <Layout title="comm chat" headerTitle="Settings" favIcon="/favicon.svg">
        <div className="wrapper">
          <div className="d-flex">
            <div className="bg-gray-bright w-100">
              <div className="d-flex flex-lg-row flex-sm-column flex-column gap-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px flex-xl-column h-fit">
                <div className="d-flex flex-lg-row flex-sm-column flex-column bg-white shadow-1 rounded widget-sec h-100">
                  <div className="col-lg-9 col-sm-12 left-sec pe-lg-3 col-12 pe-0">
                    <div className="bg-white rounded pt-28px ps-23px pe-25px widget-p-mob">
                      <div className="d-flex gap-2 left-mob">
                        <div
                          role="button"
                          className="left-widget d-none d-lg-block"
                          onClick={() => {
                            navigate('/chat-widget/new-widget');
                          }}
                        >
                          <Link
                            to="/chat-widget/new-widget/"
                            className="d-flex justify-content-center"
                          >
                            <img src="/assets/leftback.svg" alt="" />
                          </Link>
                        </div>
                        <div>
                          <h6 className="fw-500 fs-16px mb-2 d-flex gap-2 main-head">
                            <Link to="/chat-widget/new-widget" className="d-block d-lg-none">
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </Link>{' '}
                            {chatWidgetDetails?.attributes?.name}
                          </h6>
                          <p className="text-secondary fs-6 mb-1">
                            Created by: <span>{creatorName || ''}</span>
                          </p>
                        </div>
                        <div className="ms-auto d-flex align-items-center">
                          <a
                            href="/#"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            className="text-blue-active ms-2 d-flex d-md-flex fw-medium align-items-center"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                          >
                            <img className="pe-2" src="/assets/need-help.svg" alt="Need Help" />
                            <span className="d-none d-lg-block"> Need help</span>
                          </a>

                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#widgetmodalmob"
                            className="text-dark ms-2 d-flex d-md-flex d-lg-none d-sm-block fw-medium align-items-center gap-1"
                            href="/#"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <img src="/assets/widget.svg" alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="con mt-0 mt-lg-4">
                        <TabsHead setType={setType} />
                        <div className="tab-content" id="pills-tabContent">
                          <ChatWidgetConfiguration
                            setToastAction={setToastAction}
                            chatWidgetDetails={chatWidgetDetails}
                            chatWidgetDetailsIncluded={chatWidgetDetailsIncluded}
                            setRefresh={setRefresh}
                            refresh={refresh}
                            getWidgetDetails={getWidgetConfigurationDetails}
                            setActiveLauncherButton={setActiveLauncherButton}
                            activeLauncherButton={activeLauncherButton}
                          />
                          <ChatWidgetMapBot
                            chatTopicsList={chatTopicsList}
                            setTopicIdSelected={setSelectedForDelete}
                            setShowMapTopicCanvas={setShowMapTopicCanvas}
                          />
                          <ChatWidgetFAQ
                            refreshChatFaqs={refreshChatFaqs}
                            setListChatWidgetFaqCategories={setListChatWidgetFaqCategories}
                            listChatWidgetFaqCategories={listChatWidgetFaqCategories}
                            setShowMapFaqCanvas={setShowMapFaqCanvas}
                            setFaqSelected={setSelectedForDelete}
                          />
                          <ChatWidgetAppearance
                            activeLauncherButton={activeLauncherButton}
                            chatWidgetDetails={chatWidgetDetails}
                            getWidgetAppearanceDetails={getWidgetAppearanceDetails}
                            toastAction={toastAction}
                            setToastAction={setToastAction}
                          />
                          <ChatWidgetEmbedCode />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-12 right-sec d-none d-lg-block">
                    <div className="d-flex justify-content-between align-item-center mb-4 mb-lg-0 px-4 pt-4 px-lg-0 pt-lg-0">
                      <div className="d-block d-lg-none">
                        <p className="fs-14px fw-medium text-primary mb-0">
                          <a
                            id="rgt-btn"
                            className="rgt-btn text-dark d-lg-none d-sm-block fw-medium"
                            href="/#"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                          </a>{' '}
                          Chat widget
                        </p>
                      </div>
                    </div>
                    <div className="bg-tranparent rounded-top border-0 fs-12px p-3 p-xl-3 p-lg-3 p-md-2 p-sm-2 pb-3 mt-3 pe-xl-5 pb-xl-4 pe-2">
                      <div className="border-0 shadow-8 rounded-bottom">
                        <div
                          className="change d-flex align-items-center p-3 py-4 fs-12px shadow-8 rounded-top"
                          style={{ backgroundColor: data?.appearanceDetails?.bannerBgColorOne }}
                        >
                          <div id="heading">
                            <div className="d-flex align-items-center text-white justify-content-center gap-3">
                              <img src="/assets/headphone.svg" alt="" />
                              <div className="d-flex flex-column">
                                <span
                                  className="fs-16px"
                                  style={{
                                    color: data?.appearanceDetails?.bannerTextColor,
                                  }}
                                >
                                  {data?.configurationDetails?.bannerMessage ||
                                    'Hi, good to see you!'}
                                </span>
                                <span
                                  className="font-13 opacity-75"
                                  style={{
                                    color: data?.appearanceDetails?.bannerTextColor,
                                  }}
                                >
                                  {data?.configurationDetails?.bannerDescription ||
                                    'How can we help?'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-bottom">
                          <Articles
                            showArticleDetails={showArticleDetails}
                            setShowArticleDetails={setShowArticleDetails}
                            setShowFAQListing={setShowFAQListing}
                            showFAQListing={showFAQListing}
                            type={type}
                            showArticles={showArticles}
                            setShowArticles={setShowArticles}
                            refreshChatTopics={refreshChatTopics}
                            isBrandingHidden={data?.isBrandingHidden}
                            refreshChatFaqs={refreshChatFaqs}
                          />
                          <ArticleDetails
                            setShowArticleDetails={setShowArticleDetails}
                            showArticleDetails={showArticleDetails}
                          />
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
                      </div>
                    </div>
                    <div className="ask-btn mb-2 text-end me-5">
                      <a
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        //
                        className="btn text-white ask"
                        style={{ backgroundColor: data?.appearanceDetails?.launcherBtnBgColorOne }}
                        tabIndex="-1"
                        role="button"
                        data-bs-container="body"
                        data-bs-toggle="popover"
                        data-toggle="popover"
                        data-bs-trigger="hover focus"
                        data-bs-placement="left"
                        data-bs-content="Ask a question"
                        data-tooltip-id="tooltip-launcher-button"
                      >
                        {getLauncherButton()}

                        <Tooltip
                          id="tooltip-launcher-button"
                          content={
                            data?.configurationDetails?.launcherButtonTooltip || 'Ask a question'
                          }
                          place="left"
                        />
                      </a>
                    </div>
                  </div>
                  {/* <!-- right box ends --> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DeleteColorSchemeModal toastAction={setToastAction} />
        <DeleteModal
          handleDelete={() => {
            if (selectedForDelete?.type === 'Topic') {
              handleDeleteTopic(selectedForDelete?.id);
            } else if (selectedForDelete?.type === 'category') {
              handleDeleteFaq(selectedForDelete?.id);
            }
          }}
          selected={selectedForDelete}
          onClose={() => {
            setSelectedForDelete({ type: '', id: '', title: '' });
          }}
        />
        <WidgetModalMobile
          type={type}
          setShowArticleDetails={setShowArticleDetails}
          setShowFAQListing={setShowFAQListing}
          showArticleDetails={showArticleDetails}
          showFAQListing={showFAQListing}
          showArticles={showArticles}
          setShowArticles={setShowArticles}
          chatTopicsList={chatTopicsList}
          listChatWidgetFaqCategories={listChatWidgetFaqCategories}
          data={data}
          chatWidgetDetails={chatWidgetDetails}
          isBrandingHidden={data?.isBrandingHidden}
          setShowFaqDetails={setShowFaqDetails}
          showFaqDetails={showFaqDetails}
        />
        <RenameSaveModal />
        <UmmapModal
          show={showUmmapModal?.type === 'topic' && showUmmapModal?.show}
          onClick={() => {
            setShowUmmapModal({ show: false });
          }}
        />
        <UnMapModalFaq
          show={showUmmapModal?.type === 'faq' && showUmmapModal?.show}
          onClick={() => {
            setShowUmmapModal({ show: false });
          }}
        />
        <MappTopicsCanvas
          setToastAction={setToastAction}
          setShowUmmapModal={setShowUmmapModal}
          setRefreshChatTopics={setRefreshChatTopics}
          refreshChatTopics={refreshChatTopics}
          chatWidgetTopicsList={chatTopicsList}
          showMapTopicCanvas={showMapTopicCanvas}
          setShowMapTopicCanvas={setShowMapTopicCanvas}
        />
        <MapFaqOffcanvas
          setToastAction={setToastAction}
          setShowUmmapModal={setShowUmmapModal}
          setRefreshChatFaqs={setRefreshChatFaqs}
          refreshChatFaqs={refreshChatFaqs}
          listChatWidgetFaqCategories={listChatWidgetFaqCategories}
          showMapFaqCanvas={showMapFaqCanvas}
          setShowMapFaqCanvas={setShowMapFaqCanvas}
        />
        <NeedHelpCanvas />
      </Layout>
      {toastAction.type === 'success' ? (
        <ToastSuccess
          id="RenameWidgetMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
        >
          <span>{toastAction?.message}</span>
        </ToastSuccess>
      ) : (
        <ToastError
          id="RenameWidgetMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
          isSuccess={false}
        >
          <span>{toastAction?.message}</span>
        </ToastError>
      )}
    </>
  );
}

export default ChatWidgetConfigurationPage;
