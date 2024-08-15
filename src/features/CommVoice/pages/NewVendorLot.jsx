import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import normalize from 'json-api-normalizer';

import Layout from '../../../common/layout';
import StepperApp from '../components/StepperAppLot';
import { ListAllBatches } from '../../../common/api-collection/Telephony/Batches';
import { ListAllLocalSwitches } from '../../../common/api-collection/Telephony/LocalSwitches';
import '../../../styles/formvalidation.css';
import { CreateLot, GetLot, UpdateLot } from '../../../common/api-collection/Telephony/Lots';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import { ListPaginatedNumberPlans } from '../../../common/api-collection/Telephony/NumberPlans';

function NewVendorLot() {
  const tempLsArray = [];

  const params = useParams();

  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

  const [unpaginatedBatches, setUnpaginatedBatches] = useState([]);
  const [unpaginatedLocalSwitches, setUnpaginatedLocalSwitches] = useState([]);
  const [unpaginatedNumberPlans, setUnpaginatedNumberPlans] = useState([]);

  const [toastAction, setToastAction] = useState({
    isVisible: false,
    type: '',
    message: '',
  });

  const [refresh, setRefresh] = useState(false);

  const [dataSubmitting, setDataSubmitting] = useState(false);

  const validate = (data) => {
    const errors = {};

    if (activeStep === 0) {
      if (!data.lotName) {
        errors.lotName = 'lot name is required';
      }

      if (!data.plan) {
        errors.plan = 'plan is required';
      }

      if (data.localSwitch?.length === 0) {
        errors.localSwitch = 'local switch is required';
      }

      if (!data.description) {
        errors.description = 'description is required';
      }
      return errors;
    }
    if (activeStep === 1) {
      if (data.numberOfChannels === '') {
        errors.numberOfChannels = 'channels required';
      }
      if (!data.mrc === '') {
        errors.mrc = 'mrc required';
      }
      if (!data.mrcInc === '') {
        errors.mrcInc = ' required';
      }
      if (!data.mRCDescription) {
        errors.mRCDescription = 'description required';
      }
      return errors;
    }
    return null;
  };

  const formik = useFormik({
    initialValues: {
      // for 'activeStep === 0'
      planId: '',
      batchId: '',
      lotName: '',
      plan: '',
      localSwitch: [],
      description: '',
      enable: true,

      // for 'activeStep === 1'
      numberOfChannels: '',
      mrc: '',
      mrcInc: '',
      mRCDescription: '',
    },
    validate,
    onSubmit: () => {
      if (activeStep === 0) {
        setActiveStep(1);
      }

      if (activeStep === 1) {
        setDataSubmitting(true);

        if (params?.type === 'edit') {
          const data = {
            type: 'telephony_vendor_lots',
            id: parseInt(params?.lotId, 10),
            attributes: {
              batch_id: formik.values.batchId,
              number_plan_id: formik.values.planId,
              name: formik.values.lotName,
              description: formik.values.description,
              is_enabled: formik.values.enable,
              initial_mrc_details: {
                monthly_recurring_cost: formik.values.mrc,
                monthly_free_usage_amount: formik.values.mrcInc,
                channel_count: formik.values.numberOfChannels,
                description: formik.values.mRCDescription,
              },
            },
            relationships: {
              switches: {
                data: formik.values.localSwitch,
              },
            },
          };

          UpdateLot(data)
            ?.then(() => {
              navigate(-1);
              setToastAction({
                isVisible: true,
                message: 'Lot Added',
                type: 'success',
              });
              formik.resetForm();
              setRefresh(!refresh);
            })
            ?.catch((error) => {
              if (error?.response?.status === 500 || error?.response?.status === 404) {
                setToastAction({
                  isVisible: true,
                  message: 'Something went wrong.',
                  type: 'failed',
                });
              } else {
                setToastAction({
                  isVisible: true,
                  type: 'failed',
                  message: error?.response?.data?.message
                    ? error?.response?.data?.message
                    : 'Something went wrong!',
                });
              }
            })
            .finally(() => {
              setDataSubmitting(false);
            });
        } else {
          const data = {
            type: 'telephony_vendor_lots',
            attributes: {
              batch_id: formik.values.batchId,
              number_plan_id: formik.values.planId,
              name: formik.values.lotName,
              description: formik.values.description,
              is_enabled: formik.values.enable,
              initial_mrc_details: {
                monthly_recurring_cost: formik.values.mrc,
                monthly_free_usage_amount: formik.values.mrcInc,
                channel_count: formik.values.numberOfChannels,
                description: formik.values.mRCDescription,
              },
            },
            relationships: {
              switches: {
                data: formik.values.localSwitch,
              },
            },
          };

          CreateLot(data)
            ?.then(() => {
              navigate(-1);
              setToastAction({
                isVisible: true,
                message: 'Lot Added',
                type: 'success',
              });
              formik.resetForm();
              setRefresh(!refresh);
            })
            ?.catch((error) => {
              if (error?.response?.status === 500 || error?.response?.status === 404) {
                setToastAction({
                  isVisible: true,
                  message: 'Something went wrong.',
                  type: 'failed',
                });
              } else {
                setToastAction({
                  isVisible: true,
                  type: 'failed',
                  message: error?.response?.data?.message
                    ? error?.response?.data?.message
                    : 'Something went wrong!',
                });
              }
            })
            .finally(() => {
              setDataSubmitting(false);
            });
        }
      }
    },
  });

  useEffect(() => {
    ListPaginatedNumberPlans()?.then((response) => {
      setUnpaginatedNumberPlans(response?.data);
    });

    ListAllBatches()?.then((response) => {
      setUnpaginatedBatches(response?.data);
    });

    ListAllLocalSwitches()?.then((response) => {
      setUnpaginatedLocalSwitches(response?.data);
    });
  }, []);

  useEffect(() => {
    if (params?.type === 'edit') {
      GetLot(params?.lotId)?.then((response) => {
        const normalizedData = normalize(response);

        formik.setFieldValue('lotName', response?.data?.attributes?.name);
        formik.setFieldValue('batchId', parseInt(params?.batchId, 10));
        formik.setFieldValue(
          'plan',
          normalizedData?.numberPlan[response?.data?.attributes?.number_plan_id]?.attributes?.name
        );

        response?.data?.relationships?.switches?.data?.map((localSwitch) => {
          tempLsArray.push({
            type: 'telephony_vendor_local_switches',
            id: parseInt(localSwitch?.id, 10),
          });
          return null;
        });

        formik.setFieldValue('localSwitch', tempLsArray);
        formik.setFieldValue('description', response?.data?.attributes?.description);
        formik.setFieldValue('enable', response?.data?.attributes?.is_enabled);

        formik.setFieldValue('numberOfChannels', response?.data?.attributes?.total_channel_count);
        formik.setFieldValue('mrc', response?.data?.attributes?.total_mrc);
        formik.setFieldValue('mrcInc', response?.data?.attributes?.total_included_mrc);
        formik.setFieldValue('planId', response?.data?.attributes?.number_plan_id);
      });
    }
  }, [params.type]);

  return (
    <Layout title="Gsoft admin" headerTitle="Gsoft admin" favIcon="/assets/admin-logos.svg">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-28px pb-20px ps-23px pe-25px scrollbox-content h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="d-flex gap-2 left-mob vendor-left-mob align-items-center">
                    <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                      <a
                        href="/#"
                        // to={`/comm-telephony/vendor-batch-lot-details/${params?.id}`}
                        className="d-flex justify-content-center"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(-1);
                        }}
                      >
                        <img src="/assets/leftback.svg" alt="" />
                      </a>
                    </div>
                    <div>
                      <h5 className="fs-16px fw-500 d-flex gap-3 align-items-center mb-0">
                        <a
                          href="#/"
                          className="d-block d-lg-none"
                          onClick={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                          }}
                        >
                          <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                        </a>{' '}
                        Add Lot
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              <div className="equal-pad scroll-wrap-agent scroll-custom pb-5 agent-padding">
                <div>
                  <StepperApp
                    unpaginatedBatches={unpaginatedBatches}
                    unpaginatedLocalSwitches={unpaginatedLocalSwitches}
                    formik={formik}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    dataSubmitting={dataSubmitting}
                    unpaginatedNumberPlans={unpaginatedNumberPlans}
                    isAttachBatchDisabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toastAction.type === 'success' ? (
        <ToastSuccess
          id="RenameWidgetMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
        >
          <span>{toastAction?.message}</span>
        </ToastSuccess>
      ) : (
        <ToastError
          id="RenameWidgetMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
          isSuccess={false}
        >
          <span>{toastAction?.message}</span>
        </ToastError>
      )}
    </Layout>
  );
}

export default NewVendorLot;
