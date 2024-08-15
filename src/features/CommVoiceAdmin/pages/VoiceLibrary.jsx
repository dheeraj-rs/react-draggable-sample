import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useFormik } from 'formik';
import copy from 'copy-to-clipboard';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Layout from '../../../common/layout';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import VoiceCategory from '../../../common/components/VoiceCategory';
import VoiceUserListRow from '../components/VoiceUserListRow';
import AddVoice from '../components/modals/AddVoiceModal';
import EditVoice from '../components/modals/EditVoiceModal';
import MoveFilesModal from '../components/modals/MoveFilesModal';
import AddCategoryModal from '../components/modals/AddCategoryModal';
import DeleteVoiceModal from '../components/modals/DeleteVoiceModal';
import EditVoiceOffcanvas from '../components/offcanvas/EditVoiceOffcanvas';
import RenameCategoryModal from '../components/modals/RenameCategoryModal';
import ClearCategoryModal from '../components/modals/ClearCategoryModal';
import DeleteVoiceCategoryModal from '../components/modals/DeleteVoiceCategoryModal';
import {
  ClearVoiceCategory,
  CreateVoiceCategory,
  DeleteVoiceCategory,
  ListVoiceCategory,
  UpdateVoiceCategoryRename,
} from '../../../common/api-collection/Telephony/VoiceCategory';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import {
  CreateVoiceLibraryBySourceForRecord,
  CreateVoiceLibraryBySourceForUpload,
  CreateVoiceLibraryBySourceForUrl,
  DeleteVoiceLibrary,
  ListVoiceLibrary,
  MoveVoiceLibrary,
  UpdateVoiceLibrary,
} from '../../../common/api-collection/Telephony/VoiceLibrary';
import MomentaryFileUpload from '../../../common/api-collection/Common/MomentaryFileUpload';
import Pagination from '../../CommVoice/components/pagination/Pagination';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';

