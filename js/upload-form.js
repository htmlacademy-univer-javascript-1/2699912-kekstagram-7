const MAX_HASHTAGS=5;
const MAX_COMMENT_LENGTH=140;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const SCALE_STEP=25;
const MIN_SCALE=25;
const MAX_SCALE=100;
const EFFECTS = {
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
};


const uploadForm=document.querySelector('.img-upload__form');
const uploadOverlay=uploadForm.querySelector('.img-upload__overlay');
const uploadInput=uploadForm.querySelector('.img-upload__input');
const uploadCancel=uploadForm.querySelector('.img-upload__cancel');
const hashtagInput=uploadForm.querySelector('.text__hashtags');
const commentInput=uploadForm.querySelector('.text__description');
const previewImage=uploadForm.querySelector('.img-upload__preview img');
const scaleValue = uploadForm.querySelector('.scale__control--value');
const scaleSmaller=uploadForm.querySelector('.scale__control--smaller');
const scaleBigger=uploadForm.querySelector('.scale__control--bigger');
const effectsList=uploadForm.querySelector('.effects__list');
const effectLevel=uploadForm.querySelector('.img-upload__effect-level');
const effectLevelValue=uploadForm.querySelector('.effect-level__value');
const effectSlider=uploadForm.querySelector('.effect-level__slider');

window.noUiSlider.create(effectSlider,{
  range:{
    min:EFFECTS.chrome.min,
    max: EFFECTS.chrome.max,
  },
  start:EFFECTS.chrome.max,
  step:EFFECTS.chrome.step,
});
effectLevel.classList.add('hidden');

const pristine=new window.Pristine(uploadForm,{
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-error',
},false);

const getHashtags=(value)=>{
  const trimmedValue=value.trim();
  if (trimmedValue===''){
    return[];
  }
  return trimmedValue.split(/\s+/);
};

const hasValidHashtags=(value)=>{
  const hastags=getHashtags(value);
  for(let index=0;index<hastags.length;index++){
    if (!HASHTAG_PATTERN.test(hastags[index])){
      return false;
    }
  }
  return true;
};

const hasAllowedHashtagCount=(value)=>{
  const hashtags=getHashtags(value);
  return hashtags.length<=MAX_HASHTAGS;
};

const hasUniqueHashtags=(value)=>{
  const hashtags=getHashtags(value.toLowerCase());

  for(let i = 0; i<hashtags.length;i++){
    for(let nextI=i+1; nextI<hashtags.length;nextI++){
      if (hashtags[i] === hashtags[nextI]){
        return false;
      }
    }
  }
  return true;
};

const hasValidCommentLength=(value)=>value.length<=MAX_COMMENT_LENGTH;

const setImageScale = (scale)=>{
  scaleValue.value = `${scale}%`;
  previewImage.style.transform=`scale(${scale/100})`;
};

const onScaleSmallerClick=()=>{
  const scale = parseInt(scaleValue.value,10);
  if (scale>MIN_SCALE){
    setImageScale(scale-SCALE_STEP);
  }
};

const onScaleBiggerClick=()=>{
  const scale =parseInt(scaleValue.value,10);
  if (scale<MAX_SCALE){
    setImageScale(scale+SCALE_STEP);
  }
};

const resetEffect =()=>{
  effectLevel.classList.add('hidden');
  effectLevelValue.value='';
  previewImage.style.removeProperty('filter');
};

const onEffectSliderUpdate=(values)=>{
  const selectedEffect=effectsList.querySelector('input[name="effect"]:checked');
  const effect=EFFECTS[selectedEffect.value];
  if(!effect){
    return;
  }
  const value = Number(values[0]);
  effectLevelValue.value=value;
  previewImage.style.filter= `${effect.filter}(${value}${effect.unit})`;
};

const onEffectsListChange=(evt)=>{
  const effect=EFFECTS[evt.target.value];
  if(!effect){
    resetEffect();
    return;
  }
  effectLevel.classList.remove('hidden');

  effectSlider.noUiSlider.updateOptions({
    range:{
      min:effect.min,
      max:effect.max,
    },
    step: effect.step,
    start:effect.max,
  });
};

const closeUploadForm=()=>{
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown',onUploadDocumentKeydown);
  uploadCancel.removeEventListener('click', onUploadCancelClick);

  scaleSmaller.removeEventListener('click', onScaleSmallerClick);
  scaleBigger.removeEventListener('click', onScaleBiggerClick);

  effectsList.removeEventListener('change', onEffectsListChange);
  effectSlider.noUiSlider.off('update');

  uploadForm.reset();
  resetEffect();
  setImageScale(MAX_SCALE);
  pristine.reset();
};


function onUploadDocumentKeydown(evt){
  const isTextField = evt.target === hashtagInput || evt.target === commentInput;

  if (evt.key === 'Escape' && ! isTextField){
    evt.preventDefault();
    closeUploadForm();
  }
}

function onUploadCancelClick(evt){
  evt.preventDefault();
  closeUploadForm();
}

const openUploadForm=()=>{
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadDocumentKeydown);
  uploadCancel.addEventListener('click', onUploadCancelClick);
  scaleSmaller.addEventListener('click', onScaleSmallerClick);
  scaleBigger.addEventListener('click', onScaleBiggerClick);
  effectsList.addEventListener('change', onEffectsListChange);
  effectSlider.noUiSlider.on('update', onEffectSliderUpdate);
};

const onUploadInputChange=()=>{
  if (uploadInput.files.length>0){
    openUploadForm();
  }
};

const onUploadFormSubmit=(evt)=>{
  if (!pristine.validate()){
    evt.preventDefault();
  }
};

pristine.addValidator(
  hashtagInput,
  hasValidHashtags,
  'Хэштэг должен начинаться с # и содержать 1-19 букв или цифр.',
  3,
  true,
);

pristine.addValidator(
  hashtagInput,
  hasAllowedHashtagCount,
  'Указывать не больше 5 #.',
  2,
  true,
);

pristine.addValidator(
  hashtagInput,
  hasUniqueHashtags,
  '# не должны повторяться',
  1,
  true,
);

pristine.addValidator(
  commentInput,
  hasValidCommentLength,
  'Комментарий должен содержать не больше 140 символов.',
);

uploadInput.addEventListener('change', onUploadInputChange);
uploadForm.addEventListener('submit', onUploadFormSubmit);
