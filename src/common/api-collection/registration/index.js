import { handlePostMethod } from '../../api-config/methods';
import { getDeviceMeta, getOperatingSystem } from '../../helpers/utils';

const handleOrganizationRegistration = (data, interestedModule) => {
  const values = {
    data: {
      type: 'users',
      attributes: {
        first_name: data?.firstName,
        last_name: data?.lastName,
        email: data?.email,
        password: data?.password,
        phone: `+${data?.countryCode} ${data?.phone}`,
        organization: data?.organization,
        industry: null,
        meta: {
          interested_module: interestedModule,
        },
        device_meta: {
          type: getDeviceMeta().type,
          name: getDeviceMeta().platform,
          os: getOperatingSystem(),
          browser: getDeviceMeta().userAgent,
          user_agent: getDeviceMeta().userAgent,
        },
      },
    },
  };

  return handlePostMethod('/auth/register', values);
};

const handleVerifyUserEmail = (data) => {
  const values = {
    data: {
      type: 'users',
      attributes: {
        id: parseInt(data.id, 10),
        organization_id: parseInt(data.organization_id, 10),
        otp: parseInt(data.otp, 10),
      },
    },
  };

  return handlePostMethod('/auth/email/verify/otp', values);
};

export { handleOrganizationRegistration, handleVerifyUserEmail };