function VoiceLibrary() {
  const [categories, setCategories] = useState([]);
  const [includedList, setIncludedList] = useState([]);
  const [voiceUserList, setVoiceUserList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [show, setShow] = useState({ isVisible: false, type: '' });
  const [voiceType, setVoiceType] = useState({ isVisible: false, type: 'text-voice' });
  const [loadingCategory, setLoadingCategory] = useState({ isLoading: false, type: '' });
  const [loading, setLoading] = useState({ isLoading: false, type: '' });
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [showEditModal, setShowEditModal] = useState({
    isVisible: false,
    type: '',
  });
  const [editVoiceType, setEditVoiceType] = useState({
    isVisible: false,
    type: 'change-text-voice',
  });
  const [paginatedData, setPaginatedData] = useState({
    data: {},
    includedList: [],
    links: {},
    meta: {},
    isLoading: false,
  });
  const [voiceCategoryId, setVoiceCategoryId] = useState('');
  const [searchTermCategory, setSearchTermCategory] = useState('');
  const [searchTermVoiceList, setSearchTermVoiceList] = useState('');
  const [filterType, setFilterType] = useState('voice');
  const [totalVoiceList, setTotalVoiceList] = useState(0);
  const [page, setPage] = useState(1);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const listVoiceCategory = () => {
    setLoadingCategory({ isLoading: true, type: 'list-category' });
    ListVoiceCategory(searchTermCategory)
      .then((response) => {
        setCategories(response?.data);
        setTotalVoiceList(
          response?.data?.reduce((total, item) => total + item.attributes.voice_libraries_count, 0)
        );
      })
      .finally(() => {
        setLoadingCategory({ isLoading: false, type: '' });
      });
  };

  const handleCreateVoiceCategory = (formik) => {
    const data = {
      type: 'telephony_vendor_voice_categories',
      attributes: {
        name: formik?.values?.categoryName,
      },
    };
    CreateVoiceCategory(data)
      .then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'New category has been added successfully..',
        });
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Something went wrong.',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong.',
          });
        }
      })
      ?.finally(() => {
        setShow({ isVisible: false, type: '' });
        setVoiceType({ isLoading: false, type: 'text-voice' });
        setLoading({ isLoading: false, type: '' });
        formik.resetForm();
      });
  };

  const handleRenameVoiceCategory = (formik) => {
    const data = {
      type: 'telephony_vendor_caller_lists',
      id: parseInt(show.id, 10),
      attributes: {
        name: formik.values.categoryRename,
      },
    };
    UpdateVoiceCategoryRename(data)
      .then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Category name has been changed successfully.',
        });
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Something went wrong.',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong.',
          });
        }
      })
      ?.finally(() => {
        setShow({ isVisible: false, type: '' });
        setVoiceType({ isLoading: false, type: 'text-voice' });
        setLoading({ isLoading: false, type: '' });
        formik.resetForm();
      });
  };

  const handleClearVoiceCategory = () => {
    setLoading({ isLoading: true, type: 'clear-category' });
    ClearVoiceCategory(show?.id)
      .then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Category has been cleared successfully.',
        });
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Something went wrong.',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong.',
          });
        }
      })
      ?.finally(() => {
        setShow({ isVisible: false, type: '' });
        setVoiceType({ isLoading: false, type: 'text-voice' });
        setLoading({ isLoading: false, type: '' });
      });
  };

  const handleDeleteCategory = async () => {
    try {
      setLoading({ isLoading: true, type: 'delete-category' });
      await DeleteVoiceCategory(show.id);
      setToastAction({
        isVisible: true,
        type: 'success',
        message: 'Category has been deleted successfully.',
      });
      setRefresh(!refresh);
    } catch (error) {
      if (error?.response?.status === 500) {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: 'Something went wrong.',
        });
      } else {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message || 'Something went wrong.',
        });
      }
    } finally {
      setShow({ isVisible: false, type: '' });
      setVoiceType({ isLoading: false, type: 'text-voice' });
      setLoading({ isLoading: false, type: '' });
    }
  };

  const handleAddVoiceError = (error) => {
    setLoading({ isLoading: false, type: voiceType?.type });
    if (error?.response) {
      if (error?.response?.status === 500) {
        setToastAction({
          isVisible: true,
          message: 'Something went wrong.',
          type: 'failed',
        });
      } else if (error?.response?.status === 413) {
        setToastAction({
          isVisible: true,
          message: error?.response?.data?.message || 'Request Entity Too Large',
          type: 'failed',
        });
      } else {
        setToastAction({
          isVisible: true,
          message: error?.response?.data?.message || 'An unexpected error occurred',
          type: 'failed',
        });
      }
    } else {
      setToastAction({
        isVisible: true,
        message: 'An unexpected error occurred',
        type: 'failed',
      });
    }
  };

  // const handleAddTextToSpeech = async (formik) => {
  //   try {
  //     const data = {
  //       type: 'telephony_vendor_voice_libraries',
  //       attributes: {
  //         text: formik.values.textDescription,
  //         name: formik.values.textConvertfileName,
  //         category_id: '',
  //         source: 'record',
  //         language: 'english',
  //         description: formik.values.textConvertfileDescription,
  //         // voice_file:response.data.data.attributes.storage_name,
  //         type: 'voice',
  //         gender: formik.values.voiceGender,
  //       },
  //     };
  //     CreateVoiceLibraryBySourceFortextToSpeech(data)
  //       .then(() => {
  //         setToastAction({
  //           isVisible: true,
  //           message: 'Transaction textToSpeech successfully',
  //           type: 'success',
  //         });
  //         setRefresh(!refresh);
  //         formik.resetForm();
  //         setLoading({ isLoading: false, type: voiceType?.type });
  //         setShow({ isVisible: false, type: '' });
  //         setVoiceType({ isLoading: false, type: voiceType?.type });
  //       })
  //       .catch((createError) => {
  //         alert('Error textToSpeech voice library:', createError);
  //         handleAddVoiceError(createError);
  //       });
  //   } catch (error) {
  //     handleAddVoiceError(error);
  //   } finally {
  //     formik.resetForm();
  //     setShow({ isVisible: false, type: voiceType?.type });
  //     setLoading({ isLoading: false, type: voiceType?.type });
  //   }
  // };

  const handleAddUrlVoice = async (formik) => {
    const { urlFile, voiceFileName, voiceDescription, selectCategoryId } = formik.values;
    try {
      const data = {
        type: 'telephony_vendor_voice_libraries',
        attributes: {
          name: voiceFileName,
          category_id: parseInt(selectCategoryId, 10),
          source: 'url',
          language: 'english',
          description: voiceDescription,
          url: urlFile,
          type: 'voice',
        },
      };
      await CreateVoiceLibraryBySourceForUrl(data);
      setToastAction({
        isVisible: true,
        message: 'Voice file has been added successfully.',
        type: 'success',
      });
      setRefresh(!refresh);
    } catch (error) {
      handleAddVoiceError(error);
    } finally {
      setShow({ isVisible: false, type: '' });
      setLoading({ isLoading: false, type: '' });
      setVoiceType({ isLoading: false, type: 'text-voice' });
      formik.resetForm();
    }
  };

  const handleAddUploadVoice = async (formik) => {
    const { momentaryStorageName, voiceFileName, voiceDescription, selectCategoryId } =
      formik.values;
    try {
      const data = {
        type: 'telephony_vendor_voice_libraries',
        attributes: {
          name: voiceFileName,
          category_id: parseInt(selectCategoryId, 10),
          source: 'upload',
          language: 'english',
          description: voiceDescription,
          voice_file: momentaryStorageName,
          type: 'voice',
        },
      };
      await CreateVoiceLibraryBySourceForUpload(data);
      setToastAction({
        isVisible: true,
        message: 'Voice file has been added successfully.',
        type: 'success',
      });
      setRefresh(!refresh);
    } catch (error) {
      handleAddVoiceError(error);
    } finally {
      setShow({ isVisible: false, type: '' });
      setLoading({ isLoading: false, type: '' });
      setVoiceType({ isLoading: false, type: 'text-voice' });
      formik.resetForm();
    }
  };

  const handleAddRecordVoice = async (formik) => {
    const { recordFile, voiceFileName, voiceDescription } = formik.values;
    try {
      const audioBlob = recordFile.data;
      const audioFile = new File([audioBlob], 'voice_file.wav', { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('upload_file', audioFile);
      MomentaryFileUpload(formData).then((response) => {
        if (response?.data?.data?.attributes?.storage_name) {
          const data = {
            type: 'telephony_vendor_voice_libraries',
            attributes: {
              name: voiceFileName,
              category_id: '',
              source: 'record',
              language: 'english',
              description: voiceDescription,
              voice_file: response?.data?.data?.attributes?.storage_name,
              type: 'voice',
            },
          };
          CreateVoiceLibraryBySourceForRecord(data)
            .then(() => {
              setToastAction({
                isVisible: true,
                message: 'Record Voice has been added successfully',
                type: 'success',
              });
              setRefresh(!refresh);
            })
            .catch((createError) => {
              alert('Error creating voice library:', createError);
              handleAddVoiceError(createError);
            });
        } else {
          handleAddVoiceError('Unexpected response format');
        }
      });
    } catch (error) {
      handleAddVoiceError(error);
    } finally {
      setShow({ isVisible: false, type: '' });
      setLoading({ isLoading: false, type: '' });
      setVoiceType({ isLoading: false, type: 'text-voice' });
      formik.resetForm();
    }
  };

  const listVoiceLibrary = () => {
    setLoading({ isLoading: true, type: 'list-VoiceLibrary' });
    ListVoiceLibrary(searchTermVoiceList, page, voiceCategoryId, filterType)
      ?.then((response) => {
        setVoiceUserList(response?.data);
        setIncludedList(response?.included);
        setPaginatedData({
          data: response?.data,
          links: response?.links,
          meta: response?.meta,
          isLoading: false,
        });
      })
      .finally(() => {
        setLoading({ isLoading: false, type: '' });
      });
  };

  const handleMoveVoiceLibrary = (formik) => {
    const { selectCategoryId } = formik.values;
    const data = {
      type: 'telephony_vendor_callers',
      id: parseInt(show.id, 10),
      attributes: {
        category_id: parseInt(selectCategoryId, 10),
        name: show.name,
      },
    };
    MoveVoiceLibrary(parseInt(show.id, 10), data)
      .then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Voice file has been moved successfully.',
        });
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Something went wrong.',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong.',
          });
        }
      })
      ?.finally(() => {
        setShow({ isVisible: false, type: '' });
        setLoading({ isLoading: false, type: '' });
        setVoiceType({ isLoading: false, type: 'text-voice' });
        formik.resetForm();
      });
  };

  const handleEditVoiceLibrary = async (formik) => {
    const { editId, editName, editCategoryId, editDescription, editMediaUrl, editSource } =
      formik.values.editLibrary;
    const data = {
      type: 'telephony_vendor_voice_libraries',
      id: parseInt(editId, 10),
      attributes: {
        name: editName,
        category_id: parseInt(editCategoryId, 10),
        description: editDescription,
        voice_file: editSource !== 'url' ? formik.values.momentaryStorageName : '',
        url: editSource === 'url' ? editMediaUrl : '',
        type: 'voice',
        source: editSource,
        text: 'use greeting',
        gender: 'male',
        language: 'english',
      },
    };
    await UpdateVoiceLibrary(parseInt(editId, 10), data)
      .then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'File has been edited successfully.',
        });
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Something went wrong.',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong.',
          });
        }
      })
      ?.finally(() => {
        setShow({ isVisible: false, type: '' });
        setLoading({ isLoading: false, type: '' });
        setShowEditModal({ isVisible: false, type: '' });
        setVoiceType({ isLoading: false, type: 'text-voice' });
        setEditVoiceType({ isVisible: false, type: 'change-text-voice' });
        formik.resetForm();
      });
  };

  const handleDeleteVoiceLibrary = () => {
    setLoading({ isLoading: true, type: 'delete-voice' });
    DeleteVoiceLibrary(parseInt(show?.id, 10))
      .then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'File has been deleted successfully.',
        });
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Something went wrong.',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong.',
          });
        }
      })
      ?.finally(() => {
        setShow({ isVisible: false, type: '' });
        setLoading({ isLoading: false, type: '' });
        setShowEditModal({ isVisible: false, type: '' });
        setVoiceType({ isLoading: false, type: 'text-voice' });
        setEditVoiceType({ isVisible: false, type: 'change-text-voice' });
      });
  };

  const validateURL = (url) => {
    const urlPattern = /^(http(s)?:\/\/)?(www\.)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
    const supportedFormats = ['.mp3', '.wav'];
    if (!urlPattern.test(url)) {
      return { isValid: false, error: 'Invalid URL format' };
    }
    const urlLower = url.toLowerCase();
    const endsWithSupportedFormat = supportedFormats.some((format) => urlLower.endsWith(format));
    if (!endsWithSupportedFormat) {
      return { isValid: false, error: 'Unsupported file format. Supported formats: mp3, wav' };
    }
    return { isValid: true, error: null };
  };

  const renderUrlError = (errorMessage) => (
    <div
      className="alert alert-danger w-100 d-flex gap-2"
      style={{
        color: '#c60000',
        borderRadius: '5px',
      }}
    >
      <img src="/assets/red-close.svg" alt="" /> {errorMessage}
    </div>
  );

  const validate = (data) => {
    const errors = {};
    if (voiceType.type === 'text-voice' && voiceType.isVisible === true) {
      if (!data.textDescription.trim()) {
        errors.textDescription = 'voice description is required';
      }
    }

    if (voiceType.type === 'text-voice-convert' && voiceType.isVisible === true) {
      if (!data.voiceFileName.trim()) {
        errors.voiceFileName = 'Voice file name is required';
      }
      if (!data.voiceDescription.trim()) {
        errors.voiceDescription = 'Voice description is required';
      }
    }

    if (voiceType.type === 'url-voice' && voiceType.isVisible === true) {
      const validationResult = validateURL(data.urlFile);
      if (!data.urlFile) {
        errors.urlFile = 'Voice URL is required';
      } else if (validationResult.error) {
        errors.urlFile = renderUrlError(validationResult.error);
      }

      if (!data.voiceFileName.trim()) {
        errors.voiceFileName = 'Voice file name is required';
      }
      if (!data.voiceDescription.trim()) {
        errors.voiceDescription = 'Voice description is required';
      }
    }

    if (voiceType.type === 'upload-voice' && voiceType.isVisible === true) {
      if (!data.uploadFile) {
        errors.uploadFile = 'voice file is required';
      }
      if (!data.voiceFileName.trim()) {
        errors.voiceFileName = 'Voice file name is required';
      }
      if (!data.voiceDescription.trim()) {
        errors.voiceDescription = 'Voice description is required';
      }
    }

    if (voiceType.type === 'record-voice' && voiceType.isVisible === true) {
      if (!data.recordFile) {
        errors.recordFile = 'Voice file is required';
      }
      if (!data.voiceFileName.trim()) {
        errors.voiceFileName = 'Voice file name is required';
      }
      if (!data.voiceDescription.trim()) {
        errors.voiceDescription = 'Voice description is required';
      }
    }

    if (voiceType.type === 'ivr-record-voice' && voiceType.isVisible === true) {
      if (!data.recordIvrDescription.trim()) {
        errors.recordIvrDescription = 'Type Message is required';
      }
    }

    if (show.type === 'rename-category' && show.isVisible === true) {
      if (!data.categoryRename.trim()) {
        errors.categoryRename = 'category name is required';
      } else if (data?.categoryRename === data?.existCategory) {
        errors.categoryRename = 'already existing category';
      }
    }

    if (showEditModal.type === 'edit-voice' && showEditModal.isVisible === true) {
      if (!data.editLibrary.editName.trim()) {
        errors.editName = 'file name is required';
      }
      if (!data.editLibrary.editDescription.trim()) {
        errors.editDescription = 'voice description is required';
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      voiceFileName: '',
      voiceDescription: '',
      voiceGender: '',
      urlFile: '',
      changeUrlFile: '',
      uploadFile: '',
      recordFile: '',
      momentaryStorageName: '',
      textDescription: '',
      recordIvrDescription: '',
      selectCategoryId: '',
      validUrl: false,
      categoryName: '',
      categoryRename: '',
      existCategory: '',
      categoryCount: '',
      editSource: '',
      editLibrary: {
        editId: '',
        editName: '',
        editDescription: '',
        editCategoryId: '',
        editSource: '',
        editMediaUrl: '',
        editUrl: '',
        editvalue: '',
        existName: '',
        existDescription: '',
        existSource: '',
        existMediaUrl: '',
        existCategoryId: '',
      },
    },
    validate,
    onSubmit: () => {
      if (show?.type === 'add-category') {
        setLoading({ isLoading: true, type: 'add-category' });
        handleCreateVoiceCategory(formik);
      } else if (show?.type === 'rename-category') {
        setLoading({ isLoading: true, type: 'rename-category' });
        handleRenameVoiceCategory(formik);
      } else if (show?.type === 'clear-category') {
        setLoading({ isLoading: true, type: 'clear-category' });
        handleClearVoiceCategory();
      }

      if (show?.type === 'move-category') {
        setLoading({ isLoading: true, type: 'move-category' });
        handleMoveVoiceLibrary(formik);
      }

      if (voiceType?.type === 'text-voice' && voiceType?.isVisible === true) {
        // setLoading({ isLoading: true, type: 'text-voice' });
        // handleAddTextToSpeech(formik);
        // setVoiceType({ isVisible: true, type: 'text-voice-convert' });
        alert('text-voice-convert function not add ');
      }

      if (voiceType?.type === 'text-voice-convert' && voiceType?.isVisible === true) {
        alert('text-voice-convert function not add ');
      }

      if (voiceType?.type === 'url-voice' && voiceType.isVisible === true) {
        setLoading({ isLoading: true, type: 'url-voice' });
        handleAddUrlVoice(formik);
      }

      if (voiceType?.type === 'upload-voice' && voiceType?.isVisible === true) {
        setLoading({ isLoading: true, type: 'upload-voice' });
        handleAddUploadVoice(formik);
      }

      if (voiceType?.type === 'record-voice' && voiceType?.isVisible === true) {
        setLoading({ isLoading: true, type: 'record-voice' });
        handleAddRecordVoice(formik);
      }

      if (voiceType?.type === 'ivr-record-voice' && voiceType?.isVisible === true) {
        setVoiceType({ isVisible: true, type: 'ivr-record-voice', ivr: 'ivr' });
      }

      if (editVoiceType?.type === 'change-text-voice' && editVoiceType?.isVisible === true) {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'File has been convert successfully',
        });
      }

      if (
        editVoiceType?.type === 'change-text-voice-convert' &&
        editVoiceType?.isVisible === true
      ) {
        setLoading({ isLoading: true, type: 'change-text-voice-convert' });
        formik.setFieldValue('editLibrary.editMediaUrl', formik?.values?.changeUrlFile);
        formik.setFieldValue('editLibrary.editSource', formik.values.editSource);
        setShow({ isVisible: false, type: '' });
        setLoading({ isLoading: false, type: '' });
      }

      if (showEditModal.type === 'edit-voice' && showEditModal?.isVisible === true) {
        setLoading({ isLoading: true, type: 'edit-voice' });
        handleEditVoiceLibrary(formik);
      }

      if (editVoiceType?.type === 'change-url-voice' && editVoiceType?.isVisible === true) {
        formik.setFieldValue('editLibrary.editMediaUrl', formik?.values?.changeUrlFile);
        formik.setFieldValue('editSource', 'url');
      }

      if (editVoiceType?.type === 'change-upload-voice' && editVoiceType?.isVisible === true) {
        formik.setFieldValue('editLibrary.editMediaUrl', formik.values.changeUrlFile);
        formik.setFieldValue('editSource', 'upload');
      }

      if (editVoiceType?.type === 'change-record-voice' && editVoiceType?.isVisible === true) {
        formik.setFieldValue('editLibrary.editMediaUrl', formik.values.momentaryStorageName);
        formik.setFieldValue('editSource', 'record');
        setShow({ isVisible: false, type: '' });
      }
    },
  });

  const formatDate = (dateString) => {
    const momentDate = moment(dateString)?.format('DD MMM YYYY');
    return momentDate;
  };

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const handlePlayPause = (fileId, isPlaying) => {
    if (isPlaying) {
      setCurrentlyPlaying(fileId);
    } else {
      setCurrentlyPlaying(null);
    }
  };

  const handleClose = () => {
    if (showEditModal.isVisible !== true) {
      formik.resetForm();
    }
    setShow({ isVisible: false, type: 'add-voice' });
    setVoiceType({ isVisible: false, type: 'text-voice' });
    setEditVoiceType({ isVisible: false, type: 'change-text-voice' });
  };

  const downloadAudio = (data) => {
    fetch(data)
      .then((response) => response.blob())
      .then((blob) => {
        const url1 = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url1;
        link.setAttribute('download', 'Kalimba.mp3');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(() => {});
  };

  const copyToClipboard = (data) => {
    copy(data);
    setToastAction({
      isVisible: true,
      message: 'coping successfully',
      type: 'success',
    });
  };

  useLayoutEffect(() => {
    listVoiceCategory();
  }, [refresh, searchTermCategory, voiceCategoryId, filterType, page]);

  useLayoutEffect(() => {
    listVoiceLibrary();
  }, [refresh, searchTermVoiceList, voiceCategoryId, filterType, page]);

  useEffect(() => {
    if (showEditModal.isVisible !== true && show.id === undefined) {
      formik.resetForm();
    }
    if (show.isVisible || showEditModal.isVisible) {
      setCurrentlyPlaying(null);
    }
  }, [voiceType, show.isVisible, showEditModal.isVisible]);

  return (
    <Layout
      favIcon="/assets/favIcons/favicon-voice.ico"
      title="comm voice"
      headerTitle="Settings"
      sideNavIcon="/assets/comm-voice-logo.svg"
    >
      <div className="wrapper d-flex flex-column flex-lg-row gap-0 gap-lg-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
        <div className="col-lg-12 ps-lg-0">
          <div className="row h-100">
            <div className="col-12">
              <div className="row gx-0 bg-white rounded content-area scroll-custom scroll-caller-list">
                <div id="headerVoice" className="d-none d-lg-block">
                  <div className="col-lg-12">
                    <div className="bg-white rounded p-23px w-100">
                      <div className="row align-items-center">
                        <div className="col-lg-12 col-sm-12">
                          <div className="d-flex gap-2 align-items-start">
                            <a
                              href="/app/comm-voice-admin/"
                              className="d-block d-lg-none"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </a>
                            <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                              <Link
                                to="/comm-voice-admin/"
                                className="d-flex justify-content-center"
                              >
                                <img src="/assets/leftback.svg" alt="" />
                              </Link>
                            </div>
                            <div className="d-flex flex-column">
                              <h4 className="fs-16px text-black fw-medium">Voice library</h4>
                              <div className="text-secondary fs-13px mb-0">
                                Manage voice clips uploaded in the library.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="headerVoiceMob" className="d-block d-lg-none">
                  <div className="col-lg-12">
                    <div className="bg-white rounded p-23px w-100">
                      <div className="row align-items-center">
                        <div className="col-lg-12 col-sm-12">
                          <div className="d-flex gap-2 align-items-start">
                            <Link id="voiceHeaderMainMob" to="/comm-voice-admin">
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </Link>
                            <a
                              id="voiceHeaderMob"
                              href="/#"
                              className="d-none"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </a>
                            <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                              <Link
                                to="/comm-voice-admin/"
                                className="d-flex justify-content-center"
                              >
                                <img src="/assets/leftback.svg" alt="" />
                              </Link>
                            </div>
                            <div className="d-flex flex-column">
                              <h4 className="fs-16px text-black fw-medium">Voice library</h4>
                              <div className="text-secondary fs-13px mb-0">
                                Manage voice clips uploaded in the library.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-12 right-sec-voice d-lg-block">
                  <div className="bg-tranparent rounded-top border-0 fs-12px p-3 ps-lg-4 pt-0">
                    <div className="border-0 shadow-6 rounded bg-white">
                      <div className="inbox-voice-wrapper scroll-custom">
                        <div className="p-3 gap-23px">
                          <div className="contact-content">
                            <a
                              className={`rounded d-flex align-items-center p-3 gap-13px voice-file ${
                                filterType === 'voice' ? 'active-voice' : ''
                              }`}
                              href="/app/comm-voice-admin/voice-library"
                              role="button"
                              id="voiceFiles"
                              onClick={(e) => {
                                e.preventDefault();
                                setVoiceCategoryId('');
                                setFilterType('voice');
                              }}
                            >
                              <div className="d-flex">
                                <p
                                  className={`voice-name fs-13px fw-semibold mb-0  group-name ${
                                    filterType === 'voice' ? 'text-blue-active' : ''
                                  }`}
                                >
                                  Voice files
                                </p>
                              </div>
                              <div className="ms-auto d-flex align-items-center me-3">
                                <p className="fs-12px mb-0 text-secondary">
                                  {totalVoiceList} voice
                                </p>
                              </div>
                            </a>
                            <a
                              className={`voice-file rounded d-flex align-items-center p-3 gap-13px mt-2 ${
                                filterType === 'music' ? 'active-voice' : ''
                              }`}
                              href="/app/comm-voice-admin/voice-library/voice-music"
                              role="button"
                              id="musicFiles"
                              onClick={(e) => {
                                e.preventDefault();
                                setFilterType('music');
                              }}
                            >
                              <div className="d-flex">
                                <p
                                  className={`fs-13px fw-semibold mb-0 voice-name group-name ${
                                    filterType === 'music' ? 'text-blue-active' : ''
                                  }`}
                                >
                                  Music files
                                </p>
                              </div>
                              <div className="ms-auto d-flex align-items-center me-3">
                                <p className="fs-12px mb-0 text-secondary">
                                  {totalVoiceList} music
                                </p>
                              </div>
                            </a>
                          </div>
                          <hr className="m-0 border-black o-16 mt-4" />
                          <div className="d-flex align-items-center mt-4">
                            <div className="text-primary fw-medium fs-14px d-flex">Categories</div>
                            <div className="ms-auto">
                              <div>
                                <a
                                  href="/#"
                                  data-bs-toggle="tooltip"
                                  data-bs-title="Add Categories"
                                  data-tooltip-id="tooltip-add-category"
                                  className="bg-black d-flex align-items-center justify-content-center text-white h-5 w-5 rounded"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShow({ isVisible: true, type: 'add-category' });
                                  }}
                                >
                                  <img src="/assets/add-white-icon.svg" alt="# " />
                                  <Tooltip
                                    id="tooltip-add-category"
                                    content="Add Categories"
                                    place="top"
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div id="category-wrap" className="d-flex mb-2">
                            <div className="rounded mt-4 w-100">
                              <SearchWithBorder
                                placeholderText="Search category"
                                searchTerm={searchTermCategory}
                                onChange={(e) => {
                                  e.preventDefault();
                                  setSearchTermCategory(e?.target.value);
                                }}
                                clearBtn={() => {
                                  setSearchTermCategory('');
                                }}
                              />
                            </div>
                          </div>
                          {loadingCategory?.isLoading ? (
                            <div className="d-flex align-items-center justify-content-center">
                              <SpinningLoader />
                            </div>
                          ) : null}
                          {categories?.map((e) => (
                            <VoiceCategory
                              onClick={() => {
                                setVoiceCategoryId(e?.id);
                              }}
                              key={e?.id}
                              title={e?.attributes.name}
                              count={e?.attributes.voice_libraries_count}
                              id={e.id}
                              active={voiceCategoryId}
                              setShow={setShow}
                              formik={formik}
                            />
                          ))}
                          {categories.length === 0 && !loadingCategory.isLoading && (
                            <NoMatchingRecords />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="voice-expand" className="col-lg-9 ">
                  <div className="panel-center bg-white rounded-bottom">
                    <div className="p-3 pt-0px user-list-voice scroll-custom">
                      <div className="response-search">
                        <div className="d-flex align-items-center align-items-center">
                          <div className="pe-3">
                            <p className="text-primary fw-medium fs-14px mb-0">
                              {filterType === 'voice' ? 'Voice files' : 'Music files'}
                            </p>
                          </div>
                          <div>
                            <p className="text-primary fs-12px mb-0 ms-4 ms-lg-0">
                              <span className="fw-medium">
                                {paginatedData?.meta?.pagination?.total}
                              </span>{' '}
                              {filterType === 'voice' ? 'Voice notes' : 'Music notes'}
                            </p>
                          </div>
                        </div>
                        <div className="row align-items-center mt-3 mb-3">
                          <div className="col-lg-3 col-sm-5">
                            <div>
                              <SearchWithBorder
                                placeholderText={
                                  filterType === 'voice'
                                    ? 'Search voice by name'
                                    : 'Search music by name'
                                }
                                searchTerm={searchTermVoiceList}
                                onChange={(e) => {
                                  e.preventDefault();
                                  setSearchTermVoiceList(e.target.value);
                                }}
                                clearBtn={() => {
                                  setSearchTermVoiceList('');
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-sm-4" />
                          <div className="col-lg-5 col-sm-3">
                            <div className="d-flex align-items-center gap-2 float-start float-lg-end mt-3 mt-lg-0 mt-sm-0">
                              <a
                                href="/"
                                data-bs-target="#addVoiceModal"
                                className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShow({ isVisible: true, type: 'add-voice' });
                                  setVoiceType({
                                    isVisible: true,
                                    type: voiceType.type,
                                  });
                                }}
                              >
                                Add voice
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        {loading?.isLoading && loading?.type === 'list-VoiceLibrary' ? (
                          <div className="d-flex align-items-center justify-content-center">
                            <SpinningLoader />
                          </div>
                        ) : null}
                        {voiceUserList?.map((userlist) => (
                          <VoiceUserListRow
                            formik={formik}
                            key={userlist?.id}
                            userlist={userlist}
                            includedList={includedList}
                            setShow={setShow}
                            formatDate={formatDate}
                            setShowEditModal={setShowEditModal}
                            isPlaying={currentlyPlaying === userlist?.id}
                            onPlayPause={(isPlaying) => handlePlayPause(userlist?.id, isPlaying)}
                            activeAudioId={currentlyPlaying}
                            setActiveAudioId={setCurrentlyPlaying}
                          />
                        ))}
                        {voiceUserList.length === 0 && !loading?.isLoading && <NoMatchingRecords />}
                      </div>
                      {voiceUserList?.length !== 0 && paginatedData?.meta?.pagination != null && (
                        <Pagination
                          handlePagination={handlePaginationFunction}
                          currentPage={paginatedData?.meta?.pagination?.current_page}
                          totalPages={paginatedData?.meta?.pagination?.total_pages}
                          count={paginatedData?.meta?.pagination?.per_page}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddVoice
        show={show?.type === 'add-voice' && show?.isVisible}
        setVoiceType={setVoiceType}
        voiceType={voiceType}
        formik={formik}
        setVoicePlaying={setVoicePlaying}
        voicePlaying={voicePlaying}
        isLoading={loading?.isLoading && loading?.type === voiceType?.type}
        setLoading={setLoading}
        categories={categories}
        onClose={handleClose}
        downloadAudio={downloadAudio}
        copyVoiceUrl={copyToClipboard}
      />

      <EditVoice
        show={show?.type === 'change-voice' && show?.isVisible}
        editVoiceType={editVoiceType}
        setEditVoiceType={setEditVoiceType}
        formik={formik}
        setVoicePlaying={setVoicePlaying}
        voicePlaying={voicePlaying}
        isLoading={loading?.isLoading && loading?.type === voiceType?.type}
        setLoading={setLoading}
        categories={categories}
        onClose={handleClose}
        downloadAudio={downloadAudio}
        copyVoiceUrl={copyToClipboard}
      />

      <AddCategoryModal
        formik={formik}
        show={show?.type === 'add-category' && show?.isVisible}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
          formik.resetForm();
        }}
        loading={loading?.isLoading && loading?.type === 'add-category'}
      />

      <RenameCategoryModal
        formik={formik}
        show={show?.type === 'rename-category' && show?.isVisible}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
          formik.resetForm();
        }}
        loading={loading?.isLoading && loading?.type === 'rename-category'}
      />

      <MoveFilesModal
        formik={formik}
        show={show?.type === 'move-category' && show?.isVisible}
        selectId={show?.selectId}
        categories={categories}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
          formik.resetForm();
        }}
        loading={loading?.isLoading && loading?.type === 'move-category'}
      />

      <DeleteVoiceModal
        show={show?.type === 'delete-voice' && show?.isVisible}
        handleDelete={handleDeleteVoiceLibrary}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        name={show?.name}
        loading={loading?.isLoading && loading?.type === 'delete-voice'}
      />

      <EditVoiceOffcanvas
        formik={formik}
        categories={categories}
        show={showEditModal?.type === 'edit-voice' && showEditModal?.isVisible}
        setShow={setShow}
        setEditVoiceType={setEditVoiceType}
        voiceType={voiceType}
        setVoiceType={setVoiceType}
        voicePlaying={voicePlaying}
        setVoicePlaying={setVoicePlaying}
        showEditModal={showEditModal}
        onClose={() => {
          setShowEditModal({ isVisible: false, type: '' });
        }}
        downloadAudio={downloadAudio}
        copyVoiceUrl={copyToClipboard}
        loading={loading?.isLoading && loading?.type === 'edit-voice'}
      />

      <ClearCategoryModal
        formik={formik}
        show={show?.type === 'clear-category' && show?.isVisible}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        name={show?.name}
        loading={loading?.isLoading && loading?.type === 'clear-category'}
      />

      <DeleteVoiceCategoryModal
        show={show?.type === 'delete-category' && show?.isVisible}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        name={show?.name}
        handleDelete={handleDeleteCategory}
        loading={loading?.isLoading && loading?.type === 'delete-category'}
      />

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
    </Layout>
  );
}

export default VoiceLibrary;
