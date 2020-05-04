import URL from '../assets/url';
//email,data,outlet_id,internel_desc,delivery_date,supplier_id,getResult
function SupplierHandler() {
   //console.log(email+','+JSON.stringify(data)+','+outlet_id+','+internel_desc+','+delivery_date+','+supplier_id+','+getResult);
  fetch(URL.OrderApproval+'test@middlemen.asia',{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      data: [
        {"id":2760,"quantity":10,"price":18.88}, {"id":2558,"quantity":2,"price":19.8}
          ]
        ,
      outlet_id:41,
      internel_desc:'internel_desc',
      delivery_date:'2020-04-29',
      supplier_id:240,
    })
  })
  .then(response => response.json())
  .then(responseJson => {
    console.log(JSON.stringify(responseJson));
    getResult(responseJson)
  })
  .catch(error=> {
    console.log(error)
  })
}

export default SupplierHandler;