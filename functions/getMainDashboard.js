import URL from '../assets/url';

function SupplierHandler(email,data) {
  fetch(URL.Dashboard+email,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(responseJson => {
    data(responseJson)
  })
  .catch(error=> {
    data('error')
  })
} 

export default SupplierHandler;