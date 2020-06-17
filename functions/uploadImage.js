import URL from '../assets/url';

const uploadimageowner = (image,invNo,path,dataResult) => {
    console.log('Preapring upload'+path);
    const data = new FormData();
    //data.append('id', 'id apa saja'); // you can append anyone.
    data.append('image', {
      uri: image,
      type: 'image/jpg',
      name: invNo,
      path: path
    });
    data.append('path',path)
    const url= URL.UploadImage
    fetch(url, {
      method: 'post',
      body: data,
    })
    .then(response => response.text())
      .then(responseJson => {
        console.log(responseJson)
        dataResult(responseJson);
      });
}

export default uploadimageowner;