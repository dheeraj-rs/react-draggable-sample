import React from 'react';
import CheckboxSlider from '../../../../common/components/forms/CheckboxSlider';

function NotificationPreferenceList({ title, content, checked, onClick }) {
  return (
    <div className="d-flex justify-content-between align-items-center shadow-6 rounded p-4 mt-3 gap-2">
      <div>
        <h6 className="text-primary fs-14px mb-1">{title}</h6>
        <p className="mb-0 text-secondary">{content}</p>
      </div>

      <div
        role="button"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-trigger="hover"
        data-bs-original-title="Enable/Disable"
      >
        <CheckboxSlider checked={checked} onClick={onClick} />
      </div>
    </div>
  );
}

export default NotificationPreferenceList;
