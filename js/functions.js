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

const checkWorkingHours=(workStart,workEnd,meetingStart,meetingDuration)=>{

  const getMinutesFromHours=(timeString)=>{
    const[hours, minutes]=timeString.split(':');
    return Number(hours)*60 + Number(minutes);
  };
  const workStartMinutes = getMinutesFromHours(workStart);
  const workEndMinutes = getMinutesFromHours(workEnd);
  const meetingStartMinutes = getMinutesFromHours(meetingStart);
  return workStartMinutes <= meetingStartMinutes && meetingStartMinutes + meetingDuration <= workEndMinutes;
};
