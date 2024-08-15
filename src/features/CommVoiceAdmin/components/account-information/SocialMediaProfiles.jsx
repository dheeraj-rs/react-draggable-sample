import React from 'react';

function SocialMediaProfiles() {
  return (
    <div className="bg-input-gray rounded p-4 mt-3">
      <h6 className="mb-3 fs-14px text-primary fw-500 mt-2">Social Media Profiles</h6>
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="d-flex gap-2 align-items-center mt-3 mt-sm-2 mt-xl-2">
            <img src="/assets/facebook-bg.svg" alt="" />
            <p className="text-primary mb-0 text-break line-clamp-1">
              http://www.facebook.com/avira..
            </p>
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="d-flex gap-2 align-items-center mt-3 mt-sm-2 mt-xl-2">
            <img src="/assets/linkedin-bg.svg" alt="" />
            <p className="text-primary mb-0 text-break line-clamp-1">
              http://www.linkedin.com/avira..
            </p>
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="d-flex gap-2 align-items-center mt-3 mt-sm-4 mt-xl-2">
            <img src="/assets/xface.svg" alt="" />
            <p className="text-primary mb-0 text-break line-clamp-1">
              http://www.facebook.com/avira..
            </p>
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="d-flex gap-2 align-items-center mt-3 mt-sm-4 mt-xl-4 mb-xl-3">
            <img src="/assets/instagram-pink.svg" alt="" />
            <p className="text-primary mb-0 text-break line-clamp-1">
              http://www.facebook.com/avira..
            </p>
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="d-flex gap-2 align-items-center mt-3 mt-sm-4 mt-xl-4 mb-xl-3">
            <img src="/assets/youtube-bg.svg" alt="" />
            <p className="text-primary mb-0 text-break line-clamp-1">
              http://www.youtube.com/avira..
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialMediaProfiles;
