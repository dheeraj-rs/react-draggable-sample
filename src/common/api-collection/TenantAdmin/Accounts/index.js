import { handleGetMethod } from '../../../api-config/methods';

export function CheckSubdomainAvailability(subdomainName) {
  return handleGetMethod('/admin/accounts/actions/subdomain-availability', {
    params: {
      subdomain: subdomainName,
    },
  });
}

export function GetAccounts() {
  return handleGetMethod('/admin/accounts', {});
}
