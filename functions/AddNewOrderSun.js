import URL from '../assets/url';

function SupplierHandler(Results,data) {
  fetch(URL.AddNewOrder,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        mainDataResult:Results
    })
  })
  .then(response => response.json())
  .then(responseJson => {
    data(responseJson)
    console.log(responseJson)
  })
  .catch(error=> {
    console.log(error)
    data('error')
  })
} 

export default SupplierHandler;