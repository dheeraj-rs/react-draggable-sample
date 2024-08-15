import React from 'react';

function BackgroundTexture({ selectedColocSchemaDetails, setSelectedColocSchemaDetails }) {
  return (
    <div className="shadow-6 mt-3 p-4 rounded opacity opacity-50">
      <div className="row gx-5">
        <div className="col-sm-10">
          <div className="widget-bg-pattern ">
            <div className="d-flex">
              <h6 className="fs-13px text-primary">Background texture</h6>
            </div>
            <div className="widget-pattern-box d-flex align-items-center gap-3 mt-3">
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedColocSchemaDetails({
                    ...selectedColocSchemaDetails,
                    backgroundTexture: 'none',
                  });
                }}
                className=" banner-circle d-flex align-items-center justify-content-center h-7 w-7 rounded-circle border border-blue-active text-blue-lotus-new"
              >
                None
              </a>
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="banner-circle border  rounded-circle"
              >
                <img
                  className="  d-flex align-items-center justify-content-center h-7 w-7 rounded-circle "
                  src="/assets/bubble.svg"
                  alt=""
                />
              </a>
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="banner-circle border  rounded-circle"
              >
                <img
                  className=" d-flex align-items-center justify-content-center h-7 w-7 rounded-circle "
                  src="/assets/bubble.svg"
                  alt=""
                />
              </a>
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="banner-circle border  rounded-circle"
              >
                <img
                  className=" d-flex align-items-center justify-content-center h-7 w-7 rounded-circle "
                  src="/assets/bubble.svg"
                  alt=""
                />
              </a>
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="banner-circle border rounded-circle"
              >
                <img
                  className=" d-flex align-items-center justify-content-center h-7 w-7 rounded-circle "
                  src="/assets/bubble.svg"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackgroundTexture;
