document.addEventListener('DOMContentLoaded', () => {
  const imgList = document.getElementsByClassName('img-list')[0];
  const imgHeader = document.getElementsByClassName('img-header')[0];
  const imgHeaderTitle = imgHeader.getElementsByTagName('h3')[0];
  const imgHeaderDimensions = imgHeader.getElementsByTagName('span')[0];
  const imgBody = document.getElementsByClassName('img-body')[0];

  // const handleClick = (event) => {
  //   // imgBody.styles.background-image = `"url(${})"`;
  //   console.log(event.target.id);
  // }

  // imgList.addEventListener('click', handleClick.bind());

  const fetchImages = () => {
    fetch('https://picsum.photos/v2/list')
      .then(res => {
        if (res.status !== 200) {
          console.log('Invalid response from image server');
        } else {
          res.json().then(appendToDOM);
        }
      })
      .catch(err => console.log('Error occurred while connecting to image server'));
  }

  const appendToDOM = (images) => {
    images.forEach(img => {
      const {
        id
      } = img;
      const newNode = document.createElement('li');
      newNode.addEventListener('click', handleImgClick.bind(null, img));
      newNode.innerHTML = `<img id="${id}" src="https://picsum.photos/id/${id}/200/200">`;

      imgList.appendChild(newNode);
    });
  }

  const handleImgClick = (img) => {
    const {
      id,
      author,
      width,
      height,
      download_url
    } = img;
    imgHeaderTitle.innerHTML = `${author}`;
    imgHeaderDimensions.innerHTML = `${width} x ${height}`;
    imgBody.style.backgroundImage = `url("${download_url}")`;
  }

  fetchImages();
});