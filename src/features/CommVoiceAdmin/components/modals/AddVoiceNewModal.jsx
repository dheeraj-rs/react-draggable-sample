/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import copy from 'copy-to-clipboard';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import AddVoiceTextSpeechGreeting from '../AddVoiceTextSpeechGreeting';
import AddVoiceURLGreeting from './AddVoiceURLGreeting';
import AddVoiceUploadGreeting from './AddVoiceUploadGreeting';
import AddVoiceRecordGreeting from '../AddVoiceRecordGreeting';
import ToastSuccess from '../../../../common/components/toast/ToastSucess';
import ToastError from '../../../../common/components/toast/ToastError';
import { ListVoiceCategory } from '../../../../common/api-collection/Telephony/VoiceCategory';
import {
  CreateVoiceLibraryBySourceForRecord,
  CreateVoiceLibraryBySourceForUpload,
  CreateVoiceLibraryBySourceForUrl,
} from '../../../../common/api-collection/Telephony/VoiceLibrary';
import MomentaryFileUpload from '../../../../common/api-collection/Common/MomentaryFileUpload';

function AddVoiceNewModal({ isShow, onClose, categoriesList, setCategoriesList }) {
  const [voiceType, setVoiceType] = useState({ isVisible: true, type: 'text-voice' });
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [isLoading, setIsLoading] = useState({ isLoading: false, type: '' });
  const [categories, setCategories] = useState([]);
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    ListVoiceCategory().then((response) => {
      setCategories(response?.data);
    });
  }, []);

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

  const copyVoiceUrl = (data) => {
    copy(data);
    setToastAction({
      isVisible: true,
      message: 'coping successfully',
      type: 'success',
    });
  };

  const handleAddVoiceError = (error) => {
    setIsLoading({ isLoading: false, type: voiceType?.type });
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

  const handleAddUrlVoice = async (formik) => {
    const { urlFile, voiceFileName, voiceDescription, selectCategoryId } = formik.values;

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

    CreateVoiceLibraryBySourceForUrl(data)
      .then(() => {
        setToastAction({
          isVisible: true,
          message: 'Voice file has been added successfully.',
          type: 'success',
        });
        setRefresh(!refresh);
        const updatedList = categoriesList.map((category) => {
          if (parseInt(category.id, 10) === data.attributes.category_id) {
            category.attributes.voice_libraries_count += 1;
            return category;
          }
          return category;
        });

        setCategoriesList(updatedList);
      })
      .catch((error) => {
        handleAddVoiceError(error);
      })
      .finally(() => {
        setIsLoading({ isLoading: false, type: '' });
        setVoiceType({ isLoading: false, type: 'text-voice' });
        formik.resetForm();
        onClose();
      });
  };

  const handleAddUploadVoice = async (formik) => {
    const { momentaryStorageName, voiceFileName, voiceDescription, selectCategoryId } =
      formik.values;

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
    CreateVoiceLibraryBySourceForUpload(data)
      .then(() => {
        const updatedList = categoriesList.map((category) => {
          if (parseInt(category.id, 10) === data.attributes.category_id) {
            category.attributes.voice_libraries_count += 1;
            return category;
          }
          return category;
        });

        setCategoriesList(updatedList);
      })
      .catch((error) => {
        handleAddVoiceError(error);

        setToastAction({
          isVisible: true,
          message: 'Voice file has been added successfully.',
          type: 'success',
        });
        setRefresh(!refresh);
      })
      .catch((error) => {
        handleAddVoiceError(error);
      })
      .finally(() => {
        setIsLoading({ isLoading: false, type: '' });
        setVoiceType({ isLoading: false, type: 'text-voice' });
        formik.resetForm();
        onClose();
      });
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

              const updatedList = categoriesList.map((category) => {
                if (parseInt(category.id, 10) === data.attributes.category_id) {
                  category.attributes.voice_libraries_count += 1;
                  return category;
                }
                return category;
              });

              setCategoriesList(updatedList);

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
      setIsLoading({ isLoading: false, type: '' });
      setVoiceType({ isLoading: false, type: 'text-voice' });
      formik.resetForm();
      onClose();
    }
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
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      voiceId: '',
      categoryId: '',
      voiceFileName2: 'Select IVR',
      voiceFileName: '',
      voiceDescription: '',
      textDescription: '',
      urlFile: '',
      uploadFile: '',
      recordFile: '',
      recordIvrDescription: '',
      validUrl: false,
    },
    validate,
    onSubmit: () => {
      if (voiceType?.type === 'text-voice' && voiceType?.isVisible === true) {
        alert('text-voice-convert function not add ');
      }

      if (voiceType?.type === 'text-voice-convert' && voiceType?.isVisible === true) {
        alert('text-voice-convert function not add ');
      }

      if (voiceType?.type === 'url-voice' && voiceType.isVisible === true) {
        setIsLoading({ isLoading: true, type: 'url-voice' });
        handleAddUrlVoice(formik);
      }

      if (voiceType?.type === 'upload-voice' && voiceType?.isVisible === true) {
        setIsLoading({ isLoading: true, type: 'upload-voice' });
        handleAddUploadVoice(formik);
      }

      if (voiceType?.type === 'record-voice' && voiceType?.isVisible === true) {
        setIsLoading({ isLoading: true, type: 'record-voice' });
        handleAddRecordVoice(formik);
      }

      if (voiceType?.type === 'ivr-record-voice' && voiceType?.isVisible === true) {
        setVoiceType({ isVisible: true, type: 'ivr-record-voice', ivr: 'ivr' });
      }
    },
  });

  const handleClose = () => {
    onClose();
    formik.resetForm();
  };

  return (
    <>
      <Modal width="568px" id="addVoiceGreetingModal modal" show={isShow}>
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-500 mb-3">Add Voice</p>
          <ModalClose onClose={handleClose} />
        </div>
        <p className="text-primary mb-2 fs-13px">Add voice via</p>

        {/* <!-- tab starts --> */}
        <div className="tab-ticket resolve-modal mt-1">
          <ul
            className="nav nav-pills bg-titan-water mb-3 d-flex align-items-center w-100 rounded"
            id="pills-tab-feedback"
            role="tablist"
          >
            <li className="nav-item  border-end" role="presentation" style={{ width: '30%' }}>
              <button
                className={`w-100 px-2 py-12px nav-link nav-voice-tab btn-new text-primary border-end-0 fw-medium rounded-start ${
                  voiceType.type === 'text-voice' || voiceType.type === 'text-voice-convert'
                    ? 'active'
                    : ''
                }`}
                id="pills-speech-tab"
                type="button"
                role="tab"
                aria-controls="pills-speech"
                aria-selected={
                  voiceType.type === 'text-voice' || voiceType.type === 'text-voice-convert'
                }
                onClick={(e) => {
                  e.preventDefault();
                  setVoiceType({ isVisible: true, type: 'text-voice' });
                }}
              >
                <span className="d-flex align-items-center justify-content-center">
                  <img className="pe-1" src="/assets/text.svg" alt="" />{' '}
                  <span className="d-none d-md-block">Text to Speech</span>
                </span>
              </button>
            </li>
            <li className="nav-item  border-end" role="presentation" style={{ width: '20%' }}>
              <button
                className={`w-100 px-2 py-12px rounded-0 nav-link nav-voice-tab btn-ext text-primary border-start-0 border-end-0 fw-medium  ${
                  voiceType.type === 'url-voice' ? 'active' : ''
                }`}
                id="pills-url-tab"
                type="button"
                role="tab"
                aria-controls="pills-url-sec"
                aria-selected="false"
                onClick={(e) => {
                  e.preventDefault();
                  setVoiceType({ isVisible: true, type: 'url-voice' });
                }}
              >
                <span className="d-flex align-items-center justify-content-center">
                  <img className="pe-1" src="/assets/voice-globe.svg" alt="" />
                  <span className="d-none d-md-block">URL</span>
                </span>
              </button>
            </li>
            <li className="nav-item  border-end" role="presentation" style={{ width: '25%' }}>
              <button
                className={`w-100 px-2 py-12px rounded-0 nav-link nav-voice-tab btn-ext text-primary border-start-0 border-end-0 fw-medium ${
                  voiceType.type === 'upload-voice' ? 'active' : ''
                }`}
                id="pills-upload-tab"
                type="button"
                role="tab"
                aria-controls="pills-upload"
                aria-selected="false"
                onClick={(e) => {
                  e.preventDefault();
                  setVoiceType({ isVisible: true, type: 'upload-voice' });
                }}
              >
                <span className="d-flex align-items-center justify-content-center">
                  <img className="pe-1" src="/assets/voice-upload.svg" alt="" />{' '}
                  <span className="d-none d-md-block">Upload</span>
                </span>
              </button>
            </li>
            <li className="nav-item " role="presentation" style={{ width: '25%' }}>
              <button
                className={`w-100 px-2 py-12px nav-link nav-voice-tab btn-ext text-primary border-start-0 fw-medium rounded-end ${
                  voiceType.type === 'record-voice' || voiceType.type === 'ivr-record-voice'
                    ? 'active'
                    : ''
                }`}
                id="pills-record-tab"
                type="button"
                role="tab"
                aria-controls="pills-record"
                aria-selected="false"
                onClick={(e) => {
                  e.preventDefault();
                  setVoiceType({ isVisible: true, type: 'record-voice' });
                }}
              >
                <span className="d-flex align-items-center justify-content-center">
                  <img className="pe-1" src="/assets/voice-record.svg" alt="" />{' '}
                  <span className="d-none d-md-block">Record</span>
                </span>
              </button>
            </li>
          </ul>

          <div className="tab-content" id="pills-tabContent">
            <div
              className={`tab-pane fade ${
                voiceType.type === 'text-voice' || voiceType.type === 'text-voice-convert'
                  ? 'show active'
                  : ''
              } mt-4`}
              id="pills-speech"
              role="tabpanel"
              aria-labelledby="pills-speech-tab"
            >
              <AddVoiceTextSpeechGreeting
                formik={formik}
                voicePlaying={voicePlaying}
                setVoicePlaying={setVoicePlaying}
                isLoading={isLoading.isLoading}
                voiceType={voiceType}
                setVoiceType={setVoiceType}
                onClose={onClose}
                categories={categories}
                downloadAudio={downloadAudio}
                copyVoiceUrl={copyVoiceUrl}
              />
            </div>

            <div
              className={`tab-pane fade ${
                voiceType.isVisible && voiceType.type === 'url-voice' ? 'show active' : ''
              }`}
              id="pills-url-sec"
              role="tabpanel"
              aria-labelledby="pills-url-tab"
            >
              <div>
                <AddVoiceURLGreeting
                  formik={formik}
                  isLoading={isLoading.isLoading}
                  voicePlaying={voicePlaying}
                  setVoicePlaying={setVoicePlaying}
                  voiceType={voiceType}
                  categories={categories}
                  onClose={onClose}
                  downloadAudio={downloadAudio}
                  copyVoiceUrl={copyVoiceUrl}
                />
              </div>
            </div>
            <div
              className={`tab-pane fade ${
                voiceType.isVisible && voiceType.type === 'upload-voice' ? 'show active' : ''
              }`}
              id="pills-upload"
              role="tabpanel"
              aria-labelledby="pills-upload"
            >
              <div>
                <AddVoiceUploadGreeting
                  formik={formik}
                  isLoading={isLoading.isLoading}
                  voiceType={voiceType}
                  onClose={onClose}
                  categories={categories}
                  downloadAudio={downloadAudio}
                  copyVoiceUrl={copyVoiceUrl}
                />
              </div>
            </div>
            <div
              className={`tab-pane fade ${
                (voiceType.isVisible && voiceType.type === 'record-voice') ||
                voiceType.type === 'ivr-record-voice'
                  ? 'show active'
                  : ''
              }`}
              id="pills-record"
              role="tabpanel"
              aria-labelledby="pills-record"
            >
              <div>
                <AddVoiceRecordGreeting
                  formik={formik}
                  isLoading={isLoading.isLoading}
                  voiceType={voiceType}
                  setVoiceType={setVoiceType}
                  onClose={onClose}
                  downloadAudio={downloadAudio}
                  copyVoiceUrl={copyVoiceUrl}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- tab ends --> */}
      </Modal>
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

export default AddVoiceNewModal;
