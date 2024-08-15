/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
import React from 'react';
import '../../helpers/main';
import $ from 'jquery';
import { generateUniqueId } from '../../helpers/utils';
import MomentaryFileUpload from '../../api-collection/Common/MomentaryFileUpload';

function FloatingButton({ setAttachedImageDetails, setTempMessageStore, setToastAction }) {
  // Toggle chat and links
  function toggleFab() {
    // $('.prime').toggleClass('is-active');
    $('#prime').toggleClass('is-float');
    $('.fab').toggleClass('is-visible');
    $('.fab-close').toggleClass('is-active');
    $('#prime').toggleClass('float-rotation-effect');
  }

  const handleImageSelection = async (event) => {
    // remove the text when an image  is uploaded
    setTempMessageStore({
      agentId: '',
      message: '',
      username: '',
      time: '',
    });
    // const file = event.target.files[0];
    if (!event.target.files[0]) {
      alert('Please select an image.');
    } else if (!event.target.files[0].type.startsWith('image/')) {
      alert('Invalid file type. Please select an image file.');
    } else {
      const filesArray = Array.from(event.target.files);

      // files?.length < 0 &&
      await filesArray?.map((file) => {
        const formData = new FormData();

        formData.append('upload_file', file);
        MomentaryFileUpload(formData)
          .then((response) => {
            const newImage = {
              id: generateUniqueId(),
              name: file.name,
              file,
              url: response?.data?.data?.attributes?.storage_name,
              localUrl: URL.createObjectURL(file), // Create a local URL
              type: 2,
            };
            //

            setAttachedImageDetails((prevDetails) => ({
              ...prevDetails,
              images: [...prevDetails.images, newImage], // Push the new image to the array
            }));

            // setAttachedImageDetails({
            //   ...attachedImageDetails,
            //   images: [
            //     ...attachedImageDetails.images,
            //     {
            //       id: generateUniqueId(),
            //       name: file.name,
            //       file,
            //       url: response?.data?.data?.attributes?.storage_name,
            //     },
            //   ],
            // });
          })
          ?.catch((error) => {
            if (error.response.status === 413) {
              setToastAction({
                isVisible: true,
                type: 'failed',
                message: 'Something went wrong. Please check the file size and try again  .',
              });
            } else {
              setToastAction({
                isVisible: true,
                type: 'failed',
                message: 'Something went wrong.',
              });
            }
          });
      });
    }

    event.target.value = '';
  };

  return (
    <div className="position-relative float-btns">
      <div className="fabs" id="fabs">
        <a
          data-bs-toggle="collapse"
          data-bs-target="#stored-response-calendar"
          className="fab fab-close"
          href="/#"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <span
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="Calender"
            aria-label="Calender "
          >
            <svg
              className="mini-fab-icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.07593 7.65057C4.44569 7.65057 4.74545 7.35081 4.74545 6.98105C4.74545 6.61128 4.44569 6.31152 4.07593 6.31152C3.70616 6.31152 3.4064 6.61128 3.4064 6.98105C3.4064 7.35081 3.70616 7.65057 4.07593 7.65057Z"
                fill="white"
              />
              <path
                d="M7.98529 7.65057C8.35506 7.65057 8.65481 7.35081 8.65481 6.98105C8.65481 6.61128 8.35506 6.31152 7.98529 6.31152C7.61552 6.31152 7.31577 6.61128 7.31577 6.98105C7.31577 7.35081 7.61552 7.65057 7.98529 7.65057Z"
                fill="white"
              />
              <path
                d="M11.8914 7.65057C12.2612 7.65057 12.5609 7.35081 12.5609 6.98105C12.5609 6.61128 12.2612 6.31152 11.8914 6.31152C11.5216 6.31152 11.2219 6.61128 11.2219 6.98105C11.2219 7.35081 11.5216 7.65057 11.8914 7.65057Z"
                fill="white"
              />
              <path
                d="M4.07593 12.1706C4.44569 12.1706 4.74545 11.8708 4.74545 11.5011C4.74545 11.1313 4.44569 10.8315 4.07593 10.8315C3.70616 10.8315 3.4064 11.1313 3.4064 11.5011C3.4064 11.8708 3.70616 12.1706 4.07593 12.1706Z"
                fill="white"
              />
              <path
                d="M7.98529 12.1706C8.35506 12.1706 8.65481 11.8708 8.65481 11.5011C8.65481 11.1313 8.35506 10.8315 7.98529 10.8315C7.61552 10.8315 7.31577 11.1313 7.31577 11.5011C7.31577 11.8708 7.61552 12.1706 7.98529 12.1706Z"
                fill="white"
              />
              <path
                d="M11.8914 12.1706C12.2612 12.1706 12.5609 11.8708 12.5609 11.5011C12.5609 11.1313 12.2612 10.8315 11.8914 10.8315C11.5216 10.8315 11.2219 11.1313 11.2219 11.5011C11.2219 11.8708 11.5216 12.1706 11.8914 12.1706Z"
                fill="white"
              />
              <path
                d="M15.3239 1.79792H13.7269V1.08594C13.7269 0.713617 13.4199 0.406616 13.0475 0.406616C12.6752 0.406616 12.3682 0.713617 12.3682 1.08594V1.79792H3.60236V1.08594C3.60236 0.713617 3.29536 0.406616 2.92304 0.406616C2.55072 0.406616 2.24372 0.713617 2.24372 1.08594V1.79792H0.679321C0.307001 1.79792 0 2.10492 0 2.47724V14.914C0 15.2864 0.307001 15.5934 0.679321 15.5934H15.288C15.6603 15.5934 15.9673 15.3223 16 14.914V2.47724C16.0032 2.10492 15.6962 1.79792 15.3239 1.79792ZM14.6446 14.2674H1.32598V3.15983H2.24372V3.66932C2.24372 4.04164 2.55072 4.34864 2.92304 4.34864C3.29536 4.34864 3.60236 4.04164 3.60236 3.66932V3.15983H12.3682V3.66932C12.3682 4.04164 12.6752 4.34864 13.0475 4.34864C13.3872 4.34864 13.6942 4.04164 13.7269 3.66932V3.15983H14.6446V14.2674V14.2674Z"
                fill="white"
              />
            </svg>
          </span>
        </a>

        <a
          data-bs-toggle="collapse"
          data-bs-target="#stored-response-float"
          className="fab fab-close"
          href="/#"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <span
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="Stored Responses"
            aria-label="Stored Responses"
          >
            <svg
              className="mini-fab-icon"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8903 0.543701H5.17624C4.56335 0.543701 4.06653 1.04052 4.06653 1.65341V4.64937H5.17624V1.65341H15.8903V8.43719H14.0964V9.5469H15.8903C16.5031 9.5469 17 9.05008 17 8.43719V1.65341C17 1.04056 16.5032 0.543701 15.8903 0.543701Z"
                fill="white"
              />
              <path
                d="M11.8238 5.75903H1.10971C0.496966 5.75903 0 6.2557 0 6.86874V13.6525C0 14.2654 0.496818 14.7622 1.10971 14.7622H4.52514L5.61751 16.061C6.06102 16.5883 6.87315 16.5875 7.31599 16.061L8.40836 14.7622H11.8238C12.1685 14.7622 12.4766 14.605 12.6801 14.3584C12.6914 14.3447 12.7024 14.3307 12.713 14.3165C12.8515 14.1314 12.9335 13.9015 12.9335 13.6525V6.86874C12.9335 6.25592 12.4367 5.75903 11.8238 5.75903ZM11.8238 13.6525H7.89167L6.46673 15.3466L5.04179 13.6525H1.10971V6.86874H11.8238V13.6525Z"
                fill="white"
              />
              <path
                d="M2.95964 9.53574H9.97379C10.2802 9.53574 10.5286 9.28731 10.5286 8.98088C10.5286 8.67445 10.2802 8.42603 9.97379 8.42603H2.95964C2.65321 8.42603 2.40479 8.67445 2.40479 8.98088C2.40479 9.28731 2.65321 9.53574 2.95964 9.53574Z"
                fill="white"
              />
              <path
                d="M2.95964 12.0431H5.83087C6.1373 12.0431 6.38573 11.7946 6.38573 11.4882C6.38573 11.1818 6.1373 10.9333 5.83087 10.9333H2.95964C2.65321 10.9333 2.40479 11.1818 2.40479 11.4882C2.40479 11.7946 2.65321 12.0431 2.95964 12.0431Z"
                fill="white"
              />
            </svg>
          </span>
        </a>

        <button type="button" id="file-system" className="fab fab-close border-0">
          <div className="file-input ">
            <input
              // ref={fileInputRef}
              type="file"
              // name="file-input"
              id="choose-file"
              className="file-input-system"
              accept="image/*"
              // multiple="multiple"
              multiple
              onChange={handleImageSelection}
            />
            <label className="file-input-system-label text-primary" htmlFor="choose-file">
              <span
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-original-title="Image attach"
                aria-label="Gallery"
              >
                <svg
                  className="mini-fab-icon"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6248 0.239624H2.37522C1.19797 0.239624 0.239594 1.19729 0.239594 2.37525V12.6255C0.239594 13.8028 1.19726 14.7612 2.37522 14.7612H12.6255C13.8028 14.7612 14.7611 13.8035 14.7611 12.6255V2.37525C14.7604 1.19729 13.8028 0.239624 12.6248 0.239624ZM13.9062 12.6248C13.9062 13.331 13.3317 13.9062 12.6248 13.9062H2.37522C1.66901 13.9062 1.09384 13.3317 1.09384 12.6248V11.08L4.54059 7.25L9.19647 11.4823L11.7713 9.33675L13.9069 11.1161V12.6248H13.9062ZM13.9062 10.0047L11.7706 8.22537L9.21984 10.3504L4.48039 6.04087L1.09384 9.80354V2.37525C1.09384 1.66904 1.6683 1.09387 2.37522 1.09387H12.6255C13.3317 1.09387 13.9069 1.66833 13.9069 2.37525V10.0047H13.9062Z"
                    fill="white"
                  />
                </svg>
              </span>
            </label>
          </div>
        </button>

        <a
          data-bs-toggle="collapse"
          data-bs-target="#stored-response-attachment"
          className="fab"
          href="/#"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <span
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="File attach"
            aria-label="attachment"
          >
            <svg
              className="mini-fab-icon"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3747 5.26692L6.2925 10.3491C5.68218 10.9594 4.69312 10.9594 4.08281 10.3491C3.4725 9.73879 3.4725 8.74973 4.08281 8.13942L9.165 3.05723C10.3853 1.83692 12.3641 1.83692 13.5844 3.05723C14.8047 4.27754 14.8047 6.25629 13.5844 7.47661L8.50218 12.5588C6.67156 14.3894 3.70375 14.3894 1.87312 12.5588C0.0424964 10.7282 0.0424964 7.76036 1.87312 5.92973L6.73437 1.06848"
                stroke="white"
                strokeLinejoin="10"
              />
            </svg>
          </span>
        </a>

        <a
          id="prime"
          className="fab d-flex align-items-center justify-content-center"
          onClick={(e) => {
            e.preventDefault();
            toggleFab();
          }}
          href="/#"
        >
          <i>
            <img id="img" src="/assets/plus.svg" alt="" />
          </i>
        </a>
      </div>
    </div>
  );
}

export default FloatingButton;
