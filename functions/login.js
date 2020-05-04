import URL from '../assets/url';

function LoginHandler(email,password,data) {
  fetch(URL.Login,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(response => response.json())
  .then(responseJson => {
    data(responseJson)
  })
  .catch(error=> {
    console.log(error)
    data(error)
  })
}

export default LoginHandler;