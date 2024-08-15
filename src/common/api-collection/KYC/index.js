import { handleGetMethod, handlePostMethod } from '../../api-config/methods';

export function ListKYC() {
  return handleGetMethod('/admin/telephony-kyc-document-uploads');
}

export function SubmitKYC(data) {
  return handlePostMethod('/admin/telephony-kyc-document-uploads', { data });
}
