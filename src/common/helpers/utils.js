import parsePhoneNumberFromString from 'libphonenumber-js';
import React from 'react';
import copy from 'copy-to-clipboard';

const isFormFieldValid = (formik, name) =>
  !!(formik.touched[name] && formik.errors[name]);

const getFormErrorMessage = (formik, name) =>
  isFormFieldValid(formik, name) && (
    <span className="invalid-message">
      <sup>*</sup>
      {formik.errors[name]}
    </span>
  );

const scrollToTop = (errors, targetDivRef) => {
  if (Object.keys(errors).length !== 0) {
    targetDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const scrollTo = (targetDivRef) => {
  if (targetDivRef.current) {
    targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
  }
};

const getFileType = (fileName) => {
  const fileExtension = fileName?.split('.').pop();
  return fileExtension;
};

const generateUniqueId = () => {
  const timestamp = Date.now().toString();
  const randomNum = Math.floor(Math.random() * 10000).toString();
  return timestamp + randomNum;
};

const handleKeyPressForNumber = (event) => {
  const keyCode = event.which || event.keyCode;
  const keyValue = String.fromCharCode(keyCode);

  // Only allow numeric keys (0-9)
  if (!/^\d+$/.test(keyValue)) {
    event.preventDefault();
  }
};

function setDataToLS(data) {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem('authData', JSON.stringify(data));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const clearLocalStorage = () =>
  new Promise((resolve, reject) => {
    try {
      localStorage.clear();
      resolve('LocalStorage cleared successfully.');
    } catch (error) {
      reject(new Error(`Failed to clear LocalStorage: ${error}`));
    }
  });
const getToken = () => {
  const tokenData =
    localStorage?.getItem('authData') !== null &&
    localStorage?.getItem('authData') !== ''
      ? JSON.parse(localStorage?.getItem('authData')).access_token
      : null;

  return tokenData;
};

const getAuthData = () => {
  const tokenData =
    localStorage.getItem('authData') !== null &&
    localStorage.getItem('authData') !== ''
      ? JSON.parse(localStorage.getItem('authData'))
      : null;

  return tokenData;
};

const getDeviceMeta = () => {
  const deviceMeta = {
    userAgent: window.navigator.userAgent,
    language: window.navigator.language,
    platform: window.navigator.platform,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    appVersion: window.navigator.appVersion,
    type:
      window.location.protocol === 'http:' ||
      window.location.protocol === 'https:'
        ? 'web'
        : '',

    // Add more properties as needed
  };

  return deviceMeta;
};

const getOperatingSystem = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.includes('win')) {
    return 'Windows';
  }
  if (userAgent.includes('mac')) {
    return 'Mac OS';
  }
  if (userAgent.includes('linux')) {
    return 'Linux';
  }
  if (userAgent.includes('android')) {
    return 'Android';
  }
  if (userAgent.includes('ios')) {
    return 'iOS';
  }
  return 'Unknown';
};

const getBrowserVersion = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.includes('firefox')) {
    return 'Firefox';
  }
  if (userAgent.includes('chrome')) {
    return 'Chrome';
  }
  if (userAgent.includes('safari')) {
    return 'Safari';
  }
  if (userAgent.includes('opera') || userAgent.includes('opr')) {
    return 'Opera';
  }
  if (userAgent.includes('edge')) {
    return 'Microsoft Edge';
  }
  if (userAgent.includes('msie') || userAgent.includes('trident')) {
    return 'Internet Explorer';
  }
  return 'Unknown';
};

const getLogedUserDetails = () => {
  const tokenData = localStorage.getItem('logedUserDetails')
    ? JSON.parse(localStorage.getItem('logedUserDetails'))
    : null;

  return tokenData;
};

function removeDataFromLocalStorage(key) {
  try {
    localStorage.removeItem(key);
    return true; // Indicate success
  } catch (error) {
    return false; // Indicate failure
  }
}

const getSubdomailUrl = () =>
  window.location?.pathname.split('/')[1] === 'registration'
    ? ''
    : window.location?.pathname.split('/')[1];

const convertE164ToCountryCodeAndNumber = (e164PhoneNumber) => {
  const phoneNumber = parsePhoneNumberFromString(e164PhoneNumber);
  if (phoneNumber) {
    return {
      countryCode: phoneNumber.countryCallingCode,
      number: phoneNumber.nationalNumber,
    };
  }
  return {
    countryCode: '',
    number: '',
  };
};

