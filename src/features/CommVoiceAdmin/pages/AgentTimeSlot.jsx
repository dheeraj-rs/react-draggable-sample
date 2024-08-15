/* eslint-disable indent */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import normalize from 'json-api-normalizer';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import EditTimeSlotOffcanvas from '../components/offcanvas/EditTimeSlotOffcanvas';
import DeleteHolidayModal from '../components/modals/DeleteHolidayModal';
import DeleteTimeSlotModal from '../components/modals/DeleteTimeSlotModal';
import SetTimeSlotOffcanvas from '../components/offcanvas/SetTimeSlotOffcanvas';
import EditHolidayModal from '../components/modals/EditHolidayModal';
import AddHolidayModal from '../components/modals/AddHolidayModal';
import Input from '../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../common/components/buttons/ButtonWhiteModalCancel';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import Holidays from '../components/Holidays';
import Layout from '../../../common/layout';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';
import EnableTimeSlotModal from '../components/EnableTimeSlotModal';
import DisableTimeSlotModal from '../components/DisableTimeSlotModal';
import WorkingHours from '../components/voice/WorkingHours';
import {
  CreateAgentAvailability,
  ListAgentAvailabilities,
} from '../../../common/api-collection/Telephony/AgentAvailability';
import GetTimezones from '../../../common/api-collection/Common/Timezones';
import {
  CreateHoliday,
  DeleteHoliday,
  ListHolidays,
  UpdateHoliday,
} from '../../../common/api-collection/Telephony/Holidays';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import {
  ApplyToAllWorkingHourAndTimeSlot,
  ClearWorkingHourAndTimeSlot,
  CreateWorkingHourAndSlotTime,
  DisableWorkingHourAndTimeSlot,
  EnableWorkingHourAndTimeSlot,
  ListWorkingHourTimeSlot,
  UpdateWorkingHourAndTimeSlot,
} from '../../../common/api-collection/Telephony/WorkingHourAndTimeSlot';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';
import ApplyToAllTimeSlotModal from '../components/ApplyToAllTimeSlotModal';

