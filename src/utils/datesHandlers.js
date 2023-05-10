
export const setZerosForDates = (dateNumber)=> {
    if (dateNumber < 10) return "0" + dateNumber;
    return dateNumber;
  };
  //.toISOString().substr(0,10)

 export const setDateForOutput = (dt) => {
    let d = new Date(dt);
    let month = setZerosForDates(d.getUTCMonth() + 1);
    let day = setZerosForDates(d.getDate());
    return `${day}-${month}-${d.getFullYear()}`;
  };

  export const setTimeForOutput = (dt) => {
    let d = new Date(dt);
    let minutes =
      d.getUTCMinutes() == "0" ? d.getUTCMinutes() + "0" : d.getUTCMinutes();
    return `${d.getUTCHours()} : ${minutes}`;
  };

 export const convertToUTCdate = (dt)=> {
    let date = new Date(dt);
  //  let m = date.getUTCMonth() + 1;
  //console.log(date.toISOString().substr(0,10), 'm');

    let mm = setZerosForDates(date.getUTCMonth() + 1);
    let dd = setZerosForDates(date.getUTCDate());
    let yyyy = date.getUTCFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

 export const getCurrentDate = () => {
    let month = setZerosForDates(new Date().getMonth() + 1);
    let day = setZerosForDates(new Date().getDate());

    return `${new Date().getFullYear()}- ${month}-${day}`;
  };

 export const convertToOneFormat = (dt) => {
    let date = new Date(dt);
    return date.getTime();
  };

  export const maxRange = (date1, date2)=>{
    let difference = new Date(date1).getTime() - new Date(date2).getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return Math.abs(TotalDays);
  };
  
//  export const validateDate = (fr, to, firstdate, lastdate) => {
//     console.log(fr, to, firstdate, lastdate);
//     let fdt = convertToUTCdate(firstdate);
//     let ldt = convertToUTCdate(lastdate);
//     console.log(fr, fdt, ldt);

//     fdt = convertToOneFormat(fdt);
//     ldt = convertToOneFormat(ldt);
//     let frdt = convertToOneFormat(fr);
//     let todt = convertToOneFormat(to);

//     console.log(frdt, todt, ldt, fdt);
//   };
