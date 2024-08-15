/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Select2 from '../../../../common/components/forms/Select2';
import { GetDepartment, UpdateDepartment } from '../../../../common/api-collection/Department';
import { ListActiveAgents } from '../../../../common/api-collection/AgentManagemant';
import { getFormErrorMessage } from '../../../../common/helpers/utils';

function EditDepartmentOffCanvas({ show, onClose, id, reloadList, setToastAction }) {
  const [department, setDepartment] = useState();
  const [, setIsProfileUpdating] = useState(false);
  const [agents, setAgents] = useState();
  const [selectedAgents, setSelectedAgents] = useState();

  useEffect(() => {
    if (id) {
      GetDepartment(id).then((res) => {
        setDepartment(res.data);
      });
    }
  }, [id]);

  const listAgents = () => {
    ListActiveAgents().then((res) => {
      setAgents(res?.data);
    });
  };

  useEffect(() => {
    listAgents();
  }, []);

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

  const getAgentIdsByName = () => {
    const agentIds = [];
    for (const agent of agents) {
      if (selectedAgents?.includes(agent.attributes.first_name)) {
        agentIds.push(parseInt(agent.id, Number));
      }
    }
    return agentIds;
  };

  const formik = useFormik({
    initialValues: {
      departmentname: '',
      extension: '',
    },
    validate,
    onSubmit: () => {
      setIsProfileUpdating(true);
      const ids = getAgentIdsByName();

      const data = {
        type: 'departments',
        id: parseInt(id, Number),
        attributes: {
          name: formik?.values?.departmentname,
          extension: parseInt(formik?.values?.extension, Number),
        },
        relationships: {
          agents: {
            data: [
              ...ids.map((uid) => ({
                type: 'agents',
                uid,
              })),
            ],
          },
        },
      };

      UpdateDepartment(data, id)
        .then(() => {
          formik.setFieldValue('departmentname', '');
          formik.setFieldValue('extension', '');

          onClose();
          reloadList();
          setToastAction({
            isVisible: true,
            type: 'success',
            message: 'Department updated successfully!',
          });
        })
        .catch((error) => {
          reloadList();

          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message ? error?.response?.data?.message : 'Error while updating Profile details!',
          });
        })
        .finally(() => {
          reloadList();

          setIsProfileUpdating(false);
        });
    },
  });

  useEffect(() => {
    formik.setValues({
      departmentname: department?.attributes?.name || '',
      extension: department?.attributes?.extension || '',
    });
  }, [department]);

  if (show) {
    return (
      <>
        <div className="offcanvas offcanvas-end show" tabIndex="-1" id="offcanvasEditDepartment" aria-labelledby="offcanvasEditDepartmentLabel">
          <div className="offcanvas-header px-4 pt-4 pb-2">
            <h5 className="offcanvas-title fs-16px fw-medium" id="offcanvasEditDepartmentLabel">
              Edit Department
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => onClose()} />
          </div>
          <div className="offcanvas-body px-4">
            <p className="fs-13px text-secondary">Modify more departments and organize your agents more efficiently.</p>

            <div className="mt-4">
              <div className="form-group w-100 mt-3">
                <label className="text-primary mb-1 label-mandatory" htmlFor="department">
                  Department name
                </label>
                <input type="text" className="form-control bg-white" id="department" name="departmentname" onChange={formik.handleChange} value={formik?.values?.departmentname} placeholder="Name" />
                {getFormErrorMessage(formik, 'departmentname')}
              </div>

              <div className="form-group w-100 mt-3">
                <label className="text-primary mb-1 label-mandatory" htmlFor="extension">
                  Department Extension
                </label>
                <input type="text" disabled="true" className="form-control" id="extension" onChange={formik.handleChange} name="extension" value={formik?.values?.extension} placeholder="Extension" />
                {getFormErrorMessage(formik, 'extension')}
              </div>
              <div className="form-group mt-3">
                <label className="mb-1">Add agents to the department (Optional)</label>
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
            </div>

            <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-5">
              <a
                href="/"
                id="editDepartment"
                data-bs-dismiss="offcanvas"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
                className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
              >
                <span className="pe-2"> </span>
                Save
              </a>
              <button
                type="button"
                className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                data-bs-dismiss="offcanvas"
                onClick={() => onClose()}
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

export default EditDepartmentOffCanvas;
