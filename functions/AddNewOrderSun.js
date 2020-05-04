import URL from '../assets/url';

function SupplierHandler(getMainDataResult,data) {
   // console.log(getMainDataResult)
  fetch(URL.AddNewOrder,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        mainDataResult:Array(getMainDataResult)
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