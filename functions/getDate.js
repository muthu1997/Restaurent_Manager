import Date from '../assets/date.php';

function SupplierHandler(email,dataSetter) {
  fetch('../assets/date.php',{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(responseJson => {
    alert(responseJson)
  })
  .catch(error=> {
    console.log(error)
  })
}

export default SupplierHandler;