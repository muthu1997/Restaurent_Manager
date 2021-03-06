import URL from '../assets/url';

function SupplierHandler(email,dataSetter) {
  fetch(URL.GetSuppliersList+email,{
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
  })
}

export default SupplierHandler;