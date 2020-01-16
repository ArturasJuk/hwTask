document.addEventListener('DOMContentLoaded', () => {
  const imgList = document.getElementById('img-list');
  const imgContainer = document.getElementById("img-container");
  const imgDescription = document.getElementById("img-description");

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
      const newNode = document.createElement('li');
      newNode.addEventListener('click', showFullImg.bind(null, img))
      newNode.innerHTML = `<img id="${img.id}" src="https://picsum.photos/id/${img.id}/200/200">`;
      imgList.appendChild(newNode);
    });
  }

  const showFullImg = (img) => {
    const { id, author, width, height, download_url } = img;
    imgDescription.innerHTML = `<span class="author">${author}</span><span class="dimensions">${width} x ${height}</span>`;
    console.log(imgDescription.innerHTML);
    imgContainer.style.backgroundImage = `url("${download_url}")`
  }

  fetchImages();
});
