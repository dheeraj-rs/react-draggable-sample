import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function ListVoiceLibrary(search = '', pageNumber = '', voiceCategoryId, filterType) {
  return handleGetMethod('/telephony/admin/vendor-voice-library', {
    params: {
      search,
      'page[number]': pageNumber,
      'filter[category_id]': voiceCategoryId,
      'filter[type]': filterType,
    },
  });
}

export function ListAllVoiceLibrary(search = '', categoryId) {
  return handleGetMethod(`/telephony/admin/vendor-voice-library/actions/listWithoutPaginaton`, {
    params: {
      search,
      'filter[category_id]': categoryId,
    },
  });
}

export function GetVoiceLibrary(voiceId) {
  return handleGetMethod(`/telephony/admin/vendor-voice-library/${voiceId}`);
}

export const CreateVoiceLibraryBySourceForUpload = (data) => {
  return handlePostMethod('/telephony/admin/vendor-voice-library', { data });
};

export const CreateVoiceLibraryBySourceForUrl = (data) => {
  return handlePostMethod('/telephony/admin/vendor-voice-library', { data });
};

export const DeleteVoiceLibrary = (id) => {
  return handleDeleteMethod(`/telephony/admin/vendor-voice-library/${id}`);
};

export const UpdateVoiceLibrary = (id, data) => {
  return handlePatchMethod(`/telephony/admin/vendor-voice-library/${id}`, { data });
};
export const MoveVoiceLibrary = (id, data) => {
  return handlePatchMethod(`/telephony/admin/vendor-voice-library/${id}`, { data });
};

export const CreateVoiceLibraryBySourceFortextToSpeech = (data) => {
  return handlePostMethod('/telephony/admin/vendor-voice-library', { data });
};

export const CreateVoiceLibraryBySourceForRecord = (data) => {
  return handlePostMethod('/telephony/admin/vendor-voice-library', { data });
};
