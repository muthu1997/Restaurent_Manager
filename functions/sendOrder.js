import URL from '../assets/url';

function SupplierHandler(email,data,outlet_id,internel_desc,delivery_date,supplier_id,getResult) {
  //console.log(email+','+JSON.stringify(data)+','+outlet_id+','+internel_desc+','+delivery_date+','+supplier_id+','+getResult);
  fetch(URL.SendOrder+email,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: data,
      outlet_id:outlet_id,
      internel_desc:internel_desc,
      delivery_date:delivery_date,
      supplier_id:supplier_id,
    })
  })
  .then(response => response.json())
  .then(responseJson => {
    getResult(responseJson)
  })
  .catch(error=> {
    getResult('error')
  })
}

export default SupplierHandler;