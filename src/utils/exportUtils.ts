
interface RegistrationData {
  fullName: string;
  mobileNumber: string;
  roomNumber: string;
  groupName: string;
  interests: string[];
  software: string[];
}

export const exportToCSV = (data: RegistrationData[]) => {
  if (data.length === 0) {
    alert('No data to export');
    return;
  }

  const headers = [
    'Full Name',
    'Mobile Number', 
    'Room Number',
    'Group Name',
    'Interests',
    'Software/Applications'
  ];

  const csvContent = [
    headers.join(','),
    ...data.map(row => [
      `"${row.fullName}"`,
      `"${row.mobileNumber}"`,
      `"${row.roomNumber}"`,
      `"${row.groupName}"`,
      `"${row.interests.join('; ')}"`,
      `"${row.software.join('; ')}"`
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `creative_community_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportToExcel = (data: RegistrationData[]) => {
  if (data.length === 0) {
    alert('No data to export');
    return;
  }

  // Create a simple HTML table format that Excel can read
  const headers = [
    'Full Name',
    'Mobile Number', 
    'Room Number',
    'Group Name',
    'Interests',
    'Software/Applications'
  ];

  let excelContent = '<table border="1">';
  excelContent += '<tr>';
  headers.forEach(header => {
    excelContent += `<th style="background-color: #4CAF50; color: white; font-weight: bold; padding: 8px;">${header}</th>`;
  });
  excelContent += '</tr>';

  data.forEach(row => {
    excelContent += '<tr>';
    excelContent += `<td style="padding: 8px;">${row.fullName}</td>`;
    excelContent += `<td style="padding: 8px;">${row.mobileNumber}</td>`;
    excelContent += `<td style="padding: 8px;">${row.roomNumber}</td>`;
    excelContent += `<td style="padding: 8px;">${row.groupName}</td>`;
    excelContent += `<td style="padding: 8px;">${row.interests.join(', ')}</td>`;
    excelContent += `<td style="padding: 8px;">${row.software.join(', ')}</td>`;
    excelContent += '</tr>';
  });

  excelContent += '</table>';

  const blob = new Blob([excelContent], { 
    type: 'application/vnd.ms-excel;charset=utf-8;' 
  });
  
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `creative_community_registrations_${new Date().toISOString().split('T')[0]}.xlsx`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
