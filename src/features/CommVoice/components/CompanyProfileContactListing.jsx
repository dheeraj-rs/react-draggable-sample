/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import UserListRow from './UserListRow';

import UserListRowMobile from './UserListRowMobile';
import AddButton from './AddButton';
import ImportButton from './ImportButton';
import ExportButton from './ExportButton';
import MoreOptions from './MoreOptions';
import { DeleteContacts, ListContacts } from '../../../common/api-collection/Contact';
import AddContactCanvas from './AddContactCanvas';
import EditContactCanvas from './EditContactCanvas';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import DeleteModal from '../../../common/components/modals/DeleteModal';
import Pagination from './pagination/Pagination';

function CompanyProfileContactListing({
  companyId,
  setIsConnectingDIDCall,
  setIsConnecting,
  companyName,
}) {
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [query, setQuery] = useState('');
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const [showEditContact, setShowEditContact] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState();
  const [showCreateContact, setShowCreateContact] = useState(false);
  const [reload, setReload] = useState(0);
  const handleReload = () => setReload(Math.floor(Math.random() * 1000));
  const [includes, setIncludes] = useState();
  const [completeContacts, setCompeteContacts] = useState();
  const [contacts, setContacts] = useState();
  const [selectedIds, setSelectedIds] = useState([]);
  const [contactMeta, setContactMeta] = useState();

  const [page, setPage] = useState();

  const ExcelJS = require('exceljs');

  const handlePaginationFunction = (data) => {
    setPage(data);
  };

  const listContacts = () => {
    ListContacts(query, companyId).then((res) => {
      setContacts(res.data);
      setContactMeta(res.meta);
      setCompeteContacts(res);
      setIncludes(res.included);
    });
  };

  const deleteSelectedContacts = () => {
    let data = { data: [] };
    const newData = selectedIds.map((id) => ({
      type: 'contact',
      id,
    }));

    data = { data: [...data.data, ...newData] };
    DeleteContacts(data)
      .then(() => {
        listContacts();
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Contacts deleted successfully!',
        });
      })
      .catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while deleting contacts!',
        });
      })
      .finally(() => {});
  };

  const setAction = (id, showCanvas) => {
    switch (showCanvas) {
      case 'addContact':
        setShowCreateContact(true);
        break;
      case 'editContact':
        setSelectedContactId(id);
        setShowEditContact(true);
        break;
      case 'deleteContact':
        setSelectedContactId(id);
        setShowDelete(true);
        break;
      default:
        break;
    }
  };

  function downloadExcelFile(workbook, filename) {
    // Convert the workbook to a buffer
    workbook.xlsx.writeBuffer().then((buffer) => {
      // Create a Blob from the buffer
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;

      // Append the link to the document body and click it
      document.body.appendChild(link);
      link.click();

      // Clean up the temporary link and URL object
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  function exportToExcel(data) {
    // Create a new workbook and sheet
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Contacts');

    // Define the column headers
    sheet.columns = [
      { header: 'Index', key: 'index', width: 10 },
      { header: 'First Name', key: 'firstName', width: 20 },
      { header: 'Last Name', key: 'lastName', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Phone Numbers', key: 'phoneNumbers', width: 30 },
    ];

    // Add the data rows
    data.data.forEach((contact, index) => {
      const firstName = contact.attributes.first_name;
      const lastName = contact.attributes.last_name;

      let emails = '';
      let phoneNumbers = '';

      // Retrieve emails and phone numbers
      if (contact.relationships.emails && contact.relationships.emails.data.length > 0) {
        const emailIds = contact.relationships.emails.data.map((email) => email.id);
        const emailAttributes = data.included
          .filter((item) => item.type === 'emails' && emailIds.includes(item.id))
          .map((email) => email.attributes.email);
        emails = emailAttributes.join(', ');
      }

      if (contact.relationships.phones && contact.relationships.phones.data.length > 0) {
        const phoneIds = contact.relationships.phones.data.map((phone) => phone.id);
        const phoneAttributes = data.included
          .filter((item) => item.type === 'phones' && phoneIds.includes(item.id))
          .map((phone) => phone.attributes.phone);
        phoneNumbers = phoneAttributes.join(', ');
      }

      sheet.addRow({
        index: index + 1,
        firstName,
        lastName,
        email: emails,
        phoneNumbers,
      });
    });

    // Download the workbook as an Excel file
    downloadExcelFile(workbook, 'contacts.xlsx');
  }

  function downloadCSVFile(data, filename) {
    // Convert the data to CSV format using PapaParse
    const csv = Papa.unparse(data, {
      header: true, // Include headers in the CSV file
    });

    // Create a Blob from the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    // Append the link to the document body and click it
    document.body.appendChild(link);
    link.click();

    // Clean up the temporary link and URL object
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function exportToCSV(data, ids) {
    // Create an array to store the CSV rows
    const csvData = [];

    // Add the header row
    csvData.push(['Index', 'First Name', 'Last Name', 'Email', 'Phone Numbers']);

    // Filter the data based on selected IDs
    const selectedContacts = data.data.filter((contact) => ids.includes(contact.id));

    // Add the selected data rows
    selectedContacts.forEach((contact, index) => {
      const firstName = contact.attributes.first_name;
      const lastName = contact.attributes.last_name;

      let emails = '';
      let phoneNumbers = '';

      // Retrieve emails and phone numbers
      if (contact.relationships.emails && contact.relationships.emails.data.length > 0) {
        const emailIds = contact.relationships.emails.data.map((email) => email.id);
        const emailAttributes = data.included
          .filter((item) => item.type === 'emails' && emailIds.includes(item.id))
          .map((email) => email.attributes.email);
        emails = emailAttributes.join(', ');
      }

      if (contact.relationships.phones && contact.relationships.phones.data.length > 0) {
        const phoneIds = contact.relationships.phones.data.map((phone) => phone.id);
        const phoneAttributes = data.included
          .filter((item) => item.type === 'phones' && phoneIds.includes(item.id))
          .map((phone) => phone.attributes.phone);
        phoneNumbers = phoneAttributes.join(', ');
      }

      csvData.push([index + 1, firstName, lastName, emails, phoneNumbers]);
    });

    // Download the CSV file
    downloadCSVFile(csvData, 'selected_contacts.csv');
  }

  useEffect(() => {
    if (isAllSelected) {
      setSelectedIds(contacts?.map((user) => user.id));
    } else {
      setSelectedIds([]);
    }
  }, [isAllSelected]);

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

  useEffect(() => {
    listContacts();
  }, [query, reload]);

  return (
    <div id="chat-expand" className="col-lg-10 mx-auto">
      <div className="panel-center bg-white rounded-bottom">
        <div className="p-23px pt-0 user-list-company scroll-custom">
          <div className="response-search">
            <div className="d-flex align-items-center">
              <div className="pe-3">
                <p className="text-primary fw-medium fs-14px mb-0 ">{companyName}</p>
              </div>
              <div>
                <p className="text-primary fs-12px mb-0 ms-4 ms-lg-0">
                  <span className="fw-medium">{contacts?.length}</span> Contacts available
                </p>
              </div>
            </div>
            <div className="row align-items-center mt-4 mb-4">
              <div className="col-lg-3 col-sm-12">
                <div>
                  <SearchWithBorder
                    placeholderText="Search by name,number"
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                    searchTerm={query}
                    clearBtn={() => {
                      setQuery('');
                    }}
                  />
                </div>
              </div>

              <div className="col-lg-4 col-sm-12">
                <div className="check-box mt-3 mt-lg-0">
                  <input
                    type="checkbox"
                    id="selectAll"
                    onChange={(e) => {
                      setIsAllSelected(e.target.checked);
                    }}
                  />
                  <label className="text-primary select-deselect mb-0" htmlFor="selectAll">
                    Select/deselect all
                  </label>
                </div>
              </div>
              <div className="col-lg-5 col-sm-12">
                <div className=" d-flex align-items-center gap-2 float-start float-lg-end mt-3 mt-lg-0">
                  <AddButton
                    updateAction={() => {
                      setShowCreateContact(true);
                    }}
                  />
                  <ImportButton />
                  <ExportButton />
                  <MoreOptions
                    onDelete={() => {
                      if (selectedIds.length !== 0) {
                        setShowDelete(true);
                      }
                    }}
                    exportData={(type) => {
                      switch (type) {
                        case 'excel':
                          exportToExcel(completeContacts);
                          break;
                        case 'excelselected':
                          exportToExcel(completeContacts);
                          break;
                        case 'doc':
                          // exportToWord(completeContacts);
                          break;
                        case 'csvSelected':
                          exportToCSV(completeContacts, selectedIds);
                          break;

                        default:
                          break;
                      }
                    }}
                  />{' '}
                  <DeleteModal
                    isOpen={showDelete}
                    onClose={() => {
                      setShowDelete(false);
                    }}
                    callBack={() => {
                      deleteSelectedContacts();
                      setShowDelete(false);
                    }}
                    text=" the selected contacts from the list."
                    label="To confirm this action please type "
                    action="“Delete”"
                    // isDeleting={isDeleting}
                    setShowDeleteModal={showDelete}
                    btnLabel="Delete"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <!-- table section starts --> */}
          {/* <!-- web view starts --> */}
          <div className="d-none d-lg-block">
            {/* <!-- table row starts --> */}

            <AddContactCanvas
              show={showCreateContact}
              setToastAction={setToastAction}
              onClose={() => {
                setShowCreateContact(false);
              }}
              reloadList={() => handleReload()}
              companyId={companyId}
            />

            <EditContactCanvas
              show={showEditContact}
              setToastAction={(toast) => {
                setToastAction(toast);
              }}
              id={selectedContactId}
              onClose={() => {
                setShowEditContact(false);
              }}
            />

            {contacts?.map((user) => (
              <UserListRow
                key={user.id}
                id={user.id}
                phones={getphones(user?.relationships.phones.data)}
                emails={includes
                  ?.filter((obj) => obj.type === 'emails')
                  .map((obj) => obj.attributes)}
                name={user.attributes.display_name}
                org={user.org}
                // email={user.relationships.emails[0].id}
                // mob={user.relationships.phones[0].id}
                email={includes.find((obj) => obj.type === 'emails')?.attributes?.email}
                mob={includes.find((obj) => obj.type === 'phones')?.attributes?.phone}
                isAllSelected={!!selectedIds?.includes(user.id)}
                setIsConnectingDIDCall={(e) => setIsConnectingDIDCall(e)}
                setIsConnecting={(e) => setIsConnecting(e)}
                updateAction={setAction}
                onSelect={(id, selected) => {
                  setSelectedIds((prevIds) => {
                    if (selected) {
                      return [...prevIds, id];
                    }
                    return prevIds.filter((selectedId) => selectedId !== id);
                  });
                }}
              />
            ))}
            {/* <!-- table row ends --> */}
          </div>
          {/* <!-- web view end --> */}
          {/* <!-- mobile view starts --> */}
          <div className="d-block d-md-none">
            {/* <!-- table row starts --> */}
            {contacts?.map((user) => (
              // eslint-disable-next-line max-len
              <UserListRowMobile
                key={user.id}
                id={user.id}
                name={user.attributes.display_name}
                org={user.org}
                // email={user.relationships.emails[0].id}
                // mob={user.relationships.phones[0].id}
                isAllSelected={isAllSelected}
                setIsConnectingDIDCall={(e) => setIsConnectingDIDCall(e)}
                setIsConnecting={(e) => setIsConnecting(e)}
                updateAction={setAction}
              />
            ))}
            {/* <!-- table row ends --> */}
          </div>
          {/* <!-- mobile view end --> */}

          <Pagination
            handlePagination={handlePaginationFunction}
            currentPage={contactMeta?.pagination.current_page}
            totalPages={contactMeta?.pagination.total_pages}
            total={contactMeta?.pagination.total}
            count={contactMeta?.pagination.count}
          />

          {/* <!-- table section ends --> */}
        </div>
      </div>
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
    </div>
  );
}

export default CompanyProfileContactListing;
