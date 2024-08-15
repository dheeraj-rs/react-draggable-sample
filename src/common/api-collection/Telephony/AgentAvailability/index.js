import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function CreateAgentAvailability(data) {
  return handlePostMethod('/telephony/admin/vendor-agent-availability', { data });
}

export function ListAgentAvailabilities(search, pageNumber = 1) {
  return handleGetMethod('/telephony/admin/vendor-agent-availability', {
    params: {
      search,
      'page[number]': pageNumber,
    },
  });
}

export function ListAgentAvailabilitiesWithoutPagination() {
  return handleGetMethod('/telephony/admin/vendor-agent-availability/actions/listWithoutPaginaton');
}

export function DeleteAgentAvailability(agentId) {
  return handleDeleteMethod(`/telephony/admin/vendor-agent-availability/${agentId}`);
}

export function UpdateAgentAvailability(data) {
  return handlePatchMethod(`/telephony/admin/vendor-agent-availability/${data?.id}`, { data });
}

export function GetAgentAvailability(agentId) {
  return handleGetMethod(`/telephony/admin/vendor-agent-availability/${agentId}`, {});
}

export function EnableAgentAvailability(id) {
  const data = {
    id: parseInt(id, 10),
  };
  return handlePatchMethod(`/telephony/admin/vendor-agent-availability/${id}/actions/enable`, {
    data,
  });
}
export function DisableAgentAvailability(id) {
  const data = {
    id: parseInt(id, 10),
  };
  return handlePatchMethod(`/telephony/admin/vendor-agent-availability/${id}/actions/disable`, {
    data,
  });
}
export function DefaultAgentAvailability(id) {
  const data = {
    id: parseInt(id, 10),
  };
  return handlePatchMethod(`/telephony/admin/vendor-agent-availability/${id}/actions/default`, {
    data,
  });
}

export default function ListWithoutPagination() {
  return handleGetMethod('/telephony/admin/vendor-call-flow/actions/listWithoutPaginaton', {});
}
