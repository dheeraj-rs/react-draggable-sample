import React, { useEffect, useState } from 'react';

function Permission({ title, permissions, havePermissions, changePermission, selectAll }) {
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    if (selectAll.state === 'default') {
      setSelectedPermissions(havePermissions || []);
    }
    if (selectAll.state === 'selectAll' && selectAll.id === title) {
      setSelectedPermissions(
        permissions?.map((item) => {
          changePermission(item?.id, true);
          return parseInt(item.id, Number);
        })
      );
    }
    if (selectAll.state === 'clearAll' && selectAll.id === title) {
      permissions?.map((item) => {
        changePermission(item?.id, false);
        return parseInt(item.id, Number);
      });
      setSelectedPermissions([]);
    }
  }, [selectAll, havePermissions]);

  useEffect(() => {}, [selectedPermissions]);

  return (
    <div className="rounded p-4 mb-3 bg-gray-blue-b">
      <div className="row">
        <div className="col-lg-5">
          <p className="mb-0 fw-500">{title}</p>
        </div>
        <div className="col-lg-7 opacity-50">
          <div className="d-flex gap-4">
            {permissions?.map((permission) => {
              let checked = selectedPermissions?.includes(parseInt(permission?.id, 10));

              return (
                <div>
                  <input
                    type="checkbox"
                    id={permission?.id}
                    // defaultChecked={checked}
                    checked={checked}
                    onChange={(e) => {
                      checked = !checked;
                      setSelectedPermissions((prevSelectedPermissions) => {
                        if (e.target.checked) {
                          return [...prevSelectedPermissions, parseInt(permission?.id, Number)];
                        }
                        return prevSelectedPermissions.filter(
                          (id) => id !== parseInt(permission?.id, Number)
                        );
                      });
                      changePermission(permission?.id, e.target.checked);
                    }}
                    // onClick={(e) => {
                    //   checked = !checked;
                    //   setSelectedPermissions((prevSelectedPermissions) => {
                    //     if (e.target.check) {
                    //       return [...prevSelectedPermissions, permission?.id];
                    //     }
                    //     return prevSelectedPermissions.filter((id) => id !== permission?.id);
                    //   });
                    //   changePermission(permission?.id, e.target.check);
                    // }}
                  />
                  <label className="text-primary mb-0">
                    {permission?.attributes?.is_for_read ? 'Read' : 'Write'}
                  </label>
                </div>
              );
            })}
            {/* <div className="check-box">
              <input type="checkbox" id={writeId} defaultChecked />
              <label className="text-primary mb-0">Write</label>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Permission;
