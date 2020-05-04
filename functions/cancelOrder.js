import URL from '../assets/url';

function OrderHandler(id,datas) {
  fetch(URL.CancelOrder+id,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
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