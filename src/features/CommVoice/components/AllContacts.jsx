/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import UserListRow from './UserListRow';
import UserListRowMobile from './UserListRowMobile';
import Pagination from './pagination/Pagination';
import { ChangePrimaryNumber } from '../../../common/api-collection/Contact';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import { ListContactCompanies } from '../../../common/api-collection/ContactCompany';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';

function AllContacts({
  userLIstData,
  setIsConnecting,
  setIsConnectingDIDCall,
  updateAction,
  handlePaginationFunction,
  currentPage,
  totalPages,
  total,
  count,
  includes,
  allSelected,
  onSelectionChange,
  handleReload,
  reload,
  normalizedContacts,
  isLoading,
  setSelectedNames,
  setShow,
  editData,
  setEditData,
  onCall,
}) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [companies, setcompanies] = useState();
  const listCompanies = () => {
    ListContactCompanies()
      .then((response) => {
        setcompanies(response?.data);
      })
      .catch(() => {})
      .finally(() => {});
  };
  const getCompanyName = (companiesArray, companyId) => {
    return companiesArray?.find((company) => parseInt(company.id, 10) === parseInt(companyId, 10))
      ?.attributes?.name;
  };
  useEffect(() => {
    listCompanies();
  }, [reload]);
  useEffect(() => {
    if (allSelected) {
      setSelectedIds(userLIstData?.map((user) => user.id));
      setSelectedNames(userLIstData?.map((user) => user?.attributes?.display_name));
    } else {
      setSelectedIds([]);
      setSelectedNames([]);
    }
  }, [allSelected]);

  useEffect(() => {
    onSelectionChange(selectedIds);
  }, [selectedIds]);

  const getphones = (data) => {
    const ids = data?.map((item) => item.id);
    const phonesData = ids?.map((id) => {
      const phoneAttributes = includes.find(
        (include) => include.type === 'phones' && include.id === id
      )?.attributes;
      return {
        contactid: id,
        ...phoneAttributes,
      };
    });
    return phonesData;
  };
  const getemails = (data) => {
    const ids = data?.map((item) => item.id);
    const emailsData = ids?.map((id) => {
      const emailAttributes = includes.find(
        (include) => include.type === 'emails' && include.id === id
      )?.attributes;
      return {
        contactid: id,
        ...emailAttributes,
      };
    });
    return emailsData;
  };

  const changePrimaryNumber = (contactId, numberId) => {
    const data = {
      type: 'contacts',
      id: parseInt(contactId, Number),
      relationships: {
        contact_phones: {
          data: {
            type: 'contact_phone',
            id: parseInt(numberId, Number),
            attributes: {
              is_primary: true,
            },
          },
        },
      },
    };
    ChangePrimaryNumber(contactId, data)
      .then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Agent Updated',
        });
      })
      .catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while updating Agent!',
        });
      })
      .finally(() => {
        handleReload();
      });
  };

  return (
    <>
      {/* <!-- table section starts --> */}
      {/* <!-- web view starts --> */}
      <div className="d-none d-lg-block">
        {/* <!-- table row starts --> */}
        {isLoading ? (
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
          userLIstData?.map((user, index) => (
            <UserListRow
              name={user.attributes.display_name}
              firstName={user.attributes.first_name}
              lastName={user.attributes.last_name}
              middleName={user.attributes.middle_name}
              id={user.id}
              // hanldeCallingApi={hanldeCallingApi}
              phones={getphones(user?.relationships.phones.data)}
              emails={includes?.filter((obj) => obj.type === 'emails').map((obj) => obj.attributes)}
              updateAction={updateAction}
              onSelect={(id, selected) => {
                setSelectedIds((prevIds) => {
                  if (selected) {
                    return [...prevIds, id];
                  }
                  return prevIds.filter((selectedId) => selectedId !== id);
                });
              }}
              // eslint-disable-next-line no-unneeded-ternary
              isAllSelected={selectedIds?.includes(user.id) ? true : false}
              org={getCompanyName(companies, user.attributes.company_id)}
              companyId={user.attributes.company_id}
              email={includes.find((obj) => obj.type === 'emails')?.attributes?.email}
              email2={
                user?.relationships?.emails?.data?.map(
                  (emailData) => normalizedContacts?.emails[emailData.id]?.attributes?.email
                )[0]
              }
              emailsArray={getemails(user?.relationships.emails.data)}
              mob={includes.find((obj) => obj.type === 'phones')?.attributes?.phone}
              mob2={
                user?.relationships?.phones?.data
                  .map((phoneDataId) => normalizedContacts?.phones[phoneDataId.id])
                  .find((phoneData) => phoneData?.attributes.isPrimary)?.attributes?.phone
              }
              key={index}
              numberList={user.relationships.phones.data}
              setIsConnectingDIDCall={setIsConnectingDIDCall}
              setIsConnecting={setIsConnecting}
              changePrimary={(contactId, numberId, action) => {
                if (action) {
                  changePrimaryNumber(contactId, numberId);
                }
              }}
              setSelectedNames={(name, selected) => {
                setSelectedNames((prevName) => {
                  if (selected) {
                    return [...prevName, name];
                  }
                  return prevName.filter((selectedId) => selectedId !== name);
                });
              }}
              setShow={setShow}
              editData={editData}
              setEditData={setEditData}
              onCall={() => {
                onCall();
              }}
            />
          ))
        )}

        {/* <!-- table row ends --> */}
      </div>
      {/* <!-- web view end --> */}
      {/* <!-- mobile view starts --> */}
      <div className="d-block d-lg-none">
        {/* <!-- table row starts --> */}
        {isLoading ? (
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
          userLIstData?.map((user, index) => (
            <UserListRowMobile
              name={user.attributes.display_name}
              phones={getphones(user?.relationships.phones.data)}
              emails={includes?.filter((obj) => obj.type === 'emails').map((obj) => obj.attributes)}
              id={user.id}
              updateAction={updateAction}
              org={getCompanyName(companies, user.attributes.company_id)}
              key={index}
              email2={
                user?.relationships?.emails?.data?.map(
                  (emailData) => normalizedContacts?.emails[emailData.id]?.attributes?.email
                )[0]
              }
              mob2={
                user?.relationships?.phones?.data?.map(
                  (phoneData) => normalizedContacts?.phones[phoneData.id]?.attributes?.phone
                )[0]
              }
              firstName={user.attributes.first_name}
              lastName={user.attributes.last_name}
              middleName={user.attributes.middle_name}
              companyId={user.attributes.company_id}
              emailsArray={getemails(user?.relationships.emails.data)}
              setShow={setShow}
              editData={editData}
              setEditData={setEditData}
            />
          ))
        )}

        {/* <!-- table row ends --> */}
      </div>
      {/* <!-- mobile view end --> */}

      {isLoading ? (
        ''
      ) : (
        <Pagination
          handlePagination={handlePaginationFunction}
          currentPage={currentPage}
          totalPages={totalPages}
          total={total}
          count={count}
        />
      )}

      {/* <!-- table section ends --> */}
      {toastAction.type === 'success' ? (
        <ToastSuccess
          id="smsSendButtonMsg"
          onClose={() => {
            setToastAction({ isVisible: false });
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
    </>
  );
}

export default AllContacts;
