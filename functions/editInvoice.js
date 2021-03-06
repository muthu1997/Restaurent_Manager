import URL from '../assets/url';

function OrderHandler(mainDataResult,datas) {
  //console.log(mainDataResult);
  fetch('http://erp.middlemen.asia/Newapp/EditInvoice.php',{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mainDataResult:mainDataResult
    })
  })
  .then(response => response.json())
  .then(responseJson => {
    datas(responseJson)
  })
  .catch(error=> {
    console.log(error)
    datas('error');
  })
}

export default OrderHandler;