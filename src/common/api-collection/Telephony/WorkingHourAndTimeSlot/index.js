import {
    handleDeleteMethod,
    handleGetMethod,
    handlePatchMethod,
    handlePostMethod,
} from '../../../api-config/methods';


export function CreateWorkingHourAndSlotTime(data) {
    return handlePostMethod('/telephony/admin/vendor-working-hours-time-slot', { data });
}

export function EnableWorkingHourAndTimeSlot(id) {
    const data = {
        id: parseInt(id, 10),
    };
    return handlePatchMethod(`/telephony/admin/vendor-working-hours-time-slot/${id}/actions/enable`, { data });
}
export function DisableWorkingHourAndTimeSlot(id) {
    const data = {

        id: parseInt(id, 10),
    };
    return handlePatchMethod(`/telephony/admin/vendor-working-hours-time-slot/${id}/actions/disable`, { data });
}

export function UpdateWorkingHourAndTimeSlot(data) {
    return handlePatchMethod(`/telephony/admin/vendor-working-hours-time-slot/${data.id}`, { data });
}
export function DeleteWorkingHourAndTimeSlot(slotId) {
    return handleDeleteMethod(`/telephony/admin/vendor-working-hours-time-slot/${slotId}`);
}
export function ClearWorkingHourAndTimeSlot(dayId) {
    return handleDeleteMethod(`/telephony/admin/vendor-working-hours-time-slot/clear/${dayId}`);
}
export function ApplyToAllWorkingHourAndTimeSlot(data) {
    return handlePostMethod('/telephony/admin/vendor-working-hours-time-slot/actions/apply-to-all', { data });
}


export function ListWorkingHourTimeSlot(agentAvailabilityId) {
    return handleGetMethod('/telephony/admin/vendor-working-hours-time-slot?', {
        params: {
            'filter[agent_availability_id]': agentAvailabilityId,
            // 'page[number]': pageNumber,
        },
    });
}