const validatePasswordCriterias = (password) => {
  const minLengthRegex = /.{8,}/;
  const uppercaseRegex = /.*[A-Z].*/;
  const numberRegex = /.*[0-9].*/;
  const specialCharRegex = /.*[!@#$%&*].*/;

  const hasMinLength = minLengthRegex.test(password);
  const hasUppercase = uppercaseRegex.test(password);
  const hasNumber = numberRegex.test(password);
  const hasSpecialChar = specialCharRegex.test(password);

  return { password, hasMinLength, hasUppercase, hasNumber, hasSpecialChar };
};

const setCustomDataToLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const copyToClipboard = (value) => {
  copy(value);
};

const isValidIPv4 = (ip) => {
  const ipv4Pattern =
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Pattern.test(ip);
};

const isValidIPv6 = (ip) => {
  const ipv6Pattern =
    /^([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,7}:$|^([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}$|^([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}$|^([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}$|^([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}$|^[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})$|^:((:[0-9a-fA-F]{1,4}){1,7}|:)$/;
  return ipv6Pattern.test(ip);
};

const isValidIPAddress = (ip) => isValidIPv4(ip) || isValidIPv6(ip);

const getDataFromLS = (name) => {
  if (name) {
    const data = localStorage.getItem(name)
      ? JSON.parse(localStorage.getItem(name))
      : null;

    return data;
  }

  return null;
};

const isSuperAdminFunction = () => {
  return (
    window.location.hostname.replace('app.', '') ===
    `auth.${process.env.REACT_APP_DOMAIN}`
  );
};

const isTenantUserFunction = () => {
  let url = window.location.hostname.replace('app.', '');
  return url.startsWith('account-');
};

const isTenantAdminFunction = () => {
  let url = window.location.hostname.replace('app.', '');
  return url.startsWith('admin-');
};

const getFavIcon = () => {
  const isSuperAdmin = isSuperAdminFunction();
  const isTenantAdmin = isTenantAdminFunction();
  const isTenantUser = isTenantUserFunction();

  if (isSuperAdmin) {
    return '/assets/favIcons/organization_admin_fav.ico';
  } else if (isTenantAdmin) {
    return '';
  } else if (isTenantUser) {
    return '';
  }
  return '';
};

const getEdges = (nodeId = '', flowEdges = []) => {
  if (nodeId && flowEdges?.length > 0) {
    const result = flowEdges.filter(
      (edge) => String(edge.source) === String(nodeId)
    );
    return result;
  }
  return [];
};

const getNodeDetails = (nodeId, nodesList = []) => {
  if (nodeId && nodesList.length > 0) {
    const result = nodesList.filter(
      (node) => String(node.id) === String(nodeId)
    );
    return result[0];
  }
  return null;
};

const isValueInArray = (type, activeEdges = []) => {
  if (activeEdges?.length > 0) {
    return activeEdges.some((obj) => obj.sourceHandle.split(':')[0] === type);
  }
  return null;
};

// function isValueInArray(value, array) {
//   if (typeof value === 'undefined' || value === null || !Array.isArray(array)) {
//     return false;
//   }
//   return array.some((item) => {
//     if (typeof value === 'string') {
//       return value.split(',').includes(item);
//     }
//     return false;
//   });
// }

const getVoiceFileDetails = (allAvailableVoices = [], voiceId = '') => {
  const result =
    allAvailableVoices.filter(
      (voice) => String(voice.id) === String(voiceId)
    ) || [];
  return result[0];
};

const getAgentDetails = (agents = [], agentId = '') => {
  if (agents?.length > 0) {
    const result = agents.filter((agent) => agent.id === agentId) || [];
    return result[0];
  }
  return [];
};

const getDepartmentDetails = (departments = [], departmentId = '') => {
  if (departments?.length > 0) {
    const result =
      departments.filter(
        (department) => String(department.id) === String(departmentId)
      ) || [];
    return result[0];
  }
  return [];
};

const getAgentAvailabilitiesDetails = (
  agentAvailabilities = [],
  agentAvailabilityId = ''
) => {
  if (agentAvailabilities?.length > 0) {
    const result =
      agentAvailabilities.filter(
        (agentAvailability) => agentAvailability.id === agentAvailabilityId
      ) || [];
    return result[0];
  }
  return [];
};

const getcallerListDetails = (callerList = [], callerListId = '') => {
  if (callerList?.length > 0) {
    const result =
      callerList.filter((list) => String(list.id) === String(callerListId)) ||
      [];
    return result[0];
  }
  return [];
};

const getApiDetails = (apis = [], apiId = '') => {
  if (apis?.length > 0) {
    const result = apis.filter((api) => String(api.id) === String(apiId)) || [];
    return result[0];
  }
  return [];
};
const formatTime = (timeInSeconds) => {
  if (timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  return 0;
};

const calculatePercentage = (currentTime, duration) => {
  if (currentTime && duration) {
    const percentage = (currentTime / duration) * 100;
    return percentage;
  }
  return 0;
};

const areArraysEqual = (arr1, arr2) => {
  // Check if arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Compare each element in the arrays
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  // If all elements match, return true
  return true;
};
export {
  isFormFieldValid,
  getFormErrorMessage,
  scrollToTop,
  scrollTo,
  getFileType,
  generateUniqueId,
  handleKeyPressForNumber,
  setDataToLS,
  getToken,
  clearLocalStorage,
  getDeviceMeta,
  getOperatingSystem,
  getBrowserVersion,
  getLogedUserDetails,
  removeDataFromLocalStorage,
  getSubdomailUrl,
  convertE164ToCountryCodeAndNumber,
  validatePasswordCriterias,
  setCustomDataToLS,
  copyToClipboard,
  getAuthData,
  isValidIPAddress,
  getDataFromLS,
  isSuperAdminFunction,
  isTenantUserFunction,
  isTenantAdminFunction,
  getFavIcon,
  getEdges,
  getNodeDetails,
  isValueInArray,
  getVoiceFileDetails,
  getAgentDetails,
  getDepartmentDetails,
  getAgentAvailabilitiesDetails,
  getcallerListDetails,
  getApiDetails,
  formatTime,
  calculatePercentage,
  areArraysEqual,
};
