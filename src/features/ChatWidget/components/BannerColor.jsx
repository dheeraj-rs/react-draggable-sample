import React, { useRef, useState } from 'react';

function BannerColor({ selectedColocSchemaDetails, setSelectedColocSchemaDetails }) {
  const bannerBgBgRef = useRef(null);
  const bannerTextRef = useRef(null);

  const [bannerColorType, setBannerColorType] = useState('solid-color-banner');

  return (
    <div className="d-flex flex-wrap gap-5">
      <div>
        <div className="d-flex gap-3">
          <div className="">
            <input
              id="solidColorBanner"
              className="gs-radio"
              name="banner-color"
              type="radio"
              value="solid"
              checked={bannerColorType === 'solid-color-banner'}
              onChange={() => {}}
              onClick={() => {
                setBannerColorType('solid-color-banner');
                setSelectedColocSchemaDetails({
                  ...selectedColocSchemaDetails,
                  bannerBgColorOne: '#5D5AEC',
                });
              }}
            />
            <label htmlFor="solidColorBanner" className="radio-tick-label text-primary">
              Solid colors
            </label>
          </div>

          <div className="">
            <input
              id="gradientColorBanner"
              className="gs-radio"
              name="banner-color"
              type="radio"
              value="gradient"
              checked={bannerColorType === 'gradient-color-banner'}
              onChange={() => {}}
              onClick={() => {
                setBannerColorType('gradient-color-banner');
                setSelectedColocSchemaDetails({
                  ...selectedColocSchemaDetails,
                  bannerBgColorOne: {
                    color1: '#AF7DDB',
                    color2: '#AF7BDB',
                  },
                });
              }}
            />
            <label htmlFor="gradientColorBanner" className="radio-tick-label text-primary">
              Gradient colors
            </label>
          </div>
        </div>
        <div
          className={`d-flex align-items-center gap-3 bg-white mt-4 ${
            bannerColorType === 'solid-color-banner' ? '' : 'd-none'
          } solid-color`}
        >
          <div
            className="border rounded-1 d-flex align-items-center p-2 justify-content-center"
            onClick={() => {
              if (bannerBgBgRef.current) {
                bannerBgBgRef.current.click();
              }
            }}
          >
            <div className="d-flex align-items-center gap-2 text-primary">
              <input
                ref={bannerBgBgRef}
                type="color"
                className="rounded-1 single-color"
                name="color"
                value={selectedColocSchemaDetails?.bannerBgColorOne}
                onChange={(e) => {
                  setSelectedColocSchemaDetails({
                    ...selectedColocSchemaDetails,
                    bannerBgColorOne: e.target.value,
                  });
                }}
              />
              <input
                maxLength="7"
                className="color-picker-value border-0 ps-1"
                type="text"
                value={selectedColocSchemaDetails?.bannerBgColorOne}
                readOnly
              />
            </div>
          </div>
        </div>
        <div
          className={`d-flex align-items-center gap-3 bg-white mt-4 ${
            bannerColorType === 'gradient-color-banner' ? '' : 'd-none'
          } gradient-color`}
        >
          <div className="border rounded d-flex align-items-center p-2 justify-content-center">
            <div className="d-flex align-items-center gap-2 text-primary">
              <input
                className="color1"
                type="color"
                value={selectedColocSchemaDetails?.bannerBgColorOne?.color1}
                onChange={(e) => {
                  setSelectedColocSchemaDetails({
                    ...selectedColocSchemaDetails,
                    bannerBgColorOne: {
                      ...selectedColocSchemaDetails?.bannerBgColorOne,
                      color1: e.target.value,
                    },
                  });
                }}
              />
              <input
                className="color2"
                type="color"
                value={selectedColocSchemaDetails?.bannerBgColorOne?.color2}
                onChange={(e) => {
                  setSelectedColocSchemaDetails({
                    ...selectedColocSchemaDetails,
                    bannerBgColorOne: {
                      ...selectedColocSchemaDetails?.bannerBgColorOne,
                      color2: e.target.value,
                    },
                  });
                }}
              />
              <input
                maxLength="7"
                className="color-picker-value border-0 ps-1"
                type="text"
                value={selectedColocSchemaDetails?.bannerBgColorOne?.color1}
                readOnly
              />
              ,
              <input
                maxLength="7"
                className="color-picker-value border-0 ps-1"
                type="text"
                value={selectedColocSchemaDetails?.bannerBgColorOne?.color2}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex gap-lg-5 gap-2 ms-width">
        <div>
          <label className="text-primary fs-normal">Banner text color</label>
          <div className="d-flex gap-3 mt-4">
            <div
              className="border rounded-1 d-flex align-items-center p-2 justify-content-center"
              onClick={() => {
                if (bannerTextRef.current) {
                  bannerTextRef.current.click();
                }
              }}
            >
              <div className="d-flex align-items-center gap-2 text-primary">
                <input
                  ref={bannerTextRef}
                  type="color"
                  className="rounded-1 "
                  name="color"
                  value={selectedColocSchemaDetails?.bannerTextColor}
                  onChange={(e) => {
                    setSelectedColocSchemaDetails({
                      ...selectedColocSchemaDetails,
                      bannerTextColor: e.target.value,
                    });
                  }}
                />
                <input
                  maxLength="7"
                  className="color-picker-value border-0 ps-1"
                  type="text"
                  value={selectedColocSchemaDetails?.bannerTextColor}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerColor;
