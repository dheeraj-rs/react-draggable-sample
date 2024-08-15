import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function ListVoiceCategory(search = '') {
  return handleGetMethod('/telephony/admin/vendor-voice-category', {
    params: {
      search,
    },
  });
}

export function CreateVoiceCategory(data) {
  return handlePostMethod('/telephony/admin/vendor-voice-category', { data });
}

export function DeleteVoiceCategory(id) {
  return handleDeleteMethod(`/telephony/admin/vendor-voice-category/${id}`);
}

export function ClearVoiceCategory(id) {
  return handleDeleteMethod(`/telephony/admin/vendor-voice-category/clear/${id}`);
}

export function UpdateVoiceCategoryRename(data) {
  return handlePatchMethod(`/telephony/admin/vendor-voice-category/${data?.id}`, { data });
}
