import React, { useEffect, useMemo, useState } from 'react';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import LandingPageListing from '../pages/LandingPageListing';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';
import { SettingsMenu } from '../../../common/layout/components/navbars/menu';

function CommVoiceMenu({ onMobileView, userType = '' }) {
  const [searchTerm, setSearchTerm] = useState('');

  const [callSettingsSearchResult, setCallSettingsSearchResult] = useState([]);
  const [settingsSearchResult, setSettingsSearchResult] = useState([]);

  const CallSettingsMenu = [
    {
      img: '/assets/flows-admin.svg',
      title: 'Call Flows',
      link: '/comm-voice-admin/call-flows',
      desc: 'Configure and set up call flows for the customer.',
      visibility: ['super-admin', 'tenant-admin', 'tenant-user'],
    },
    {
      img: '/assets/voice-admin.svg',
      title: 'Voice library',
      link: '/comm-voice-admin/voice-library',
      desc: 'List of all voice files uploaded in the library.',
      visibility: ['super-admin', 'tenant-admin', 'tenant-user'],
    },
    {
      img: '/assets/agent-availability.svg',
      title: 'Agent Availability',
      link: '/comm-voice-admin/agent-availability/',
      desc: 'Configure agent availability and working hours.',
      visibility: ['super-admin', 'tenant-admin'],
    },
    {
      img: '/assets/caller-list.svg',
      title: 'Caller list',
      link: '/comm-voice-admin/caller-list',
      desc: 'Manage all caller information in an organized list.',
      visibility: ['super-admin', 'tenant-user', 'tenant-admin'],
    },
    {
      img: '/assets/sms-settings-admin.svg',
      title: 'SMS Settings',
      link: '/comm-voice-admin/sms-settings/',
      desc: 'Configure SMS templates, sender id and more.',
      visibility: ['super-admin', 'tenant-admin'],
    },
  ];

  // const SettingsMenu = [
  //   {
  //     img: '/assets/Account-admintools.svg',
  //     title: 'Account Information',
  //     link: '/comm-telephony/account-information/',
  //     desc: 'Company basic info, address, KYC and billing address etc.',
  //     visibility: ['super-admin', 'tenant-admin', 'tenant-user'],
  //   },
  //   {
  //     img: '/assets/comm-admin-tool-icons.svg',
  //     title: 'Agents & Departments',
  //     link: '/comm-telephony/agents-departments/',
  //     desc: 'Manage agents based on their departments',
  //     visibility: ['super-admin', 'tenant-admin'],
  //   },
  //   {
  //     img: '/assets/General-settings-icon.svg',
  //     title: 'General Settings',
  //     link: '/comm-telephony/comm-general-settings/',
  //     desc: 'Customize the applications with advanced settings.',
  //     visibility: ['super-admin', 'tenant-admin'],
  //   },
  //   {
  //     img: '/assets/roles-icon.svg',
  //     title: 'Roles and Permissions',
  //     link: '/comm-telephony/roles-and-permissions/',
  //     desc: 'Manage roles and associated permissions to users.',
  //     visibility: ['super-admin', 'tenant-admin'],
  //   },
  //   {
  //     img: '/assets/vendor-img.svg',
  //     title: 'Vendor plans & packages',
  //     link: '/comm-telephony/vendor-plans-and-packges/',
  //     desc: 'Manage carriers , carrier groups, batch, lots and plans',
  //     visibility: ['super-admin'],
  //   },
  // ];

  // Function to find values matching a name
  function findValuesByNameFromCallSettings() {
    const filteredNamesIn = CallSettingsMenu.filter((obj) => {
      const result = obj.title?.toLowerCase().includes(searchTerm?.toLowerCase());
      return result;
    });

    return filteredNamesIn;
  }

  // Function to find values matching a name
  function findValuesByNameFromSettings() {
    const filteredNamesIn = SettingsMenu.filter((obj) => {
      const result = obj.title?.toLowerCase().includes(searchTerm?.toLowerCase());
      return result;
    });

    return filteredNamesIn;
  }

  const handleSearch = () => {
    const searchResultFromCallSettings = findValuesByNameFromCallSettings();
    setCallSettingsSearchResult(searchResultFromCallSettings);

    const searchResultFromSettings = findValuesByNameFromSettings();
    setSettingsSearchResult(searchResultFromSettings);
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
    setCallSettingsSearchResult(CallSettingsMenu);
  }, []);
  return (
    <div className="col-lg-9 col-sm-12" id="adminMainSec">
      <div
        className=" scroll-custom scroll-landing carrier-pad ps-1"
        // style={
        //   onMobileView?.isMobile
        //     ? onMobileView?.isCallSettingsVisible
        //       ? {}
        //       : { display: 'none' }
        //     : {}
        // }
        style={handleStyle}
      >
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
        <h5 className={`mb-0 ${callSettingsSearchResult?.length > 0 ? '' : 'd-none'}`}>
          Call Settings
        </h5>

        <div className="row mt-3">
          {callSettingsSearchResult?.map((e, index) => (
            <div
              className="col-lg-4 col-sm-6 mb-4"
              key={index}
              style={e.visibility.includes(userType) ? {} : { display: 'none' }}
            >
              <LandingPageListing
                img={e?.img}
                title={e?.title}
                link={e?.link}
                desc={e?.desc}
                isVisible={e.visibility.includes(userType)}
              />
            </div>
          ))}
        </div>
        <h5 className={`mb-3 mt-3 ${settingsSearchResult?.length > 0 ? '' : 'd-none'}`}>
          Settings
        </h5>

        <div className="row">
          {settingsSearchResult?.map((e, index) => (
            <div
              className="col-lg-4 col-sm-6 mb-4"
              key={index}
              style={e.visibility.includes(userType) ? {} : { display: 'none' }}
            >
              <LandingPageListing
                img={e?.img}
                title={e?.title}
                link={e?.link}
                desc={e?.desc}
                isVisible={e.visibility.includes(userType)}
              />
            </div>
          ))}
        </div>
        {callSettingsSearchResult?.length === 0 && settingsSearchResult?.length === 0 ? (
          <NoMatchingRecords />
        ) : null}
      </div>
    </div>
  );
}

export default CommVoiceMenu;
