import URL from '../assets/url';

function SupplierHandler(email,id,showDate,cid,dataSetter) {
    console.log(URL.SunReport+email+'/'+id+'?delivery_month='+showDate+'&company_id='+cid);
  fetch(URL.SunReport+email+'/'+id+'?delivery_month='+showDate+'&company_id='+cid,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(responseJson => {
    //console.log(responseJson)
    dataSetter(responseJson)
  })
  .catch(error=> {
    console.log(error)
    dataSetter('error');
  })
}

export default SupplierHandler;