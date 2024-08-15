import React, { useRef, useState, useEffect } from 'react';

function LauncherButtonSection({ setSelectedColocSchemaDetails, selectedColocSchemaDetails }) {
  const launcherButtonBgRef = useRef(null);
  const launcherButtonTextRef = useRef(null);

  const [bannerColorType, setBannerColorType] = useState('solid-color-banner');
  const [applySameColorScheme, setApplySameColorScheme] = useState(false);

  useEffect(() => {
    if (applySameColorScheme) {
      setSelectedColocSchemaDetails({
        ...selectedColocSchemaDetails,
        launcherBtnBgColorOne: selectedColocSchemaDetails?.bannerBgColorOne,
        launcherBtnTextColor: selectedColocSchemaDetails?.bannerTextColor,
      });
    }
  }, [applySameColorScheme]);
  return (
    <div className="widget-state mt-5">
      <div className="d-flex align-items-center gap-4 flex-wrap">
        <h6 className="font-13 text-primary mb-0">Launcher button color</h6>
        <div className="check-box border-blue-active">
          <input
            type="checkbox"
            id="same-color"
            onClick={() => {
              setApplySameColorScheme(!applySameColorScheme);
              // setSelectedColocSchemaDetails({
              //   ...selectedColocSchemaDetails,
              //   launcherBtnBgColorOne: selectedColocSchemaDetails?.bannerBgColorOne,
              //   launcherBtnTextColor: selectedColocSchemaDetails?.bannerTextColor,
              // });
            }}
            checked={applySameColorScheme}
            onChange={() => {}}
          />
          <label className="text-primary mb-0" htmlFor="same-color">
            Apply same color scheme of Banner
          </label>
        </div>
      </div>

      <div className="launcher-color-section d-flex align-items-center gap-5 flex-wrap mt-5">
        <div>
          <div className="d-flex gap-3">
            <div className="mb-4">
              <input
                id="widgetSolid"
                className="gs-radio launch-color"
                name="launcher-color"
                value="solid"
                type="radio"
                checked={bannerColorType === 'solid-color-banner'}
                onChange={() => {}}
                onClick={() => {
                  setBannerColorType('solid-color-banner');
                  setSelectedColocSchemaDetails({
                    ...selectedColocSchemaDetails,
                    launcherBtnBgColorOne: '#5D5AEC',
                  });
                }}
              />
              <label htmlFor="widgetSolid" className="radio-tick-label text-primary">
                Solid colors
              </label>
            </div>
            <div className="mb-4">
              <input
                id="widgetGradient"
                className="gs-radio launch-color"
                name="launcher-color"
                type="radio"
                value="gradient"
                checked={bannerColorType === 'gradient-color-banner'}
                onChange={() => {}}
                onClick={() => {
                  setBannerColorType('gradient-color-banner');
                  setSelectedColocSchemaDetails({
                    ...selectedColocSchemaDetails,
                    launcherBtnTextColor: {
                      color1: '#AF7DDB',
                      color2: '#AF7BDB',
                    },
                  });
                }}
              />
              <label htmlFor="widgetGradient" className="radio-tick-label text-primary">
                Gradient colors
              </label>
            </div>
          </div>
          <div
            className={`d-flex align-items-center gap-2 gap-lg-3 bg-white  ${
              bannerColorType === 'solid-color-banner' ? '' : 'd-none'
            } launcher-solid`}
          >
            <div
              className="border rounded d-flex align-items-center p-2 justify-content-center"
              onClick={() => {
                if (launcherButtonBgRef.current) {
                  launcherButtonBgRef.current.click();
                }
              }}
            >
              <div className="d-flex align-items-center gap-2 text-primary">
                <input
                  ref={launcherButtonBgRef}
                  type="color"
                  className="rounded-1 single-color"
                  name="color"
                  value={
                    applySameColorScheme
                      ? selectedColocSchemaDetails?.bannerBgColorOne
                      : selectedColocSchemaDetails?.launcherBtnBgColorOne
                  }
                  onChange={(e) => {
                    setSelectedColocSchemaDetails({
                      ...selectedColocSchemaDetails,
                      launcherBtnBgColorOne: e.target.value,
                    });
                  }}
                />
                <input
                  maxLength="7"
                  className="color-picker-value border-0 ps-1"
                  type="text"
                  value={selectedColocSchemaDetails?.launcherBtnBgColorOne}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div
            className={`d-flex align-items-center gap-3 bg-white mt-2  ${
              bannerColorType === 'gradient-color-banner' ? '' : 'd-none'
            } launcher-gradient`}
          >
            <div className="border rounded d-flex align-items-center p-2 justify-content-center">
              <div className="d-flex align-items-center gap-2 text-primary">
                <input
                  type="color"
                  className="color1"
                  value={selectedColocSchemaDetails?.launcherBtnBgColorOne?.color1}
                  onChange={(e) => {
                    setSelectedColocSchemaDetails({
                      ...selectedColocSchemaDetails,
                      launcherBtnBgColorOne: {
                        ...selectedColocSchemaDetails?.launcherBtnBgColorOne,
                        color1: e.target.value,
                      },
                    });
                  }}
                />
                <input
                  className="color2"
                  type="color"
                  value={selectedColocSchemaDetails?.launcherBtnBgColorOne?.color2}
                  onChange={(e) => {
                    setSelectedColocSchemaDetails({
                      ...selectedColocSchemaDetails,
                      launcherBtnBgColorOne: {
                        ...selectedColocSchemaDetails?.launcherBtnBgColorOne,
                        color2: e.target.value,
                      },
                    });
                  }}
                />
                <input
                  maxLength="7"
                  className="color-picker-value border-0 ps-1"
                  type="text"
                  value={selectedColocSchemaDetails?.launcherBtnBgColorOne?.color1}
                  readOnly
                />
                ,
                <input
                  maxLength="7"
                  className="color-picker-value border-0 ps-1"
                  type="text"
                  value={selectedColocSchemaDetails?.launcherBtnBgColorOne?.color2}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <label className="text-primary fs-normal mt-2 mt-lg-0">Launcher Button text color</label>
          <div className="d-flex gap-3 mt-4">
            <div
              className="border rounded-1 d-flex align-items-center p-2 justify-content-center"
              onClick={() => {
                if (launcherButtonTextRef.current) {
                  launcherButtonTextRef.current.click();
                }
              }}
            >
              <div className="d-flex align-items-center gap-2 text-primary">
                <input
                  ref={launcherButtonTextRef}
                  type="color"
                  className="rounded-1 "
                  name="color"
                  value={
                    applySameColorScheme
                      ? selectedColocSchemaDetails?.bannerTextColor
                      : selectedColocSchemaDetails?.launcherBtnTextColor
                  }
                  onChange={(e) => {
                    setSelectedColocSchemaDetails({
                      ...selectedColocSchemaDetails,
                      launcherBtnTextColor: e.target.value,
                    });
                  }}
                />
                <input
                  maxLength="7"
                  className="color-picker-value border-0 ps-1"
                  type="text"
                  value={selectedColocSchemaDetails?.launcherBtnTextColor}
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

export default LauncherButtonSection;
