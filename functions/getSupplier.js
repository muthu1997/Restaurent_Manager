import URL from '../assets/url';

function SupplierHandler(email,dataSetter) {
  fetch(URL.Getsupplier+email,{
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
    alert('error')
  })
}

export default SupplierHandler;