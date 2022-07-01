export default function(time){
    let newTime='';
    newTime+=`${time.getFullYear()}-`;
    newTime+=time.getMonth()+1<10?`0${time.getMonth()+1}-`:`${time.getMonth()+1}-`;
    newTime+=time.getDate()<10?`0${time.getDate()} `:`${time.getDate()} `;
    newTime+=time.getHours()<10?`0${time.getHours()}:`:`${time.getHours()}:`;
    newTime+=time.getMinutes()<10?`0${time.getMinutes()}`:`${time.getMinutes()}`;
    return newTime;
}