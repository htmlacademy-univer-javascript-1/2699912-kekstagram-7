import {photos} from './data.js';

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

    fragment.appendChild(photoElement);
  });
  picturesContainer.appendChild(fragment);
};

export{renderThumbnails};
