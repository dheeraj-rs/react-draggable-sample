/* eslint-disable indent */
import React, { useEffect } from 'react';
import '../../../../styles/scss/components/customIvr.scss';
import SearchWithBorder from '../../../../common/components/common/SearchWithBorder';
import SpinningLoader from '../../../../common/components/Loader/SpinningLoader';
import NoMatchingRecords from '../../../../common/components/NoMatchingRecords';

function CustomIVR({
  categoriesList,
  files,
  setVoiceLibraryList,
  value,
  type,
  active,
  setActive,
  onSelect,
  loading,
  setLoading,
  togglePlay,
  selectedVoice,
  onPause,
  categoryId = '',
  fileId = '',
  isInvalid = true,
  setShowModal,
  showModal,
}) {
  useEffect(() => {
    if (categoryId && fileId) {
      setActive({ ...active, categoryId, fileId });
    }
  }, [categoryId, fileId]);

  return (
    <>
      <div className="custom-ivr">
        <div className="dropdown position-relative">
          <button
            className={`dropdown-toggle ${isInvalid ? '' : 'custom-ivr-button border'} bg-white`}
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={() => {
              setLoading(false);
              setActive({ state: false, type, fileName: '', categoryName: '', categoryId, fileId });
              setVoiceLibraryList([]);
            }}
            style={
              isInvalid
                ? {
                    width: '100%',
                    borderRadius: '6px',
                    color: '#645DF6',
                    fontSize: '13px',
                    padding: '10px',
                    textAlign: 'left',
                    minHeight: '38px',
                    lineHeight: 0,
                    border: '1px solid red',
                  }
                : {
                    width: '100%',
                    borderRadius: '6px',
                    color: '#645DF6',
                    fontSize: '13px',
                    padding: '10px',
                    textAlign: 'left',
                    minHeight: '38px',
                    lineHeight: 0,
                  }
            }
          >
            <div
              className="d-inline-block text-truncate align-middle"
              style={{
                maxWidth: '220px',
                height: '18px',
                lineHeight: '18px',
              }}
            >
              <img
                src="/assets/call-flows-hours/voice-activate.svg"
                alt=""
                style={{ verticalAlign: 'middle', marginRight: '5px' }}
              />
              <span
                style={{
                  paddingRight: '87px',
                  verticalAlign: 'middle',
                }}
              >
                {value}
              </span>
            </div>
          </button>
          <div className="d-flex align-items-center gap-3 custom-ivr-button-left">
            <div role="button">
              <div
                className="d-flex align-items-center gap-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="New voice"
                onClick={() => {
                  setShowModal({ isVisible: true, type: 'add-voice' });
                  setActive({ state: false, type: 'greetify', categoryId, fileId });
                  setVoiceLibraryList([]);
                }}
              >
                <img src="/assets/call-flows-hours/add-circle.svg" alt="" />
              </div>
            </div>
            <div data-bs-toggle="tooltip" data-bs-placement="top" title="Voice Library">
              <img src="/assets/call-flows-hours/list-music.svg" alt="" />
            </div>
          </div>
          <div className="dropdown-menu custom-ivr-dropdown-menu p-3">
            <div
              className={`custom-ivr-tab-one ${
                active?.state === false && active?.type === type ? '' : 'd-none'
              }`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <h4 className="text-primary fs-13px fw-500 mt-0 mb-3">Categories</h4>
              <SearchWithBorder
                placeholderText="Search Categories"
                onChange={(e) => {
                  setActive({
                    ...active,
                    categoryName: e.target.value,
                    fileName: '',
                    fileId,
                    categoryId,
                  });
                }}
                clearBtn={() => {
                  setActive('');
                }}
                searchTerm={active?.categoryName || ''}
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
              {categoriesList?.length === 0 && loading === false && (
                <NoMatchingRecords title="NO MATCHING CATEGORY FOUND" />
              )}

              <ul
                className="custom-ivr-list-menu custom-ivr-categori-list mt-3 scroll-custom"
                style={loading === true || categoriesList?.length === 0 ? { display: 'none' } : {}}
              >
                {categoriesList?.map((category, index) => (
                  <li
                    className={`${
                      String(active?.categoryId) === String(category?.id) ? 'active ' : ''
                    } d-flex align-items-center justify-content-between`}
                    key={index}
                    onClick={() => {
                      setActive({
                        state: true,
                        type,
                        categoryName: category.attributes.name,
                        categoryId: category?.id,
                        fileId,
                      });
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

            <div
              className={`custom-ivr-tab-two ${
                active?.state === true && active?.type === type ? '' : 'd-none'
              }`}
            >
              <h3 className="fs-13px text-primary mt-0 mb-3">
                <img
                  className="me-2 cursor-pointer custom-ivr-category-back-btn"
                  src="/assets/call-flows-hours/CaretLeft.svg"
                  alt=""
                  onClick={(e) => {
                    e.stopPropagation();
                    setVoiceLibraryList([]);
                    setActive({
                      ...active,
                      state: false,
                      type,
                      fileName: '',
                      categoryName: '',
                      fileId,
                      categoryId,
                    });
                  }}
                />
                Select IVR
              </h3>
              <SearchWithBorder
                placeholderText="Search files"
                onChange={(e) => {
                  setActive({ ...active, fileName: e.target.value, fileId, categoryId });
                }}
                clearBtn={() => {
                  setActive('');
                }}
                searchTerm={active?.fileName || ''}
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
              {files?.length === 0 && loading === false && (
                <NoMatchingRecords title="NO MATCHING FILES FOUND" />
              )}

              <ul className="custom-ivr-list-menu custom-ivr-category-menu-list mt-3 scroll-custom">
                {files?.map((file, index) => (
                  <li
                    className={`${
                      String(active?.fileId) === String(file?.id) ? 'active ' : ''
                    } d-flex align-items-center justify-content-between`}
                    key={index}
                    onClick={() => {
                      onSelect({ name: file?.attributes?.name, id: file.id });
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
          </div>
        </div>
      </div>
      {showModal && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default CustomIVR;
