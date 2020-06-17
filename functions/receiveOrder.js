import URL from '../assets/url';

function OrderHandler(mainDataResult,datas) {
  console.log('Date'+mainDataResult[0].receivedat)
  fetch(URL.ReceiveOrder,{
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
    console.log(responseJson)
  })
  .catch(error=> {
    console.log(error)
    datas(error);
  })
}

export default OrderHandler;
//mainDataResult:mainDataResult