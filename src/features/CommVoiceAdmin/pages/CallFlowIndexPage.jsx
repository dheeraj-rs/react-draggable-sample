import React from 'react';
import {
  isSuperAdminFunction,
  isTenantAdminFunction,
  isTenantUserFunction,
} from '../../../common/helpers/utils';
import CallFlows from './CallFlows';
import CallFlowAdmin from './CallFlowAdmin';

function CallFlowIndexPage() {
  const isSuperAdmin = isSuperAdminFunction();
  const isTenantAdmin = isTenantAdminFunction();
  const isUser = isTenantUserFunction();
  console.log('isSuperAdmin : ', isSuperAdmin);
  if (isSuperAdmin) {
    return <CallFlowAdmin sideNavIcon="/assets/comm-voice-logo.svg" title="Settings" />;
  }

  if (isUser || isTenantAdmin) {
    return <CallFlows sideNavIcon="/assets/comm-voice-logo.svg" title="Settings" />;
  }
  return null;
}

export default CallFlowIndexPage;