function AgentTimeSlot() {
  const [show, setShow] = useState({ isVisible: false, type: '' });
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState({ type: 'holidays' });

  const [timezones, setTimezones] = useState([]);
  const [isDisable, setIsDisable] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const [allHolidays, setAllHolidays] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });
  const [allWorkingHours, setAllWorkingHours] = useState({
    data: [],
    included: [],
    isLoading: false,
  });
  const [allAgentAvailability, setAllAgentAvailability] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });
  const [normalizedTimeSlots, setNormalizedTimeSlots] = useState();

  const workingHoursArray = [
    {
      day: 'Monday',
    },
    {
      day: 'Tuesday',
    },
    {
      day: 'Wednesday',
    },
    {
      day: 'Thursday',
    },
    {
      day: 'Friday',
    },
    {
      day: 'Saturday',
    },
  ];

  const addAgentAvailability = (formik) => {
    setIsLoading(true);
    const data = {
      type: 'telephony_agent_avaibilities',
      attributes: {
        name: formik.values.slotName,
        timezone: formik.values.timeZone,
        description: formik.values.description,
      },
    };

    CreateAgentAvailability(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'New Agent Time Slot has been saved successfully.',
          type: 'success',
        });
        setRefresh(!refresh);
        setIsDisable(!isDisable);
        // navigate('/comm-voice-admin/agent-availability');
        // formik.resetForm()
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
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
        setIsLoading(false);
        // formik.resetForm();
        setShow({ isVisible: false, type: '' });
      });
  };

  const addHoliday = (formik) => {
    setIsLoading(true);
    // const formattedDate = moment(formik.values.holidayDate).format('YYYY-MM-DD');

    // console.log('formattedDate : ', formattedDate);

    const data = {
      type: 'telephony_holidays',
      attributes: {
        name: formik.values.holidayName,
        agent_availability_id: allAgentAvailability?.data?.[0]?.id,
        date: formik.values.holidayDate,
      },
    };

    CreateHoliday(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Holiday has been added successfully.',
          type: 'success',
        });
        setRefresh(!refresh);
        formik.setFieldValue('holidayDate', '');
        formik.setFieldValue('holidayName', '');
        // formik.resetForm();
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
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
        setIsLoading(false);
        formik.setFieldValue('holidayDate', '');
        formik.setFieldValue('holidayName', '');
        // formik.resetForm();
        setShow({ isVisible: false, type: '' });
      });
  };

  const editHoliday = (formik) => {
    setIsLoading(true);
    // const formattedDate = moment(formik.values.holidayDate).format('YYYY-MM-DD');
    const data = {
      type: 'telephony_holidays',
      id: parseInt(show?.holidayId, 10),
      attributes: {
        name: formik.values.holidayName,
        date: formik.values.holidayDate,
      },
    };
    // console.log('data.id===>', data);
    UpdateHoliday(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Holiday has been added successfully.',
          type: 'success',
        });

        setRefresh(!refresh);
        formik.setFieldValue('holidayDate', '');
        formik.setFieldValue('holidayName', '');
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            message: 'Something went wrong.',
            type: 'failed',
          });
        } else {
          setToastAction({
            isVisible: true,
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong.',
            type: 'failed',
          });
        }
      })
      .finally(() => {
        // formik.resetForm();
        formik.setFieldValue('holidayDate', '');
        formik.setFieldValue('holidayName', '');
        setIsLoading(false);
        setShow({ isVisible: false, type: '' });
      });
  };

  const addWorkingHoursAndTimeSlot = (formik) => {
    setIsLoading(true);
    const data = {
      type: 'telephony_working_hour_slots',
      attributes: {
        agent_availability_id: allAgentAvailability?.data?.[0]?.id,
        day: show?.day,
        slots: formik.values.slots.map((slot) => ({
          start_time: slot.startTime,
          end_time: slot.endTime,
        })),
      },
    };

    CreateWorkingHourAndSlotTime(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Time Slot has been added successfully.',
          type: 'success',
        });
        setRefresh(!refresh);
        formik.setFieldValue('slots', [{ startTime: '', endTime: '' }]);
      })
      ?.catch((error) => {
        if (error?.response?.status === 500) {
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
        setIsLoading(false);
        setShow({ isVisible: false, type: '' });
        formik.setFieldValue('slots', [{ startTime: '', endTime: '' }]);
      });
  };

  const editWorkingHoursAndTimeSlot = (formik) => {
    if (show.type === 'edit-time-slot-offcanvas') {
      setIsLoading(true);
      const data = {
        type: 'telephony_working_hour_slots',
        id: show?.dayId,
        attributes: {
          slots: formik.values.slots.map((slot) => ({
            start_time: slot.startTime,
            end_time: slot.endTime,
          })),
        },
      };
      UpdateWorkingHourAndTimeSlot(data)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: 'Time Slot has been saved successfully.',
            type: 'success',
          });
          setRefresh(!refresh);
          formik.setFieldValue('slots', [{ startTime: '', endTime: '' }]);
        })
        ?.catch((error) => {
          if (error?.response?.status === 500) {
            setToastAction({
              isVisible: true,
              message: 'Something went wrong.',
              type: 'failed',
            });
          } else {
            setToastAction({
              isVisible: true,
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong.',
              type: 'failed',
            });
          }
        })
        .finally(() => {
          // formik.resetForm();
          formik.setFieldValue('slots', [{ startTime: '', endTime: '' }]);
          setIsLoading(false);
          setShow({ isVisible: false, type: '' });
        });
    }
  };

  function validate(data) {
    const errors = {};
    if (show?.type === 'agent-timeslot') {
      if (!data.slotName) {
        errors.slotName = 'please enter a  slot name';
      }
      if (!data.timeZone || data.timeZone === 'select') {
        errors.timeZone = 'please enter timezone';
      }
      if (!data.description) {
        errors.description = 'please enter  description';
      }
    } else if (show?.type === 'add-holiday-modal' || show?.type === 'edit-holiday-modal') {
      if (!data.holidayDate) {
        errors.holidayDate = 'please choose date';
      }
      if (!data.holidayName) {
        errors.holidayName = 'please enter  holiday name';
      }
    } else if (
      show?.type === 'set-time-slot-offcanvas' ||
      show?.type === 'edit-time-slot-offcanvas'
    ) {
      data.slots.forEach((slot, index) => {
        if (!slot.startTime) {
          errors.slots[index].startTime = 'please enter a start time for the slot';
        }
        if (!slot.endTime) {
          errors.slots[index].endTime = 'please enter an end time for the slot';
        }
      });
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      slotName: '',
      timeZone: 'select',
      description: '',
      holidayDate: '',
      holidayName: '',
      slots: [
        {
          startTime: '',
          endTime: '',
        },
      ],
    },
    validate,

    onSubmit: () => {
      if (show?.type === 'agent-timeslot') {
        addAgentAvailability(formik);
      }
      if (show.type === 'add-holiday-modal') {
        addHoliday(formik);
      }
      if (show.type === 'edit-holiday-modal') {
        editHoliday(formik);
      }
      if (show.type === 'set-time-slot-offcanvas') {
        addWorkingHoursAndTimeSlot(formik);
      }
      if (show.type === 'edit-time-slot-offcanvas') {
        editWorkingHoursAndTimeSlot(formik);
      }
    },
  });

  const addNewSlot = () => {
    const { slots } = formik.values;
    const lastSlot = slots[slots.length - 1];
    if (lastSlot && (!lastSlot.startTime || !lastSlot.endTime)) {
      return;
    }
    formik.setFieldValue('slots', [...formik.values.slots, { startTime: '', endTime: '' }]);
  };
  const updateSlot = (value, index, field) => {
    const updatedArray = [...formik.values.slots];

    while (updatedArray.length <= index) {
      updatedArray.push({ startTime: '', endTime: '' });
    }

    if (field === 'startTime' || field === 'endTime') {
      updatedArray[index][field] = value || '';
    } else {
      return;
    }

    formik.setFieldValue('slots', updatedArray);

    const previousEndTime = formik.values.slots[index - 1]?.endTime;

    if (field === 'startTime' && value < previousEndTime) {
      formik.setFieldValue(`slots[${index}].startTime`, '');
    }

    if (field === 'endTime' && value <= formik.values.slots[index]?.startTime) {
      formik.setFieldValue(`slots[${index}].endTime`, '');
    }
  };
  const handleDeleteHoliday = () => {
    if (show.type === 'delete-holiday-modal') {
      setIsLoading(true);

      DeleteHoliday(show?.holidayId)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: 'Holiday has been deleted successfully.',
            type: 'success',
          });
          setShow({ isVisible: false, type: '' });
          setRefresh(!refresh);
        })
        ?.catch((error) => {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong!',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  const handleDisableTimeSlot = () => {
    if (show.type === 'disable-time-slot') {
      setIsLoading(true);
      DisableWorkingHourAndTimeSlot(show?.dayId)
        ?.then(() => {
          setRefresh(!refresh);
          setToastAction({
            isVisible: true,
            message: 'Time Slot has been disabled successfully.',
            type: 'success',
          });
        })
        ?.catch((error) => {
          if (error?.response?.status === 500) {
            setToastAction({
              isVisible: true,
              message: 'Something went wrong.',
              type: 'failed',
            });
          } else {
            setToastAction({
              isVisible: true,
              message: error?.response?.data?.error?.message
                ? error?.response?.data?.error?.message
                : 'Something went wrong.',
              type: 'failed',
            });
          }
        })
        ?.finally(() => {
          setIsLoading(false);
          setShow({ isVisible: false, type: '' });
        });
    }
  };

  const handleDeleteSetTimeSlot = () => {
    if (show.deleteType === 'edit-delete-timeslot-modal') {
      const updatedArray = [...formik.values.slots];
      updatedArray.splice(show.slotIndex, 1);
      formik.setFieldValue('slots', updatedArray);
      setToastAction({
        isVisible: true,
        message: 'Time Slot has been deleted successfully.',
        type: 'success',
      });
    }
    if (show.deleteType === 'set-delete-timeslot-modal') {
      const updatedArray = [...formik.values.slots];
      updatedArray.splice(show.slotIndex, 1);
      formik.setFieldValue('slots', updatedArray);
      setToastAction({
        isVisible: true,
        message: 'Time Slot has been deleted successfully.',
        type: 'success',
      });
    }

    if (show.type === 'edit-time-slot-offcanvas') {
      setShow({
        isVisible: true,
        type: 'edit-time-slot-offcanvas',
        deleteType: '',
        isDeleteVisible: false,
        dayId: show?.dayId,
        day: show?.day,
      });
    }

    if (show.type === 'set-time-slot-offcanvas') {
      setShow({
        isVisible: true,
        type: 'set-time-slot-offcanvas',
        deleteType: '',
        isDeleteVisible: false,
        dayId: show?.dayId,
        day: show?.day,
      });
    }
  };
  const handleClearAll = () => {
    if (show.type === 'edit-time-slot-offcanvas') {
      setIsLoading(true);

      ClearWorkingHourAndTimeSlot(show?.dayId)
        ?.then(() => {
          const clearedTimeSlots = Array.from({ length: formik.values.slots.length }, () => ({
            startTime: '',
            endTime: '',
          }));
          formik.setFieldValue('slots', clearedTimeSlots);
          setRefresh(!refresh);
        })
        ?.catch((error) => {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong!',
          });
        })
        .finally(() => {
          setShow({
            isVisible: true,
            type: 'edit-time-slot-offcanvas',
            dayId: show?.dayId,
            day: show?.day,
          });
          setIsLoading(false);
        });
    }
  };
  const handleApplyToAll = () => {
    if (show.type === 'apply-to-all') {
      setIsLoading(true);
      const data = {
        type: 'telephony_working_hour_slots',
        attributes: {
          agent_availability_id: allAgentAvailability?.data?.[0]?.id,
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          slots: show?.applySlots.map((slot) => ({
            start_time: slot.startTime,
            end_time: slot.endTime,
          })),
        },
      };

      ApplyToAllWorkingHourAndTimeSlot(data)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: 'Time Slot has been added  to all days successfully.',
            type: 'success',
          });
          setRefresh(!refresh);
        })
        ?.catch((error) => {
          if (error?.response?.status === 500) {
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
          setIsLoading(false);
          setShow({ isVisible: false, type: '' });
        });
    }
  };
  const handleApplyToAllOffcanvas = () => {
    if (show?.applytype === 'apply-to-all-offcanvas') {
      setIsLoading(true);
      const data = {
        type: 'telephony_working_hour_slots',
        attributes: {
          agent_availability_id: allAgentAvailability?.data?.[0]?.id,
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          slots: formik.values.slots.map((slot) => ({
            start_time: slot.startTime,
            end_time: slot.endTime,
          })),
        },
      };

      ApplyToAllWorkingHourAndTimeSlot(data)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: 'Time Slot has been added  to all days successfully.',
            type: 'success',
          });
          setRefresh(!refresh);
        })
        ?.catch((error) => {
          if (error?.response?.status === 500) {
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
          setIsLoading(false);
          setShow({ isVisible: false, type: '' });
        });
    }
  };
  const handleOnClose = () => {
    if (show.type === 'edit-time-slot-offcanvas') {
      setShow({
        isVisible: true,
        type: 'edit-time-slot-offcanvas',
        deleteType: '',
        isDeleteVisible: false,
        dayId: show?.dayId,
      });
    }
    if (show.type === 'set-time-slot-offcanvas') {
      setShow({
        isVisible: true,
        type: 'set-time-slot-offcanvas',
        deleteType: '',
        isDeleteVisible: false,
        dayId: show?.dayId,
      });
    }
  };
  const handleEnableTimeSlot = () => {
    if (show.type === 'enable-time-slot') {
      setIsLoading(true);
      EnableWorkingHourAndTimeSlot(show?.dayId)
        ?.then(() => {
          setRefresh(!refresh);
          setToastAction({
            isVisible: true,
            message: 'Time Slot has been enabled successfully.',
            type: 'success',
          });
        })
        ?.catch((error) => {
          if (error?.response?.status === 500) {
            setToastAction({
              isVisible: true,
              message: 'Something went wrong.',
              type: 'failed',
            });
          } else {
            setToastAction({
              isVisible: true,
              message: error?.response?.data?.error?.message
                ? error?.response?.data?.error?.message
                : 'Something went wrong.',
              type: 'failed',
            });
          }
        })
        ?.finally(() => {
          setIsLoading(false);
          setShow({ isVisible: false, type: '' });
        });
    }
  };
  const getMatchingWorkingHours = (allWorkingHoursData, targetDay) => {
    return allWorkingHoursData?.find((workingHours) => workingHours.attributes.day === targetDay);
  };

  useEffect(() => {
    GetTimezones().then((response) => {
      setTimezones(response.data.timezones);
    });
  }, []);

  useEffect(() => {
    if (allAgentAvailability?.data?.length > 1) {
      setAllHolidays({ isLoading: true });
      ListHolidays(searchTerm, allAgentAvailability?.data?.[0]?.id, selectedMonth)?.then(
        (response) => {
          setAllHolidays({
            data: response?.data,
            links: response?.links,
            meta: response?.meta,
            isLoading: false,
          });
        }
      );
    }
  }, [refresh, searchTerm, selectedMonth, allAgentAvailability]);

  useEffect(() => {
    if (allAgentAvailability?.data?.length > 1) {
      setAllWorkingHours({ isLoading: true });
      ListWorkingHourTimeSlot(allAgentAvailability?.data[0]?.id)?.then((response) => {
        setNormalizedTimeSlots(normalize({ included: response?.included }));
        setAllWorkingHours({
          data: response?.data,
          included: response?.included,
          isLoading: false,
        });
      });
    }
  }, [refresh, allAgentAvailability]);

  useEffect(() => {
    if (!isDisable) {
      setAllAgentAvailability([]);
      ListAgentAvailabilities(searchTerm)?.then((response) => {
        setAllAgentAvailability({
          data: response?.data,
          links: response?.links,
          meta: response?.meta,
          isLoading: false,
        });
      });
    }
  }, [refresh, isLoading]);

  return (
    <Layout>
      <div className="wrapper d-flex flex-column flex-lg-row gap-0 gap-lg-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
        <div className="col-lg-12 ps-lg-0">
          <div className="row h-100">
            <div className="col-12">
              <div className="row gx-0 bg-white rounded content-area scroll-custom scroll-agent-height">
                <div id="headerVoice" className="d-none d-lg-block">
                  {/* <!-- voice library header starts--> */}
                  <div className="col-lg-12">
                    <div className="bg-white rounded p-23px w-100">
                      <div className="row align-items-center">
                        <div className="col-lg-12 col-sm-12">
                          <div className="d-flex gap-2 align-items-start">
                            <Link
                              to="/comm-voice-admin/agent-availability/"
                              className="d-block d-lg-none"
                            >
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </Link>
                            <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                              <Link
                                to="/comm-voice-admin/agent-availability/"
                                className="d-flex justify-content-center"
                              >
                                <img src="/assets/leftback.svg" alt="" />
                              </Link>
                            </div>
                            <div className="d-flex flex-column">
                              <h4 className="fs-16px text-black fw-medium">New Agent Time Slot</h4>
                              <div className="text-secondary fs-13px mb-0">
                                Create new time slot of the agents with working hours and holidays
                                for this year
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="headerVoiceMob" className="d-block d-lg-none">
                  {/* <!-- new agent header starts--> */}
                  <div className="col-lg-12">
                    <div className="bg-white rounded p-23px w-100">
                      <div className="row align-items-center">
                        <div className="col-lg-12 col-sm-12">
                          <div className="d-flex gap-2 align-items-start">
                            <Link
                              id="voiceHeaderMainMob"
                              to="/comm-voice-admin/agent-availability/"
                            >
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </Link>
                            <a id="voiceHeaderMob" href="/#" className="d-none">
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </a>
                            <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                              <Link
                                to="/comm-voice-admin/agent-availability/"
                                className="d-flex justify-content-center"
                              >
                                <img src="/assets/leftback.svg" alt="" />
                              </Link>
                            </div>
                            <div className="d-flex flex-column">
                              <h4 className="fs-16px text-black fw-medium">New Agent Time Slot</h4>
                              <div className="text-secondary fs-13px mb-0">
                                Create new time slot of the agents with working hours and holidays
                                for this year
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- new agent header ends--> */}
                {/* <!-- agent time slot starts --> */}
                <div className="col-lg-5 col-sm-12 right-sec-voice ms-0 ms-lg-5">
                  <div className="bg-tranparent rounded-top border-0 fs-13px pb-3 pe-xl-4 pb-xl-4 py-0 px-2">
                    <div className="p-3 gap-23px py-1 px-4">
                      <div className="row">
                        <div className="col-12">
                          <Input
                            label="Slot Name"
                            id="slot"
                            class="fs-13px"
                            placeholder="Enter time slot"
                            type="text"
                            name="slotName"
                            onChange={formik.handleChange}
                            value={formik.values.slotName}
                            style={
                              isFormFieldValid(formik, 'slotName')
                                ? { border: '1px solid red', borderRadius: '8px' }
                                : { border: '' }
                            }
                          />
                          <span style={{ color: 'red' }}>
                            {getFormErrorMessage(formik, 'slotName')}
                          </span>
                        </div>
                        <div className="col-12">
                          <div className="form-group mt-3">
                            <label className="text-primary mb-1" htmlFor="timeZone">
                              Time zone
                            </label>
                            <select
                              className="form-control form-select bg-white"
                              id="timeZone"
                              name="timeZone"
                              value={formik.values.timeZone}
                              onChange={formik.handleChange}
                              style={
                                isFormFieldValid(formik, 'timeZone')
                                  ? { border: '1px solid red', borderRadius: '8px' }
                                  : { border: '' }
                              }
                            >
                              <option value="select" disabled>
                                select{' '}
                              </option>
                              {timezones.map((e, index) => (
                                <option key={index} value={e.timezone}>
                                  {`(${e.offset}) ${e.timezone}`}
                                </option>
                              ))}
                            </select>
                          </div>
                          <span style={{ color: 'red' }}>
                            {getFormErrorMessage(formik, 'timeZone')}
                          </span>
                        </div>
                        <div className="col-12 mt-3">
                          <label className="text-primary mb-2">Description</label>
                          <textarea
                            rows="4"
                            className="form-control bg-white"
                            name="description"
                            placeholder="Enter Description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            style={
                              isFormFieldValid(formik, 'description')
                                ? { border: '1px solid red', borderRadius: '8px' }
                                : { border: '' }
                            }
                          />
                          <span style={{ color: 'red' }}>
                            {getFormErrorMessage(formik, 'description')}
                          </span>
                        </div>
                        <div className="mt-5 d-flex justify-content-start align-items-center">
                          <button
                            id="newAgentTimeSlot"
                            type="button"
                            className="btn bg-black d-flex align-items-center text-white px-4 py-12px"
                            onClick={async () => {
                              await setShow({
                                type: 'agent-timeslot',
                              });
                              formik.handleSubmit();
                            }}
                            disabled={isLoading || !isDisable}
                          >
                            {isLoading ? 'Loading...' : 'Save'}
                          </button>
                          {/* <Link to="/comm-voice-admin/agent-availability/"> */}{' '}
                          <ButtonWhiteModalCancel
                            onClick={() => {
                              formik.resetForm();
                            }}
                            text="Cancel"
                          />
                          {/* </Link> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- categories ends --> */}
                {/* <!--.col-3--> */}

                {/* <!-- holiday starts --> */}

                <div className="col-lg-6 ms-0 ms-lg-5">
                  <div className="scroll-custom scroll-holiday carrier-pad">
                    <div className="panel-center bg-white rounded shadow-6 mt-4 mb-5">
                      <div className="p-4 pt-2">
                        {/* <!-- tab starts --> */}
                        <div className="nav-setting mt-lg-2 mt-0">
                          <ul
                            className="nav nav-setting-tab nav-tabs d-flex flex-wrap mb-0 list-unstyled"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <a
                                href="/#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setActiveTab({ type: 'holidays' });
                                }}
                                className={`nav-setting-link nav-link nav-agent-holiday ${
                                  activeTab.type === 'holidays' ? 'active' : ''
                                }`}
                                id="holiday-tab"
                                // data-bs-toggle="tab"
                                // data-bs-target="#holidays"
                                type="button"
                                role="tab"
                                aria-controls="holiday"
                                aria-selected="true"
                              >
                                <span className="ms-25px"> Holidays</span>
                              </a>
                            </li>
                            <li className="nav-item" role="presentation">
                              <a
                                href="/#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setActiveTab({ type: 'working-hours' });
                                }}
                                className={`nav-setting-link nav-link nav-agent-work ${
                                  activeTab.type === 'working-hours' ? 'active' : ''
                                }`}
                                id="work-tab"
                                // data-bs-toggle="tab"
                                // data-bs-target="#workingHours"
                                type="button"
                                role="tab"
                                aria-controls="work"
                                aria-selected="false"
                              >
                                <span className="ms-25px"> Working Hours</span>
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content mb-3" id="myTabContent">
                            <div
                              className={`tab-pane fade active ${
                                activeTab.type === 'holidays' ? 'show' : ''
                              }`}
                              style={
                                activeTab.type === 'holidays'
                                  ? { display: 'block' }
                                  : { display: 'none' }
                              }
                              id="holidays"
                              role="tabpanel"
                              aria-labelledby="holiday-tab"
                            >
                              <div className="mt-3 p-2">
                                <div className="d-flex flex-wrap align-items-center gap-4 mb-3">
                                  <div>
                                    <SearchWithBorder
                                      placeholderText="Search"
                                      onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                      }}
                                      clearBtn={() => {
                                        setSearchTerm('');
                                      }}
                                    />
                                  </div>
                                  <div className="d-flex align-items-center gap-1">
                                    <div>
                                      <p className="mb-0 text-secondary">Month:</p>
                                    </div>
                                    <div>
                                      <select
                                        className="form-control border-0 form-select bg-white"
                                        id="month"
                                        value={selectedMonth}
                                        onChange={(e) => {
                                          setSelectedMonth(e.target.value);
                                        }}
                                      >
                                        <option value="">All Month</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                        <option value="4">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="ms-none ms-md-auto">
                                    <button
                                      // data-bs-toggle="modal"
                                      // data-bs-target="#addHoliday"
                                      type="button"
                                      className="btn bg-black d-flex align-items-center text-white  px-3 py-12px newCarrier"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setShow({
                                          isVisible: true,
                                          type: 'add-holiday-modal',
                                        });
                                        formik.setFieldValue('holidayName', '');
                                        formik.setFieldValue('holidayDate', '');
                                        formik.setFieldError('holidayName', '');
                                        formik.setFieldError('holidayDate', '');
                                      }}
                                      disabled={isDisable}
                                    >
                                      Add Holiday
                                    </button>
                                  </div>
                                </div>
                                <div>
                                  {allHolidays?.isLoading && (
                                    <div
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <div>
                                        <SpinningLoader />
                                      </div>
                                    </div>
                                  )}
                                  {allHolidays?.data?.length > 0 &&
                                    allHolidays?.data?.map((item, index) => (
                                      <Holidays
                                        day={item.attributes?.date}
                                        holiday={item?.attributes?.name}
                                        key={index}
                                        setShow={setShow}
                                        id={item?.id}
                                        formik={formik}
                                      />
                                    ))}
                                  {allHolidays?.data?.length === 0 &&
                                  allHolidays?.isLoading === false ? (
                                    <NoMatchingRecords />
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            <div
                              className={`tab-pane fade active ${
                                activeTab.type === 'working-hours' ? 'show' : ''
                              }`}
                              style={
                                activeTab.type === 'working-hours'
                                  ? { display: 'block' }
                                  : { display: 'none' }
                              }
                              id="workingHours"
                              role="tabpanel"
                              aria-labelledby="work-tab"
                            >
                              <div className="mt-4">
                                <p className="mb-0 text-primary mb-3">
                                  Select working days and Agent Working Hours for the selected days
                                </p>
                                {/* <!-- time slot row starts --> */}
                                {allWorkingHours?.isLoading ? (
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <div>
                                      <SpinningLoader />
                                    </div>
                                  </div>
                                ) : (
                                  workingHoursArray?.map((item, index) => {
                                    return (
                                      <WorkingHours
                                        dayName={item.day}
                                        key={index}
                                        isEnabled={
                                          getMatchingWorkingHours(allWorkingHours?.data, item.day)
                                            ?.attributes.is_enabled
                                        }
                                        timeSlots={
                                          getMatchingWorkingHours(allWorkingHours?.data, item.day)
                                            ?.relationships?.slots?.data
                                        }
                                        id={
                                          getMatchingWorkingHours(allWorkingHours?.data, item.day)
                                            ?.id
                                        }
                                        setShow={setShow}
                                        allWorkingHours={allWorkingHours}
                                        normalizedTimeSlots={normalizedTimeSlots}
                                        formik={formik}
                                        getMatchingWorkingHours={getMatchingWorkingHours}
                                        isDisable={isDisable}
                                        handleApplyToAll={handleApplyToAll}
                                      />
                                    );
                                  })
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <!-- tab ends --> */}
                      </div>
                    </div>
                  </div>
                  {/* <!-- pagination end --> */}
                </div>
                {/* <!-- All caller  ends --> */}
              </div>
            </div>
            {/* <!--.col--9--> */}
          </div>
        </div>
      </div>

      <AddHolidayModal
        show={show.isVisible && show.type === 'add-holiday-modal'}
        setShow={setShow}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        agentName={show?.agentName}
        actionKey="delete"
        formik={formik}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        isProcessing={isLoading}
      />
      <EditHolidayModal
        show={show.isVisible && show.type === 'edit-holiday-modal'}
        setShow={setShow}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        agentName={show?.agentName}
        actionKey="delete"
        formik={formik}
        setSelectedDate={setSelectedDate}
        isProcessing={isLoading}
      />

      <DeleteTimeSlotModal
        show={
          (show.isDeleteVisible && show.deleteType === 'set-delete-timeslot-modal') ||
          show.deleteType === 'edit-delete-timeslot-modal'
        }
        actionKey="delete"
        action={handleDeleteSetTimeSlot}
        title={show?.agentName}
        timeSlotName={show?.timeSlotName}
        handleOnClose={handleOnClose}
      />
      <DeleteHolidayModal
        show={show.isVisible && show.type === 'delete-holiday-modal'}
        setShow={setShow}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        holidayName={show?.holidayName}
        actionKey="delete"
        handleAction={handleDeleteHoliday}
        isProcessing={isLoading}
      />
      <DisableTimeSlotModal
        show={show.isVisible && show.type === 'disable-time-slot'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        actionKey="disable"
        action={handleDisableTimeSlot}
        isProcessing={isLoading}
      />
      <EnableTimeSlotModal
        show={show.isVisible && show.type === 'enable-time-slot'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        actionKey="enable"
        action={handleEnableTimeSlot}
        isProcessing={isLoading}
      />
      <SetTimeSlotOffcanvas
        show={show?.isVisible && show?.type === 'set-time-slot-offcanvas'}
        setShow={setShow}
        dayName={show?.day}
        isProcessing={isLoading}
        formik={formik}
        addNewSlot={addNewSlot}
        updateSlot={updateSlot}
        handleApplyToAll={handleApplyToAllOffcanvas}
      />
      <EditTimeSlotOffcanvas
        show={show?.isVisible && show?.type === 'edit-time-slot-offcanvas'}
        setShow={setShow}
        dayName={show?.day}
        formik={formik}
        addNewSlot={addNewSlot}
        updateSlot={updateSlot}
        isProcessing={isLoading}
        id={show?.dayId}
        action={handleClearAll}
        handleApplyToAll={handleApplyToAllOffcanvas}
      />
      <ApplyToAllTimeSlotModal
        show={
          (show.isVisible && show.type === 'apply-to-all') ||
          (show.isApplyVisible && show.applytype === 'apply-to-all-offcanvas')
        }
        onClose={() => {
          if (show.type === 'apply-to-all') {
            setShow({ isVisible: false, type: '' });
          }
          if (show.type === 'edit-time-slot-offcanvas') {
            setShow({
              isApplyVisible: false,
              applytype: '',
              type: 'edit-time-slot-offcanvas',
              isVisible: true,
              day: show?.day,
              dayId: show?.dayId,
            });
          }
          if (show.type === 'set-time-slot-offcanvas') {
            setShow({
              isApplyVisible: false,
              applytype: '',
              type: 'set-time-slot-offcanvas',
              isVisible: true,
              day: show?.day,
            });
          }
        }}
        actionKey="apply"
        action={show.type === 'apply-to-all' ? handleApplyToAll : handleApplyToAllOffcanvas}
        isProcessing={isLoading}
      />
      {toastAction.type === 'success' ? (
        <ToastSuccess
          id="publishToastMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
        >
          <span>{toastAction?.message}</span>
        </ToastSuccess>
      ) : (
        <ToastError
          id="publishToastMsg"
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

export default AgentTimeSlot;
