import URL from '../assets/url';

function SupplierHandler(email,id,dataSetter1) {
  fetch(URL.ViewProduct+id+'/'+email,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(responseJson => {
    dataSetter1(responseJson)
  })
  .catch(error=> {
    console.log(error)
    dataSetter1('error'); 
  })
}

export default SupplierHandler;