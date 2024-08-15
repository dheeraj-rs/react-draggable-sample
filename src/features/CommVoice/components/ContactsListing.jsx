/* eslint-disable max-lines */
/* eslint-disable function-paren-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable global-require */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import normalize from 'json-api-normalizer';
import Papa from 'papaparse';
import axios from 'axios';

import AllContacts from './AllContacts';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import NoContactsFound from './NoContactsFound';
import AddButton from './AddButton';
import ImportButton from './ImportButton';
import ExportButton from './ExportButton';
import MoreOptions from './MoreOptions';
import { DeleteContacts, ListContacts } from '../../../common/api-collection/Contact';
import DeleteModal from '../../../common/components/modals/DeleteModal';
import { GetCompany } from '../../../common/api-collection/ContactCompany';
import ToastError from '../../../common/components/toast/ToastError';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import { getToken } from '../../../common/helpers/utils';

function ContactsListing({
  setIsConnectingDIDCall,
  setIsConnecting,
  updateAction,
  reload,
  handleReload,
  selectedCompany,
  setShow,
  isMobile,
  setToastAction,
  editData,
  setEditData,
  hanldeCallingApi,
}) {
  // eslint-disable-next-line global-require
  const ExcelJS = require('exceljs');
  const [completeContacts, setCompeteContacts] = useState();
  const [companyName, setCompanyName] = useState('All contacts');
  const [contacts, setContacts] = useState();
  const [contactMeta, setContactMeta] = useState();
  const [includes, setIncludes] = useState();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState();
  const [allSelected, setAllSelected] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selelctedNames, setSelectedNames] = useState([]);

  const [showDelete, setShowDelete] = useState(false);
  // const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [normalizedContacts, setNormalizedContacts] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  const handlePaginationFunction = (data) => {
    setPage(data);
  };

  const listContacts = () => {
    setIsLoading(true);
    ListContacts(query, selectedCompany || '', page, selectedCompany).then((res) => {
      setCompeteContacts(res);
      setContactMeta(res.meta);
      setContacts(res.data);
      setIncludes(res?.included);
      setNormalizedContacts(normalize({ included: res?.included }));
      setIsLoading(false);
    });
  };

  const getCompany = () => {
    GetCompany(selectedCompany).then((res) => {
      setCompanyName(res.data.attributes.name || 'All contacts');
    });
    if (selectedCompany === '') {
      setCompanyName('All contacts');
    }
  };

  const deleteSelectedContacts = () => {
    setIsLoading(true);
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
          message:
            selelctedNames.length > 1
              ? 'Contacts deleted successfully!'
              : `Contact deleted : you have successfully deleted the contact ${selelctedNames[0]}`,
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
      .finally(() => {
        setIsLoading(false);
        setShowDelete(false);
      });
  };

  const selectAllContacts = (e) => {
    setAllSelected(e);
  };

  const onCall = () => {
    const token = getToken();

    const url = 'https://13.200.77.72/?q=make-call';

    const data = {
      id: '100',
      did: {
        number: '917901629519',
        address: '13.234.229.198',
        vendor: 'vodafone',
      },
      endpoint: {
        type: 'pstn',
        number: '919633344744',
      },
      retry: 2,
      action: {
        id: '5d930c06-579d-11ed-9b6a-0242ac120002',
        name: 'connect',
        timeout: 20,
        retry: 2,
        endpoint: {
          type: 'pstn',
          number: '919544744788',
        },
      },
    };

    // const headers = {
    //   Accept: 'application/vnd.api+json',
    //   ContentType: 'application/vnd.api+json',
    //   // ContentLength: JSON.stringify(data).length.toString(),
    //   Authorization: `Bearer ${token}`,
    //   // Host: '13.200.77.72',
    //   // Add other headers as needed
    // };

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      ContentLength: JSON.stringify(data)?.length?.toString(),
      Host: '13.200.77.72',
      // Add other headers as needed
    };

    axios
      .post(url, { data }, { headers })
      .then((response) => {
        console.log('response : ', response);
      })
      .catch((error) => {
        console.log('error : ', error);
      });
  };

  useEffect(() => {
    listContacts();
    if (selectedCompany) {
      getCompany();
    }
  }, [query, page, selectedCompany]);

  useEffect(() => {
    listContacts();
  }, [reload]);

  return (
    <div id="chat-expand" className={isMobile ? 'col-lg-9 d-none' : 'col-lg-9'}>
      <div className="panel-center bg-white rounded-bottom">
        <div className="p-4 pt-2 user-list-contact scroll-custom">
          <div className="response-search">
            <div className="row align-items-center mt-3 mb-3">
              <div className="col-lg-3 col-sm-5">
                <div>
                  <SearchWithBorder
                    placeholderText="Search by name,number"
                    onChange={(e) => {
                      setQuery(e.target.value);
                      // exportContact();
                    }}
                    searchTerm={query}
                    clearBtn={() => {
                      setQuery('');
                    }}
                  />
                </div>
              </div>

              <div className="col-lg-4 col-sm-4">
                <div className="check-box mt-3 mt-lg-0 mt-sm-0">
                  <input
                    type="checkbox"
                    id="selectAll"
                    onChange={(e) => selectAllContacts(e.target.checked)}
                  />
                  <label className="text-primary select-deselect mb-0" htmlFor="selectAll">
                    Select/deselect all
                  </label>
                </div>
              </div>
              <div className="col-lg-5 col-sm-3">
                <div className="d-flex align-items-center gap-2 float-start float-lg-end mt-3 mt-lg-0 mt-sm-0">
                  {/* <!-- add button --> */}
                  <AddButton updateAction={updateAction} />
                  {/* <!-- add button --> */}
                  {/* <!-- import button --> */}
                  <ImportButton setShow={setShow} />
                  {/* <!-- import button --> */}
                  {/* <!-- export button --> */}
                  <ExportButton />
                  {/* <!-- export button --> */}
                  {/* <!-- more button --> */}
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
                    setShow={setShow}
                  />
                </div>
              </div>
            </div>
          </div>
          <DeleteModal
            isOpen={showDelete}
            onClose={() => {
              setShowDelete(false);
            }}
            callBack={() => {
              deleteSelectedContacts();
            }}
            text=" the selected contacts from the list."
            label="To confirm this action please type "
            action="“Delete”"
            setShowDeleteModal={showDelete}
            btnLabel="Delete"
            isDeleting={isLoading}
          />
          {contacts?.length === 0 ? (
            <NoContactsFound />
          ) : (
            <AllContacts
              userLIstData={contacts}
              const
              allSelected={allSelected}
              includes={includes}
              updateAction={updateAction}
              setIsConnecting={setIsConnecting}
              setIsConnectingDIDCall={setIsConnectingDIDCall}
              handlePaginationFunction={handlePaginationFunction}
              currentPage={contactMeta?.pagination.current_page}
              totalPages={contactMeta?.pagination.total_pages}
              total={contactMeta?.pagination.total}
              count={contactMeta?.pagination.count}
              handleReload={handleReload}
              reload={reload}
              onSelectionChange={(ids) => {
                setSelectedIds(ids);
              }}
              normalizedContacts={normalizedContacts}
              isLoading={isLoading}
              setSelectedNames={setSelectedNames}
              setShow={setShow}
              editData={editData}
              setEditData={setEditData}
              onCall={() => {
                onCall();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactsListing;
