import React, { useEffect, useMemo, useState } from 'react';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import LandingPageListing from '../pages/LandingPageListing';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';

function CommChatMenu({ onMobileView }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [chatSettingsSearchResult, setChatSettingsSearchResult] = useState([]);

  const SettingsMenu = [
    {
      img: '/assets/chat-bot-template.svg',
      title: 'Chat Bot Templates',
      link: '/comm-voice-admin/call-flows',
      desc: 'Configure and set up call flows for the customer.',
    },
    {
      img: '/assets/flows-admin.svg',
      title: 'Lorem Ipsum',
      link: '/comm-voice-admin/call-flows',
      desc: 'Configure and set up call flows for the customer.',
    },
    {
      img: '/assets/flows-admin.svg',
      title: 'Lorem Ipsum',
      link: '/comm-voice-admin/call-flows',
      desc: 'Configure and set up call flows for the customer.',
    },
  ];

  // Function to find values matching a name
  function findValuesByNameFromChatSettings() {
    const filteredNamesIn = SettingsMenu.filter((obj) => {
      const result = obj.title?.toLowerCase().includes(searchTerm?.toLowerCase());
      return result;
    });

    return filteredNamesIn;
  }

  const handleSearch = () => {
    const searchResultFromCallSettings = findValuesByNameFromChatSettings();
    setChatSettingsSearchResult(searchResultFromCallSettings);
  };

  const handleStyle = useMemo(() => {
    if (onMobileView?.isMobile) {
      if (onMobileView?.isCallSettingsVisible) {
        return {};
      }
      return { display: 'none' };
    }
    return {};
  }, [onMobileView]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  useEffect(() => {
    setChatSettingsSearchResult(SettingsMenu);
  }, []);

  return (
    <div className="col-lg-9 col-sm-12" id="adminMainSec">
      <div className=" scroll-custom scroll-landing carrier-pad ps-1" style={handleStyle}>
        <div className="col-lg-4 col-sm-12 mt-2 mt-lg-1 mt-sm-4 mb-4">
          <SearchWithBorder
            placeholderText="Search"
            searchTerm={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            clearBtn={() => {
              setSearchTerm('');
            }}
          />
        </div>
        <h5 className={`mb-0 ${chatSettingsSearchResult?.length > 0 ? '' : 'd-none'}`}>
          Chat Settings
        </h5>

        <div className="row mt-3">
          {chatSettingsSearchResult?.map((e, index) => (
            <div className="col-lg-4 col-sm-6 mb-4" key={index}>
              <LandingPageListing img={e?.img} title={e?.title} link={e?.link} desc={e?.desc} />
            </div>
          ))}
        </div>

        {chatSettingsSearchResult?.length === 0 ? <NoMatchingRecords /> : null}
      </div>
    </div>
  );
}

export default CommChatMenu;
