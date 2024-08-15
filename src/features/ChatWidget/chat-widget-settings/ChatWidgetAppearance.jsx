import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ColorScheme from '../../SupportWidget/components/ColorScheme';
import ButtonWhite from '../../../common/components/buttons/ButtonWhite';
import CustomColorSchema from '../components/CustomColorSchema';
import WidgetPositioning from '../components/WidgetPositioning';
import BackgroundTexture from '../components/BackgroundTexture';
import LauncherButtonSection from '../components/LauncherButtonSection';
import BannerColor from '../components/BannerColor';
import {
  CreateChatWidgetTheme,
  GetChatWidgetTheme,
  ListChatWidgetThemes,
  UpdateChatWidgetTheme,
} from '../../../common/api-collection/ChatWidget/ChatWidgetThemes';

import ButtonToast from '../components/ButtonToast';
import ButtonWhiteModalCancel from '../components/ButtonWhiteModalCancel';
import InputModal from '../../../common/components/common/InputModal';
import { SetAppearance } from '../../../common/api-collection/ChatWidget/ChatWidgets';
import MomentaryFileUpload from '../../../common/api-collection/Common/MomentaryFileUpload';

function ChatWidgetAppearance({ chatWidgetDetails, getWidgetAppearanceDetails, setToastAction }) {
  const params = useParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [showModal, setShowModal] = useState({ type: '', isVisible: false });

  const [loading, setLoading] = useState({ state: false, type: '' });
  const [colorSchemeType, setColorSchemeType] = useState('new');
  const [selectedColocSchemaDetails, setSelectedColocSchemaDetails] = useState({
    bannerBgColorOne: '#5D5AEC',
    bannerTextColor: '#FFFFFF',
    isDefault: true,
    launcherBtnBgColorOne: '#5D5AEC',
    launcherBtnTextColor: '#FFFFFF',
    name: 'Default',
    widgetId: parseInt(params?.id, 10),
    backgroundTexture: 'none',
    position: 'bottom-right',
    horizontalOffset: 30,
    bottomOffset: 30,
    id: 1,
  });

  const [chatWidgetThemesList, setChatWidgetThemesList] = useState([]);
  const [renameColorScheme, setRenameColorScheme] = useState({ id: '', name: '' });
  const [deleteColorScheme, setDeleteColorScheme] = useState({ id: '', name: '' });

  const [refresh, setRefresh] = useState(false);
  const [isBrandingHidden, setIsBrandingHidden] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [widgetLogoProfilPhotoPath, setWidgetLogoProfilPhotoPath] = useState('');

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('upload_file', event.target.files[0]);
    MomentaryFileUpload(formData).then((response) => {
      setWidgetLogoProfilPhotoPath(response?.data?.data?.attributes?.storage_name);
    });
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageSr = e.target.result;
      setImageSrc(imageSr);
    };
    reader.readAsDataURL(file);
  };

  function open() {
    inputRef.current.click();
  }

  const handleCreateChatWidgetTheme = () => {
    setLoading({ state: true, type: 'save-as-new' });
    const data = {
      type: 'chat_widget_themes',
      attributes: {
        widget_id: selectedColocSchemaDetails?.widgetId,
        name: selectedColocSchemaDetails?.name,
        is_default: selectedColocSchemaDetails?.isDefault,
        banner_bg_color_one: selectedColocSchemaDetails?.bannerBgColorOne,
        banner_text_color: selectedColocSchemaDetails?.bannerTextColor,
        launcher_btn_bg_color_one: selectedColocSchemaDetails?.launcherBtnBgColorOne,
        launcher_btn_text_color: selectedColocSchemaDetails?.launcherBtnTextColor,
        background_texture: selectedColocSchemaDetails?.backgroundTexture,
        position: selectedColocSchemaDetails?.position,
        horizontal_offset: selectedColocSchemaDetails?.horizontalOffset,
        bottom_offset: selectedColocSchemaDetails?.bottomOffset,
      },
    };
    CreateChatWidgetTheme(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Saved: You have successfully saved the changes',
        });
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while Saving the Widget!',
        });
      })
      ?.finally(() => {
        setLoading({ state: false, type: '' });
        setShowModal({ type: '', isVisible: false });
      });
  };

  const handleUpdateChatWidgetTheme = () => {
    setLoading({ state: true, type: 'update-theme' });
    const data = {
      type: 'chat_widget_themes',
      id: parseInt(selectedColocSchemaDetails?.id, 10),
      attributes: {
        widget_id: selectedColocSchemaDetails?.widgetId,
        name: selectedColocSchemaDetails?.name,
        is_default: selectedColocSchemaDetails?.isDefault,
        banner_bg_color_one: selectedColocSchemaDetails?.bannerBgColorOne,
        banner_text_color: selectedColocSchemaDetails?.bannerTextColor,
        launcher_btn_bg_color_one: selectedColocSchemaDetails?.launcherBtnBgColorOne,
        launcher_btn_text_color: selectedColocSchemaDetails?.launcherBtnTextColor,
        background_texture: selectedColocSchemaDetails?.backgroundTexture,
        position: selectedColocSchemaDetails?.position,
        horizontal_offset: selectedColocSchemaDetails?.horizontalOffset,
        bottom_offset: selectedColocSchemaDetails?.bottomOffset,
      },
    };

    UpdateChatWidgetTheme(selectedColocSchemaDetails?.id, data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Scheme Updated:You have successfully updated the scheme',
        });
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while updating!',
        });
      })
      ?.finally(() => {
        setLoading({ state: false, type: '' });
      });
  };

  const getChatWidgetThemeDetails = (themeId) => {
    GetChatWidgetTheme(themeId)?.then((response) => {
      setSelectedColocSchemaDetails({
        bannerBgColorOne: response?.data?.attributes?.banner_bg_color_one,
        bannerTextColor: response?.data?.attributes?.banner_text_color,
        isDefault: response?.data?.attributes?.is_default,
        launcherBtnBgColorOne: response?.data?.attributes?.launcher_btn_bg_color_one,
        launcherBtnTextColor: response?.data?.attributes?.launcher_btn_text_color,
        name: response?.data?.attributes?.name,
        widgetId: parseInt(response?.data?.attributes?.widget_id, 10),
        backgroundTexture: response?.data?.attributes?.background_texture,
        position: response?.data?.attributes?.position,
        horizontalOffset: response?.data?.attributes?.horizontal_offset,
        bottomOffset: response?.data?.attributes?.bottom_offset,
        id: response?.data?.id,
      });
    });
  };

  const handleSetAppearance = () => {
    setLoading({ state: true, type: 'set-appearance' });

    const data = {
      type: 'chat_widgets',
      id: parseInt(params?.id, 10),
      attributes: {
        is_branding_hidden: isBrandingHidden,
        theme_id: parseInt(selectedColocSchemaDetails?.id, 10),
        logo_image: widgetLogoProfilPhotoPath,
      },
    };

    SetAppearance(params?.id, data)
      ?.then((response) => {
        setImageSrc(response?.data?.attributes?.logo_media_url);
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Saved: You have successfully saved the changes',
        });
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        setImageSrc(chatWidgetDetails?.attributes?.logo_media_url);
        if (error.response.status !== 500) {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Error while Saving!',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Error while Saving!',
          });
        }
      })
      ?.finally(() => {
        setLoading({ state: false, type: '' });
        setWidgetLogoProfilPhotoPath();

        if (inputRef.current) {
          inputRef.current.value = null; // Clearing the value
        }
      });
  };

  const handleActiveUpdateBtn = (schemeType) => {
    if (schemeType === 1) {
      return '';
    }
    if (schemeType === 'new') {
      return 'd-none';
    }
    return '';
  };

  const handleActiveSaveBtn = (schemeType) => {
    if (schemeType === 1) {
      return 'd-none';
    }
    if (schemeType === 'new') {
      return '';
    }
    return 'd-none';
  };

  useEffect(() => {
    ListChatWidgetThemes()?.then((response) => {
      setChatWidgetThemesList(response?.data);
    });
  }, [refresh]);

  useEffect(() => {
    if (chatWidgetDetails?.id) {
      setIsBrandingHidden(chatWidgetDetails?.attributes?.is_branding_hidden);
      setImageSrc(chatWidgetDetails?.attributes?.logo_media_url);
      setColorSchemeType(chatWidgetDetails?.attributes?.theme_id);
      if (chatWidgetDetails?.attributes?.theme_id) {
        getChatWidgetThemeDetails(chatWidgetDetails?.attributes?.theme_id);
      }
    }
  }, [chatWidgetDetails]);

  useEffect(() => {
    getWidgetAppearanceDetails(selectedColocSchemaDetails, isBrandingHidden);
  }, [selectedColocSchemaDetails, isBrandingHidden]);

  return (
    <>
      <div
        className="tab-pane fade"
        id="widget-tab-appearance"
        role="tabpanel"
        aria-labelledby="appearance-tab"
      >
        <div className="scroll-wrap scroll-custom p-1 pe-3 position-relative">
          <div className="">
            <div className="col-lg-12 col-sm-12">
              <div className="upload-logo d-flex gap-3 rounded mt-30 p-4 shadow-6 mx-1">
                <a
                  className="image-upload"
                  href="/#"
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                >
                  <label htmlFor="file-input">
                    <img
                      className="rounded-circle"
                      src={imageSrc || '/assets/topic-upload.svg'}
                      alt=""
                      width="50"
                      height="50"
                    />
                  </label>

                  <input
                    ref={inputRef}
                    onChange={(e) => {
                      e.preventDefault();
                      handleFileInputChange(e);
                    }}
                    className="d-none"
                    // id="file-input"
                    type="file"
                  />
                </a>
                <div className="d-flex flex-column gap-2">
                  <div className="text-primary fw-medium">Widget logo</div>
                  <div className="text-secondary">
                    Upload image resolution 100X100 and 1:1 aspect ratio (jpg,png,svg,webp)
                  </div>
                </div>
              </div>
            </div>
            <div className="theming ps-1">
              <h6 className="mt-5 mb-4">
                Select a color scheme (You can add up to 10 color schemes)
              </h6>
              <div className="d-flex gap-1 flex-wrap text-center">
                <div className="parent">
                  <div className="d-flex gap-3 flex-wrap ">
                    {chatWidgetThemesList?.map((theme) => (
                      <ColorScheme
                        theme={theme}
                        key={theme?.id}
                        color="transparent"
                        setColorSchemeType={setColorSchemeType}
                        colorSchemeType={colorSchemeType}
                        setSelectedColocSchemaDetails={setSelectedColocSchemaDetails}
                        selectedColocSchemaDetails={selectedColocSchemaDetails}
                        setRenameColorScheme={setRenameColorScheme}
                        renameColorScheme={renameColorScheme}
                        setToastAction={setToastAction}
                        setRefresh={setRefresh}
                        refresh={refresh}
                        deleteColorScheme={deleteColorScheme}
                        setDeleteColorScheme={setDeleteColorScheme}
                        getChatWidgetThemeDetails={getChatWidgetThemeDetails}
                      />
                    ))}
                    <CustomColorSchema
                      setColorSchemeType={setColorSchemeType}
                      colorSchemeType={colorSchemeType}
                    />
                  </div>
                </div>
              </div>

              <div
                id="customSection"
                className={`shadow-6 mt-5 p-4 rounded opacity ${
                  colorSchemeType === 1 ? 'opacity-50' : ''
                } `}
              >
                <div className="row gx-5">
                  <div className="">
                    <h6 className="fs-14 fw-500">Banner color</h6>
                    <div className="col-sm-10 mt-5">
                      <BannerColor
                        selectedColocSchemaDetails={selectedColocSchemaDetails}
                        setSelectedColocSchemaDetails={setSelectedColocSchemaDetails}
                      />
                      <hr className="m-0 mt-5 border-black o-16" />
                      <LauncherButtonSection
                        selectedColocSchemaDetails={selectedColocSchemaDetails}
                        setSelectedColocSchemaDetails={setSelectedColocSchemaDetails}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <BackgroundTexture
                selectedColocSchemaDetails={selectedColocSchemaDetails}
                setSelectedColocSchemaDetails={setSelectedColocSchemaDetails}
              />
              <WidgetPositioning
                selectedColocSchemaDetails={selectedColocSchemaDetails}
                setSelectedColocSchemaDetails={setSelectedColocSchemaDetails}
                colorSchemeType={colorSchemeType}
              />
              <div className="col-lg-12 col-sm-12">
                <div className="mt-5">
                  <button
                    type="button"
                    id="updateTheme"
                    className={`${handleActiveUpdateBtn(
                      colorSchemeType
                    )} A d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-gray-blue px-4 py-12px`}
                    onClick={() => {
                      handleUpdateChatWidgetTheme();
                    }}
                    disabled={loading?.state}
                  >
                    {loading?.state && loading?.type === 'update-theme'
                      ? 'Updating...'
                      : 'Update Theme'}
                  </button>
                  <button
                    type="button"
                    id="newTheme"
                    // data-bs-toggle="modal"
                    // data-bs-target="#newtheme"
                    className={`${handleActiveSaveBtn(
                      colorSchemeType
                    )} B d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-gray-blue px-4 py-12px`}
                    onClick={() => {
                      setShowModal({ type: 'save-as-new', isVisible: true });
                      setSelectedColocSchemaDetails({ ...selectedColocSchemaDetails, name: '' });
                    }}
                  >
                    Save as new theme
                  </button>
                </div>
                <div className="d-flex justify-content-between align-items-center bg-ash-white p-3 py-4 rounded mt-5 flex-wrap gap-4">
                  <h6 className="mb-0 fs-14">
                    Don’t want to see the
                    <b className="ps-1">Powered by: Gsoftcomm</b>
                    <span>” branding line in the widget bottom?</span>
                  </h6>
                  <div>
                    <label className="switch">
                      <input
                        className="check-powered"
                        type="checkbox"
                        id="check-powered"
                        checked={isBrandingHidden}
                        onChange={() => {}}
                        onClick={() => {
                          setIsBrandingHidden(!isBrandingHidden);
                        }}
                      />
                      <span className="slider round" />
                    </label>
                    <span className="fw-normal text-primary check-title ps-2">Hide branding</span>
                  </div>
                </div>
              </div>
              <div className="setting-buttons d-flex align-items-end mt-5 mb-5">
                <button
                  id="saveWidgetAppearance"
                  type="button"
                  className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                  disabled={loading?.state}
                  onClick={() => {
                    handleSetAppearance();
                  }}
                >
                  {loading?.state && loading?.type === 'set-appearance' ? 'Saving...' : 'Save'}
                </button>
                <ButtonWhite
                  text="Cancel"
                  onClick={() => {
                    navigate('/chat-widget/new-widget/');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- theme save modal --> */}

      {showModal?.isVisible ? (
        <>
          <div className="modal show" tabIndex="-1" id="newtheme" style={{ display: 'block' }}>
            <div className="modal-dialog mt-74px">
              <div className="modal-content border-0">
                <div className="modal-content p-4">
                  {/* <!-- Modal Header --> */}
                  <div className="modal-header border-0">
                    <h4 className="modal-title text-dark fw-medium fs-15px">Save Color Scheme</h4>

                    <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowModal({ type: '', isVisible: false });
                      }}
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                    />
                  </div>

                  <div className="modal-body">
                    <InputModal
                      label="Scheme name"
                      id="Grad-blue"
                      placeholder="New Scheme"
                      type="textbox"
                      disabled=""
                      value={selectedColocSchemaDetails?.name}
                      onChange={(e) => {
                        setSelectedColocSchemaDetails({
                          ...selectedColocSchemaDetails,
                          name: e?.target?.value,
                        });
                      }}
                    />
                  </div>
                  <div className="modal-footer border-top-0 justify-content-center">
                    <ButtonToast
                      text={
                        loading?.state && loading?.type === 'save-as-new' ? 'Saving...' : 'Save'
                      }
                      btnID="Newtheme"
                      onClick={() => {
                        handleCreateChatWidgetTheme();
                      }}
                      disabled={loading?.state || !selectedColocSchemaDetails?.name}
                    />
                    <ButtonWhiteModalCancel
                      text="cancel"
                      onCancel={() => {
                        setShowModal({ type: '', isVisible: false });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" />
        </>
      ) : null}

      {/* <!-- end --> */}
    </>
  );
}

export default ChatWidgetAppearance;
