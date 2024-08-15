import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function GetActiveLoginPolicy() {
  return handleGetMethod('/admin/login-policies/queries/active-policy', {});
}

export function GetLoginPolicy(policyId) {
  return handleGetMethod(`/admin/login-policies/${policyId}`, {});
}

export function CreateLoginPolicy(values) {
  const data = {
    type: 'login_policies',
    attributes: {
      name: values?.policyName,
      is_enabled: values?.isEnabled,
      is_applied_immediately: values?.isAppliedImmediately,
      normal_login_enabled: values?.normalLoginEnabled,
      google_login_enabled: values?.googleLoginEnabled,
      passwordless_login_enabled: values?.passwordlessLoginEnabled,
      two_factor_authentication_enabled: values?.twoFactorAuthenticationEnabled,
      ...(values?.media && { media: values?.media }),
    },
  };
  return handlePostMethod('/admin/login-policies', { data });
}

export function ListLoginPolicies({ page = 1, searchTerm = '' }) {
  return handleGetMethod('/admin/login-policies', {
    params: {
      page,
      search: searchTerm,
    },
  });
}

export function UpdateLoginPolicy(policyId, values) {
  const data = {
    type: 'login_policies',
    id: parseInt(policyId, 10),
    attributes: {
      name: values?.policyName,
      is_enabled: values?.isEnabled,
      is_applied_immediately: values?.isAppliedImmediately,
      normal_login_enabled: values?.normalLoginEnabled,
      google_login_enabled: values?.googleLoginEnabled,
      passwordless_login_enabled: values?.passwordlessLoginEnabled,
      two_factor_authentication_enabled: values?.twoFactorAuthenticationEnabled,
      ...(values?.media && { media: values?.media }),
    },
  };
  return handlePatchMethod(`/admin/login-policies/${policyId}`, { data });
}

export function DeleteLoginPolicy(policyId) {
  return handleDeleteMethod(`/admin/login-policies/${policyId}`);
}

export function LinkAccountsToLoginPolicy(loginPolicyId, accountIds) {
  const data = {
    type: 'login_policies',
    id: loginPolicyId,
    attributes: {
      account_ids: accountIds,
    },
  };
  return handlePostMethod('/admin/login-policies/actions/link-account', { data });
}

export function UnlinkAccountFromLoginPolicy(loginPolicyId, accountIds) {
  const data = {
    type: 'login_policies',
    id: loginPolicyId,
    attributes: {
      account_ids: accountIds,
    },
  };
  return handlePostMethod('/admin/login-policies/actions/unlink-account', { data });
}
