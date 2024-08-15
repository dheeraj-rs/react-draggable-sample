import React from 'react';
import Input from '../../../common/components/forms/Input';

function WidgetPositioning({
  selectedColocSchemaDetails,
  setSelectedColocSchemaDetails,
  colorSchemeType,
}) {
  return (
    <div
      className={`shadow-6 mt-3 p-4 rounded opacity ${colorSchemeType === 1 ? 'opacity-50' : ''}`}
    >
      <div className="row gx-5">
        <div className="col-sm-12">
          <h6 className="mb-4">Widget positioning on the screen</h6>
          <div className="row">
            <div
              className="col-lg-2 col-sm-3 col-6"
              onClick={() => {
                setSelectedColocSchemaDetails({
                  ...selectedColocSchemaDetails,
                  position: 'bottom-left',
                });
              }}
            >
              <div
                className={`widget-angle-1 ${
                  selectedColocSchemaDetails?.position === 'bottom-left'
                    ? 'border-border-active'
                    : ''
                } border rounded p-3 p-lg-4`}
              >
                <h6 className="mb-4">Bottom left</h6>
                <div className="row align-items-center">
                  <div className="col-xl-4 col-md-5 col-5">
                    <div className="bg-periwinkle-grey bottom-left d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold" />
                  </div>
                  <div className="col-xl-8 col-md-7 col-7">
                    <img
                      src="/assets/bottom-left.svg"
                      alt=""
                      className="img-fluid filter-left-img filter-inactive"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-lg-2 col-sm-3 col-6"
              onClick={() => {
                setSelectedColocSchemaDetails({
                  ...selectedColocSchemaDetails,
                  position: 'bottom-right',
                });
              }}
            >
              <div
                className={`widget-angle-2  border ${
                  selectedColocSchemaDetails?.position === 'bottom-right'
                    ? 'border-border-active'
                    : ''
                } rounded p-3 p-lg-4  mt-lg-0 mt-md-0 mt-sm-0`}
              >
                <h6 className="mb-4">Bottom right</h6>
                <div className="row align-items-center">
                  <div className="col-xl-8 col-md-7 col-7">
                    <img
                      src="/assets/bottom-right.svg"
                      alt=""
                      className="img-fluid filter-right-img filter-active"
                    />
                  </div>
                  <div className="col-xl-4 col-md-5 col-5 ps-0">
                    <div className="bg-blue-active bottom-right d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold" />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`col-lg-5 col-sm-7 mt-4 mt-lg-0 mt-sm-4 mb-4 mb-xl-0 mb-sm-4 adjust-widget ${
                selectedColocSchemaDetails?.position === 'bottom-right' ? '' : 'd-none'
              }`}
              id="offsetRightFiled"
            >
              <div>
                <h6 className="mb-2 mb-md-0 mt-1 mb-xl-2">
                  Adjust widget on the screen more accurately
                </h6>
                <div className="d-flex align-items-center gap-4 offset-form">
                  <div>
                    <Input
                      label="Offset right (px)"
                      id="OffsetRight"
                      placeholder=""
                      type="number"
                      value={selectedColocSchemaDetails?.horizontalOffset || ''}
                      disabled=""
                      onChange={(e) => {
                        setSelectedColocSchemaDetails({
                          ...selectedColocSchemaDetails,
                          horizontalOffset: parseInt(e.target.value, 10),
                        });
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      label="Offset bottom (px)"
                      id="OffsetBottom"
                      placeholder=""
                      type="number"
                      value={selectedColocSchemaDetails?.bottomOffset || ''}
                      disabled=""
                      onChange={(e) => {
                        setSelectedColocSchemaDetails({
                          ...selectedColocSchemaDetails,
                          bottomOffset: parseInt(e.target.value, 10),
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`col-lg-5 col-sm-7 mt-4 mt-lg-0 mt-sm-4 mb-4 mb-xl-0 mb-sm-4 adjust-widget ${
                selectedColocSchemaDetails?.position === 'bottom-left' ? '' : 'd-none'
              }`}
              id="offsetLeftFiled"
            >
              <div>
                <h6 className="mb-2 mb-md-0 mt-1 mb-xl-2">
                  Adjust widget on the screen more accurately
                </h6>
                <div className="d-flex align-items-center gap-4 offset-form">
                  <div>
                    <Input
                      label="Offset left (px)"
                      id="offsetLeftText"
                      placeholder="30"
                      type="number"
                      value={selectedColocSchemaDetails?.horizontalOffset || ''}
                      disabled=""
                      onChange={(e) => {
                        setSelectedColocSchemaDetails({
                          ...selectedColocSchemaDetails,
                          horizontalOffset: parseInt(e.target.value, 10),
                        });
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      label="Offset bottom (px)"
                      id="offsetBottomText"
                      placeholder="30"
                      type="number"
                      value={selectedColocSchemaDetails?.bottomOffset || ''}
                      disabled=""
                      onChange={(e) => {
                        setSelectedColocSchemaDetails({
                          ...selectedColocSchemaDetails,
                          bottomOffset: parseInt(e.target.value, 10),
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-sm-3 mt-sm-3 mt-lg-0 mt-0 col-6">
              <div className="bg-thin-gray rounded p-3 position-relative bottom-height d-flex align-items-center">
                <div
                  id="rightOffset"
                  className={`bottom-align ${
                    selectedColocSchemaDetails?.position === 'bottom-right' ? '' : 'd-none'
                  }`}
                >
                  <div className="d-flex align-items-center gap-1 mr-1">
                    <div className="">
                      <div className="bg-periwinkle-grey d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold" />
                    </div>
                    <div className="">
                      <p className="mb-0 offset-right">
                        {selectedColocSchemaDetails?.horizontalOffset}
                        px
                      </p>
                      <img src="/assets/mid-top.svg" alt="" />
                    </div>
                  </div>
                  <div className="d-flex align-items-center ms-4 gap-1 mb-1">
                    <div>
                      <img src="/assets/bottom.svg" alt="" />
                    </div>
                    <div>
                      <p className="mb-0 offset-bottom">
                        {selectedColocSchemaDetails?.bottomOffset}
                        px
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  id="leftOffset"
                  className={`bottom-align-left ${
                    selectedColocSchemaDetails?.position === 'bottom-left' ? '' : 'd-none'
                  }`}
                >
                  <div className="d-flex align-items-center gap-1 mr-1">
                    <div>
                      <p className="mb-0 offset-right">
                        {selectedColocSchemaDetails?.horizontalOffset}
                        px
                      </p>
                      <img src="/assets/offset-left.svg" alt="" />
                    </div>
                    <div className="">
                      <div className="bg-periwinkle-grey d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold" />
                    </div>
                  </div>
                  <div className="d-flex align-items-center ms-5 gap-1 mb-1">
                    <div>
                      <img src="/assets/bottom.svg" alt="" />
                    </div>
                    <div>
                      <p className="mb-0 offset-bottom">
                        {selectedColocSchemaDetails?.bottomOffset}
                        px
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetPositioning;
