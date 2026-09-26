function checkLengthStr (str,maxLength){
  return str.length<=maxLength;
}

function checkPalenrom(string){
  const normalStr=string.replaceAll(' ','').toLowerCase();
  let reversStr='';
  for (let i=normalStr.length-1;i>=0;i--){
    reversStr+=normalStr.at(i);
  }
  return normalStr===reversStr;
}
