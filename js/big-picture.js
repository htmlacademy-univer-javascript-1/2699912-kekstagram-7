const COMMENTS_STEP=5;

const bigPicture=document.querySelector('.big-picture');
const bigPictureImg=bigPicture.querySelector('.big-picture__img img');
const likesCount= bigPicture.querySelector('.likes-count');
const commentsCount= bigPicture.querySelector('.comments-count');
const socialComments=bigPicture.querySelector('.social__comments');
const socialCaption=bigPicture.querySelector('.social__caption');
const socialCommentCount=bigPicture.querySelector('.social__comment-count');
const commentsLoader=bigPicture.querySelector('.comments-loader');
const bigPictureCancel=bigPicture.querySelector('.big-picture__cancel');
const commentTemplate=socialComments.querySelector('.social__comment');

let currentComments=[];
let shownCommentsCount=0;

const createCommentElement=(comment)=>{
  const commentElement=commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src=comment.avatar;
  commentElement.querySelector('.social__picture').alt=comment.name;
  commentElement.querySelector('.social__text').textContent=comment.message;

  return commentElement;
};

const renderNextComments=()=>{
  const nextComments = currentComments.slice(shownCommentsCount, shownCommentsCount+COMMENTS_STEP);
  const fragment = document.createDocumentFragment();
  nextComments.forEach((comment)=>{
    fragment.appendChild(createCommentElement(comment));
  });
  socialComments.appendChild(fragment);
  shownCommentsCount+=nextComments.length;
  socialCommentCount.firstChild.textContent=`${shownCommentsCount} из `;
  if(shownCommentsCount>=currentComments.length){
    commentsLoader.classList.add('hidden');
  } else{
    commentsLoader.classList.remove('hidden');
  }
};

const closeBigPicture=()=>{
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCancel.removeEventListener('click', onCloseButtonClick);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
};

function onDocumentKeydown(evt){
  if(evt.key === 'Escape'){
    evt.preventDefault();
    closeBigPicture();
  }
}

function onCloseButtonClick() {
  closeBigPicture();
}

function onCommentsLoaderClick() {
  renderNextComments();
}

const openBigPicture=(photo)=>{
  bigPictureImg.src=photo.url;
  likesCount.textContent=photo.likes;
  commentsCount.textContent=photo.comments.length;
  socialCaption.textContent=photo.description;
  currentComments=photo.comments;
  shownCommentsCount=0;
  socialComments.innerHTML='';
  renderNextComments();
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCancel.addEventListener('click', onCloseButtonClick);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};
export {openBigPicture};
