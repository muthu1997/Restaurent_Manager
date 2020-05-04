import URL from '../assets/url';

function CustomerHandler(data) {
  fetch('http://erp.middlemen.asia/api/viewinvoicesPaid',{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      company_id:11
    })
  })
  .then(response => response.json())
  .then(responseJson => {
    // data(responseJson)
    console.log('responseJson');
    console.log(responseJson);
  })
  .catch(error=> {
    console.log(error)
    data(error)
  })
}

export default CustomerHandler;