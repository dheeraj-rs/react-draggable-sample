import {
    handleDeleteMethod,
    handleGetMethod,
    handlePatchMethod,
    handlePostMethod,
} from '../../../api-config/methods';


export function ListPaginatedCallbacks(search, pageNumber, filter) {
    return handleGetMethod('/telephony/admin/vendor-callback', {
        params: {
            search,
            'page[number]': pageNumber,
            'filter[status]': filter
        },
    });
}
export function ListAllNotInQueue() {
    return handleGetMethod('telephony/admin/vendor-callback/actions/list-all-not-in-queue');
}
export function DeleteCallback(callBackId) {
    return handleDeleteMethod(`/telephony/admin/vendor-callback/${callBackId}`);
}

export function CreateCallback(data) {
    return handlePostMethod('/telephony/admin/vendor-callback', { data });
}