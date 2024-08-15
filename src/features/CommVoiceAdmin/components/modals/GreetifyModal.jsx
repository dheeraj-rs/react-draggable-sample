import React, { useEffect } from 'react';
import { useFormik } from 'formik';

import useStore from '../../../Test/store';
import SearchWithBorder from '../../../../common/components/common/SearchWithBorder';
import { getNodeDetails, isFormFieldValid } from '../../../../common/helpers/utils';
import SpinningLoader from '../../../../common/components/Loader/SpinningLoader';
import NoMatchingRecords from '../../../../common/components/NoMatchingRecords';

function GreetifyModal({
  isVisible,
  onSelect,
  onUpdate,
  onClose,
  categoriesList,
  voiceLibraryList,
  setVoiceLibraryList,
  active,
  setActive,
  loading = false,
  togglePlay,
  selectedVoice,
  onPause,
  resetAudio,
  isDataSubmiting,
  allAvailableVoices,
  setShowModal,
  showModal,
}) {
  const { show, setShow, flow, flowNodes } = useStore();

  const validate = (data) => {
    const errors = {};

    if (!data.voiceId) {
      errors.voiceFileName = 'file is required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      voiceId: '',
      categoryId: '',
      voiceFileName: 'Select IVR',
    },
    validate,
    onSubmit: () => {
      if (show?.actionType === 'edit-node') {
        onUpdate({
          nodeId: show?.nodeId,
          details: {
            voiceId: formik.values.voiceId,
          },
        });
      } else {
        onSelect({
          formik,
          prevHandleId: show?.prevHandleId,
          prevNodeId: show?.prevNodeId,
          type: 'greetify',
          details: {
            voiceId: formik.values.voiceId,
          },
        });
      }
    },
  });

  const handleClose = () => {
    onClose();
    setVoiceLibraryList([]);
    setActive({ state: false, type: '', categoryName: '', fileName: '' });
    formik.resetForm();
    setShow({ isVisible: false, type: '' });
  };

  useEffect(() => {
    if (
      show?.actionType === 'edit-node' &&
      show?.nodeId &&
      show?.type === 'Greetify' &&
      allAvailableVoices?.length > 0
    ) {
      const nodeDetails = getNodeDetails(show?.nodeId, flowNodes);
      const result =
        allAvailableVoices.filter((voice) => voice.id === nodeDetails?.details?.voiceId) || [];
      formik.setFieldValue('voiceId', result[0]?.id);
      formik.setFieldValue('categoryId', String(result[0]?.attributes?.category_id));
      formik.setFieldValue('voiceFileName', result[0]?.attributes?.name);
    }
  }, [show?.actionType, show?.nodeId, flow, allAvailableVoices]);

  if (isVisible) {
    return (
      <>
        <div
          className="modal fade show"
          id="greetifyModal"
          tabIndex="-1"
          aria-labelledby="greetifyModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog hours-modal-outer">
            <div className="modal-content">
              <div className="modal-body hours-modal">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <span>
                      <img src="/assets/call-flows-hours/voice-phone-svgrepo-com.svg" alt="" />
                    </span>
                    <h5 className="fs-16px text-primary fw-500 m-0">Greeting</h5>
                  </div>
                  <span className="cursor-pointer" data-bs-dismiss="modal" onClick={handleClose}>
                    <img src="/assets/call-flows-hours/X.svg" alt="" />
                  </span>
                </div>
                <p className="text-secondary fs-13px mb-5 mt-0">
                  This component is use to set up the first message that callers listen when they
                  call to your company
                </p>
                <h5 className="fs-13px mb-2 fw-normal">Greeting IVR</h5>
                <div className="dropdown select-IVR-dropdown">
                  <button
                    className="select-time-slot d-flex align-items-center justify-content-between "
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={
                      isFormFieldValid(formik, 'voiceFileName') ? { border: '1px solid red' } : {}
                    }
                    onClick={() => {
                      setActive({ state: false, type: 'greetify' });
                      setVoiceLibraryList([]);
                    }}
                  >
                    <p className="m-0 d-flex align-items-center gap-2 select-ivr-btn">
                      <img src="/assets/call-flows-hours/voice-activate.svg" alt="" />
                      <span>{formik?.values?.voiceFileName}</span>
                    </p>
                  </button>
                  <div className="d-flex align-items-center gap-3 ivr-add-new-popup-btn cursor-pointer">
                    <div
                      className="add-new-voice-button d-flex align-items-center gap-2"
                      role="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowModal({ isVisible: true, type: 'add-voice' });
                      }}
                    >
                      <img src="/assets/call-flows-hours/add-circle.svg" alt="" />
                      <span>New</span>
                    </div>
                    <div>
                      <img src="/assets/call-flows-hours/list-music.svg" alt="" />
                    </div>
                  </div>

                  <div className="dropdown-menu ivr-dropdown-menu p-4">
                    {/* Categories - start */}
                    <div
                      className={`ivr-catagories ivr-catagories-one ${
                        active.state === false && active.type === 'greetify' ? '' : 'd-none'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <h3 className="fs-13px text-primary mt-0 mb-3">Categories</h3>
                      <SearchWithBorder
                        placeholderText="Search categories"
                        onChange={(e) => {
                          setActive({ ...active, categoryName: e.target.value, fileName: '' });
                        }}
                        clearBtn={() => {
                          setActive('');
                        }}
                        searchTerm={active?.categoryName}
                      />
                      {loading && (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '10px',
                          }}
                        >
                          <SpinningLoader />
                        </div>
                      )}
                      {categoriesList?.length === 0 && loading === false && <NoMatchingRecords />}
                      <ul
                        className="ivr-list-menu ivr-categori-list mt-3 scroll-custom"
                        style={
                          loading === true || categoriesList?.length === 0
                            ? { display: 'none' }
                            : {}
                        }
                      >
                        {categoriesList?.map((category, index) => (
                          <li
                            key={index}
                            className={`${
                              formik?.values?.categoryId === category?.id ? 'active ' : ''
                            } d-flex align-items-center justify-content-between`}
                            onClick={() => {
                              setActive({
                                state: true,
                                type: 'greetify',
                                categoryName: '',
                                categoryId: category?.id,
                                fileName: '',
                              });
                              formik.setFieldValue('categoryId', category?.id);
                            }}
                          >
                            <div>{category.attributes.name}</div>
                            <div className="d-flex align-items-center gap-5">
                              <span>{category.attributes.voice_libraries_count} files</span>
                              <img src="/assets/call-flows-hours/CaretRight.svg" alt="" />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Categories - end */}

                    {/* Folder - start */}
                    <div
                      className={`ivr-catagories ivr-catagories-two ${
                        active.state === true && active.type === 'greetify' ? '' : 'd-none'
                      }`}
                    >
                      <h3 className="fs-13px text-primary mt-0 mb-3">
                        <img
                          className="me-2 cursor-pointer ivr-category-back-btn"
                          src="/assets/call-flows-hours/CaretLeft.svg"
                          alt=""
                          onClick={(e) => {
                            e.stopPropagation();
                            setVoiceLibraryList([]);
                            setActive({ ...active, state: false, type: 'greetify', fileName: '' });
                          }}
                        />
                        {formik?.values?.voiceFileName}
                      </h3>
                      <SearchWithBorder
                        placeholderText="Search files"
                        onChange={(e) => {
                          setActive({ ...active, fileName: e.target.value });
                        }}
                        clearBtn={() => {
                          setActive('');
                        }}
                        searchTerm={active?.fileName}
                      />
                      <ul className="ivr-list-menu ivr-category-menu-list mt-3 scroll-custom">
                        {loading && (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: '10px',
                            }}
                          >
                            <SpinningLoader />
                          </div>
                        )}
                        {voiceLibraryList?.length === 0 && loading === false && (
                          <NoMatchingRecords />
                        )}
                        {voiceLibraryList?.map((file, index) => (
                          <li
                            key={index}
                            className={`d-flex align-items-center justify-content-between ${
                              formik?.values?.voiceId === file.id ? 'active' : ''
                            }`}
                            data-bs-dismiss="dropdown"
                            onClick={() => {
                              resetAudio();
                              setActive({
                                state: false,
                                type: '',
                                categoryName: '',
                                categoryId: '',
                                fileName: '',
                              });
                              setVoiceLibraryList([]);
                              formik.setFieldValue('voiceFileName', file?.attributes?.name);
                              formik.setFieldValue('voiceId', file?.id);
                            }}
                          >
                            <div>
                              <img
                                id="play-audio"
                                className={`me-2 ${selectedVoice?.id === file.id ? 'd-none' : ''}`}
                                src="/assets/call-flows-hours/play-circle-1.svg"
                                alt=""
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePlay(
                                    file?.id,
                                    'greetify',
                                    file?.attributes?.voice_file_media_url,
                                    !selectedVoice?.isVoicePalying
                                  );
                                }}
                              />
                              <img
                                id="pause-audio"
                                className={`me-2 ${selectedVoice?.id === file.id ? '' : 'd-none'}`}
                                src="/assets/call-flows-hours/play-circle.svg"
                                alt=""
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onPause('select', 'greetify', '', false);
                                }}
                              />
                              {file?.attributes?.name}
                            </div>
                            <div
                              className={`d-flex align-items-center gap-5  ${
                                selectedVoice?.id === file.id ? '' : 'd-none'
                              }`}
                            >
                              <img src="/assets/call-flows-hours/voice.svg" alt="" />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Folder - end */}
                  </div>
                </div>
                {/* {getFormErrorMessage(formik, 'voiceFileName')} */}
                <div className="timeslot-buttons mt-4 d-flex align-item-center">
                  <button
                    type="button"
                    className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                    id="greetify-save"
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                    disabled={isDataSubmiting}
                  >
                    {isDataSubmiting ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    className="d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          {showModal && <div className="offcanvas-backdrop fade show" />}
        </div>
        <div className="modal-backdrop fade show" />
      </>
    );
  }
}

export default GreetifyModal;
