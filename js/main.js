const getRandomInteger = (a,b) =>{
  const lower=Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));
  const result=Math.random()*(upper-lower+1)+lower;
  return Math.floor(result);
};

const descriptions=[
  'Закат на море',
  'Утренний завтрак',
  'Вкусное кофе',
  'Отдых за границей',
  'Зелёное поле',
  'Вкусный ужин',
  'Подарок родственнику',
  'Ремонт дома',
  'Тик-ток поколение'
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names =[
  'Ваня',
  'Вася',
  'Витя',
  'Анна',
  'Дарья',
  'Ольга',
  'Пётр',
  'Фёдор',
  'Дмитрий',
  'Евгения'
];

const getRandomArrayElement=(array)=>array[getRandomInteger(0,array.length-1)];

let commentIdCount=0;

const createMessage=()=>{
  const count= getRandomInteger(1,2);
  const random=[];
  for(let k =0;k<count;k++){
    random.push(getRandomArrayElement(messages));
  }return random.join(' ');
};

const createComment=()=>({
  id: commentIdCount++,
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(names)
});

const generateComments=()=>{
  const commentsCount=getRandomInteger(0,30);
  const comments=[];
  for(let i =0;i<commentsCount;i++){
    comments.push(createComment());
  }return comments;
};

const createPhoto=(index)=>({
  id:index+1,
  url:`photos/${index+1}.jpg`,
  description:getRandomArrayElement(descriptions),
  likes:getRandomInteger(15,200),
  comments:generateComments()
});

const photos= [];

for(let j = 0; j<25;j++){
  photos.push(createPhoto(j));
}


