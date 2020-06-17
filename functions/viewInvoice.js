import URL from '../assets/url';

function SupplierHandler(email,id,dataSetter) {
  fetch(URL.ViewOrder+email+'/?transaction_id='+id,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json()) 
  .then(responseJson => {
    dataSetter(responseJson)
  }) 
  .catch(error=> {
    console.log(error)
    dataSetter('error'); 
  }) 
}

export default SupplierHandler;