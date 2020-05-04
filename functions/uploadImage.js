import URL from '../assets/url';

const uploadimageowner = (image,invNo,dataResult) => {
    console.log('Preapring upload');
    const data = new FormData();
    //data.append('id', 'id apa saja'); // you can append anyone.
    data.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: invNo,
    });
    const url= URL.UploadImage
    fetch(url, {
      method: 'post',
      body: data,
    })
    .then(response => response.json())
      .then(responseJson => {
        dataResult(responseJson);
      });
}

export default uploadimageowner;