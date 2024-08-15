import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export const ListPaginatedApiLibrary = (search = '', pageNumber = 1) => {
  return handleGetMethod('/telephony/admin/vendor-api-libraries', {
    params: {
      search,
      'page[number]': pageNumber,
    },
  });
};

// export const ListAllApiLibrary = (search = '', pageNumber = 1) => {
//   return handleGetMethod('/telephony/admin/vendor-api-libraries/', {
//     params: {
//       search,
//       'page[number]': pageNumber,
//     },
//   });
// };

export const CreateApiLibrary = (data) => {
  return handlePostMethod('/telephony/admin/vendor-api-libraries', { data });
};

export const EnableApiLibrary = (id, data) => {
  return handlePatchMethod(`/telephony/admin/vendor-api-libraries/${id}/actions/enable`, { data });
};

export const DisableApiLibrary = (id, data) => {
  return handlePatchMethod(`/telephony/admin/vendor-api-libraries/${id}/actions/disable`, { data });
};

export const UpdateApiLibrary = (id, data) => {
  return handlePatchMethod(`/telephony/admin/vendor-api-libraries/${id}`, { data });
};

export const DeleteApiLibrary = (id, data) => {
  return handleDeleteMethod(`/telephony/admin/vendor-api-libraries/${id}`, { data });
};

export const ListAllApiLibrary = (type = '') => {
  return handleGetMethod('/telephony/admin/vendor-api-libraries/queries/all', {
    params: {
      'filter[type] ': type,
    },
  });
};
