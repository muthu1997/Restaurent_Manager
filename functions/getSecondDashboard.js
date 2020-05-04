import URL from '../assets/url';

function SupplierHandler(email,fromDate,toDate,data) {
  fetch(URL.Dashboard+email+'?'+'from_date='+fromDate+'&to_date='+toDate,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(responseJson => {
    data(responseJson)
  })
  .catch(error=> {
    console.log(error)
  })
} 

export default SupplierHandler;