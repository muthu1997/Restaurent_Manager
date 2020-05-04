import URL from '../assets/url';

function SupplierHandler(id,dataSetter) {
  fetch(URL.GetOutletDetails,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id:id
    })
  })
  .then(response => response.json())
  .then(responseJson => {
    dataSetter(responseJson)
  })
  .catch(error=> {
    console.log(error)
    dataSetter('error')
  })
}

export default SupplierHandler;