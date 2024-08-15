function rearrangeData(jsonData) {
  const { data, included } = jsonData;
  const { id, attributes, relationships } = data;

  const emails = relationships.emails.data.map((email) => {
    const includedEmail = included.find((item) => item.type === 'emails' && item.id === email.id);
    return includedEmail ? includedEmail.attributes : null;
  });

  const phones = relationships.phones.data.map((phone) => {
    const includedPhone = included.find((item) => item.type === 'phones' && item.id === phone.id);
    return includedPhone ? includedPhone.attributes : null;
  });

  const organization = included.find((item) => item.type === 'organizations');

  const rearrangedData = {
    id,
    attributes: {
      ...attributes,
      emails,
      phones,
    },
    organization: organization ? organization.attributes : null,
  };

  return rearrangedData;
}

export default rearrangeData;
