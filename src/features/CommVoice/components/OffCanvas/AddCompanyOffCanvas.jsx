/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Input from '../../../../common/components/forms/Input';
import Select2 from '../../../../common/components/forms/Select2';
import { AddDepartment } from '../../../../common/api-collection/Department';
import { ListActiveAgents } from '../../../../common/api-collection/AgentManagemant';
import { getFormErrorMessage, isFormFieldValid } from '../../../../common/helpers/utils';

function AddCompanyOffCanvas({ show, onClose, reloadList, setToastAction }) {
  const [agents, setAgents] = useState();
  const [selectedAgents, setSelectedAgents] = useState();

  const listAgents = () => {
    ListActiveAgents().then((res) => {
      setAgents(res?.data);
    });
  };

  const getAgentIdsByName = () => {
    const agentIds = [];
    for (const agent of agents) {
      if (selectedAgents?.includes(agent.attributes.first_name)) {
        agentIds.push(parseInt(agent.id, Number));
      }
    }
    return agentIds;
  };

  const validate = (data) => {
    const errors = {};

    if (!data.departmentname) {
      errors.departmentname = 'department name is required';
    }

    if (!data.extension) {
      errors.extension = 'extension is required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      departmentname: '',
      extension: '',
    },
    validate,
    onSubmit: () => {
      // setIsProfileUpdating(true);
      const ids = getAgentIdsByName();

      const data = {
        type: 'departments',
        attributes: {
          name: formik?.values?.departmentname,
          extension: parseInt(formik?.values?.extension, Number),
        },
        relationships: {
          agents: {
            data: [
              ...ids.map((id) => ({
                type: 'agents',
                id,
              })),
            ],
          },
        },
      };

      AddDepartment(data)
        .then(() => {
          formik.setFieldValue('departmentname', '');
          formik.setFieldValue('extension', '');

          onClose();
          reloadList();
          setToastAction({
            isVisible: true,
            type: 'success',
            message: 'Department details saved successfully!',
          });
        })
        .catch((error) => {
          reloadList();
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Error while updating Profile details!',
          });
        })
        .finally(() => {
          // setIsProfileUpdating(false);
        });
    },
  });

  useEffect(() => {
    listAgents();
  }, []);

  if (show) {
    return (
      <>
        <div
          className="offcanvas offcanvas-end show"
          tabIndex="-1"
          id="offcanvasAddCompany"
          aria-labelledby="offcanvasAddCompanyLabel"
        >
          <div className="offcanvas-header px-4 pt-4 pb-2">
            <h5 className="offcanvas-title fs-16px fw-medium" id="offcanvasAddCompanyLabel">
              Add Department
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              onClick={() => {
                onClose();
              }}
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body px-4">
            <p className="fs-13px text-secondary">
              Add more departments and organize your contacts more efficiently.
            </p>

            <div className="mt-4">
              <Input
                label="Department name"
                id="departmentname"
                placeholder="High-tech pvt. ltd."
                type="textbox"
                disabled={false}
                name="departmentname"
                onChange={formik.handleChange}
                value={formik?.values?.departmentname}
                style={
                  isFormFieldValid(formik, 'departmentname') ? { border: '1px solid red' } : {}
                }
              />
              {getFormErrorMessage(formik, 'departmentname')}

              <Input
                label="Extension"
                id="departmentExtension"
                placeholder="1234"
                type="textbox"
                disabled={false}
                name="extension"
                onChange={formik.handleChange}
                value={formik?.values?.extension}
                style={isFormFieldValid(formik, 'extension') ? { border: '1px solid red' } : {}}
              />
              {getFormErrorMessage(formik, 'extension')}

              <div className="d-flex justify-content-between">
                <label className="mb-1">Add agents to the department (Optional) </label>
              </div>
              <Select2
                show
                label="Add agents to the department (Optional)"
                name="departments"
                options={agents?.map((item) => item.attributes.first_name)}
                onSelect={(name) => {
                  setSelectedAgents(name);
                }}
                onRemove={(name) => {
                  setSelectedAgents(name);
                }}
              />
            </div>

            <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-5">
              <button
                type="button"
                className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                data-bs-dismiss="offcanvas"
                onClick={(e) => {
                  e.preventDefault();
                  // getDepartmentIdsByName();
                  formik.handleSubmit();
                }}
              >
                Add Department
              </button>
              <button
                type="button"
                className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                data-bs-dismiss="offcanvas"
                onClick={() => {
                  onClose();
                }}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
        <div
          className="modal-backdrop show"
          onClick={() => {
            onClose();
          }}
        />
      </>
    );
  }
  return '';
}

export default AddCompanyOffCanvas;
