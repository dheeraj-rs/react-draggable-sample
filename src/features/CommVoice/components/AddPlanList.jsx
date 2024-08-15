import moment from 'moment';
import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

function AddPlanList({
  carrierId,
  areaCode,
  buyRate,
  startPluse,
  sellRate,
  startPulseSell,
  nextPulseSell,
  country,
  state,
  city,
  effectiveOnBuy,
  effectiveOnSell,
  isEnabled,
  setShow,
  formik,
  plan,
  handleBulkSelection,
  selectedItemsForBulkSelection,
}) {
  return (
    <tr className="carrier-table">
      <td>
        <div className="check-box">
          <input
            type="checkbox"
            id={carrierId}
            onClick={() => {
              handleBulkSelection({
                type: 'telephony_vendor_carrier_plan_rate_sheets',
                id: parseInt(carrierId, 10),
              });
            }}
            checked={selectedItemsForBulkSelection?.some(
              (group) => parseInt(group?.id, 10) === parseInt(carrierId, 10)
            )}
            onChange={() => {}}
          />
          <label className="text-primary mb-0" htmlFor={carrierId}>
            {areaCode}
          </label>
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <p className="mb-0">
            {buyRate}
            <a
              href="/#"
              data-bs-toggle="tooltip"
              onClick={(e) => {
                e.preventDefault();
              }}
              data-tooltip-id={`tooltip-sell-rate-${carrierId}`}
            >
              <img className="ps-2" src="/assets/info-admin.svg" alt="" />
            </a>
            <Tooltip
              id={`tooltip-sell-rate-${carrierId}`}
              content={`Sell rate: ${buyRate}`}
              place="top"
              style={{ borderRadius: '5px', height: '25px', display: 'flex', alignItems: 'center' }}
            />
          </p>
        </div>
      </td>
      <td>{startPluse}</td>
      <td>{effectiveOnBuy}</td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <p className="mb-0">
            {sellRate}
            <a
              href="/#"
              data-bs-toggle="tooltip"
              onClick={(e) => {
                e.preventDefault();
              }}
              data-tooltip-id={`tooltip-sell-rate-${carrierId}`}
            >
              <img className="ps-2" src="/assets/info-admin.svg" alt="" />
            </a>
            <Tooltip
              id={`tooltip-sell-rate-${carrierId}`}
              content={`Sell rate: ${sellRate}`}
              place="top"
              style={{ borderRadius: '5px', height: '25px', display: 'flex', alignItems: 'center' }}
            />
          </p>
        </div>
      </td>

      <td> {`${startPulseSell}/${nextPulseSell}`}</td>
      <td> {moment(effectiveOnSell).format('DD/MM/YYYY hh:mm A')}</td>
      <td> {country}</td>
      <td> {state}</td>
      <td> {city}</td>
      <td>
        <div className="d-flex gap-3 justify-content-between">
          {/* <CheckboxTickChat checkid="activeId" title="" /> */}
          <div className="dropdown ">
            <a href="/#" className="" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="/assets/vertical-dot.svg" alt="" />
            </a>
            <ul className="dropdown-menu dropdown-menu-group p-3">
              <li>
                <a
                  href="/#"
                  // data-bs-toggle="modal"
                  // data-bs-target="#editRecord"
                  className="dropdown-item py-3 px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setShow({
                      isVisible: true,
                      type:
                        isEnabled === 1
                          ? 'disable-carrier-plan-rate-sheet'
                          : 'enable-carrier-plan-rate-sheet',
                      key: `${isEnabled === 1 ? 'Disable' : 'Enable'}`,
                      id: carrierId,
                    });
                  }}
                >
                  {isEnabled === 1 ? 'Disable' : 'Enable'}
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  // data-bs-toggle="modal"
                  // data-bs-target="#editRecord"
                  className="dropdown-item py-3 px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setShow({
                      isVisible: true,
                      type: 'set-value',
                      rateSheetDetails: {
                        buy: {
                          startPluse: '',
                          nextPulse: '',
                          effectiveDate: '',
                        },
                        sell: {
                          startPluse: plan?.attributes?.start_pulse,
                          nextPulse: plan?.attributes?.next_pulse,
                          effectiveDate: plan?.attributes?.effective_on,
                        },
                        state: plan?.attributes?.state_id,
                        city: plan?.attributes?.city_id,
                        areaCode: plan?.attributes?.area_code,
                      },
                    });
                  }}
                >
                  Set value
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  // data-bs-toggle="modal"
                  // data-bs-target="#editRecord"
                  className="dropdown-item py-3 px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    formik.setFieldValue('country', plan?.attributes?.country_id);
                    formik.setFieldValue('state', plan?.attributes?.state_id);
                    formik.setFieldValue('city', plan?.attributes?.city_id);
                    formik.setFieldValue('areaCode', plan?.attributes?.area_code);

                    formik.setFieldValue('buyRate', '');
                    formik.setFieldValue('buyEffectiveOn', '');
                    formik.setFieldValue('buyStarPulse', '');
                    formik.setFieldValue('buyNextPluse', '');

                    formik.setFieldValue('sellRate', plan?.attributes?.rate);
                    formik.setFieldValue('sellEffectiveOn', plan?.attributes?.effective_on);
                    formik.setFieldValue('sellStarPulse', plan?.attributes?.start_pulse);
                    formik.setFieldValue('sellNextPluse', plan?.attributes?.next_pulse);

                    formik.setFieldValue('enable', plan?.attributes?.is_enabled);

                    setShow({
                      isVisible: true,
                      type: 'edit-carrier-rate-sheet',
                      id: carrierId,
                    });
                  }}
                >
                  Edit Entry
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  // data-bs-toggle="modal"
                  // data-bs-target="#deleteModal"
                  className="dropdown-item py-3 px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setShow({
                      isVisible: true,
                      type: 'delete-carrier-plan-rate-sheet',
                      id: carrierId,
                    });
                  }}
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default AddPlanList;
