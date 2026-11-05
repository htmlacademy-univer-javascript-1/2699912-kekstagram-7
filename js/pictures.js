import {photos} from './data.js';
import {openBigPicture} from './big-picture.js';

const picturesTemplate=document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesContainer=document.querySelector('.pictures');

const fragment = document.createDocumentFragment();

const renderThumbnails=()=>{

  photos.forEach((photo)=>{

    const photoElement= picturesTemplate.cloneNode(true);
    photoElement.querySelector('img').src=photo.url;
    photoElement.querySelector('img').alt=photo.description;
    photoElement.querySelector('.picture__likes').textContent=photo.likes;
    photoElement.querySelector('.picture__comments').textContent=photo.comments.length;

    photoElement.addEventListener('click', (evt) =>{
      evt.preventDefault();
      openBigPicture(photo);
    });

    fragment.appendChild(photoElement);
  });
  picturesContainer.appendChild(fragment);
};

export{renderThumbnails};
