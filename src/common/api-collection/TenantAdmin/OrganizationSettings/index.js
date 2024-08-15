import { handleGetMethod, handlePatchMethod } from '../../../api-config/methods';

export function GetOrganizationSettings() {
  return handleGetMethod('/admin/organization/settings', {});
}

export function UpdateOrganizationSettings(
  details,
  id,
  userProfileEditableFields,
  userProfileEditPolicy
) {
  const data = {
    type: 'organization_settings',
    id: parseInt(id, 10),
    attributes: {
      number_of_parallel_sessions: details?.numberOfParallelSessions,
      session_timeout_hours: details?.sessionsTimeout?.value,
      idle_session_timeout_minutes: details?.idleSessionsTimeout?.value,
      user_profile_edit_policy: userProfileEditPolicy,
      ...(userProfileEditableFields?.length > 0 && {
        user_profile_editable_fields: userProfileEditableFields,
      }),
    },
  };

  return handlePatchMethod('/admin/organization/settings', { data });
}
