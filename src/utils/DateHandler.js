class DateHandler {
  constructor() {}


  setZerosForDates(dateNumber) {
    if (dateNumber < 10) return "0" + dateNumber;
    return dateNumber;
  }

  //setDate
  setDateForOutput = (dt) => {
    let d = new Date(dt);
    let month = this.setZerosForDates(d.getUTCMonth() + 1);
    let day =this.setZerosForDates(d.getDate());
    return `${day}-${month}-${d.getFullYear()}`;
  };

  setTimeForOutput = (dt) => {
    let d = new Date(dt);
    let minutes = d.getUTCMinutes() == "0" ? d.getUTCMinutes() + "0" : d.getUTCMinutes();
    return `${d.getUTCHours()} : ${minutes}` ;
  };

    setDate = (dt) => {
    let d = new Date(dt);
    let month = d.getMonth() + 1;
    let date = `${d.getDate()}-${month}-${d.getFullYear()}`;
    return date;
  };

  getFirstOrLastDate = (item) => {
    let fdate = this.setDateForOutput(item.utcDate);
    const [dd, mm, yyyy] = fdate.split("-");

    let month = this.setZerosForDates(mm);
    let date = this.setZerosForDates(dd);

    return `${yyyy}-${month}-${date}`;
  };
  

//
  covertToUTCdate(dt){
  let date =  new Date(dt);
  let month = this.setZerosForDates(date.getUTCMonth()+1);
  let day = this.setZerosForDates(date.getUTCDate());
   return `${date.getUTCFullYear()}-${month}-${day}`;
  }

  getCurrentDate = () => {
    let month = this.setZerosForDates(new Date().getMonth() + 1);
    let day = this.setZerosForDates(new Date().getDate());

    return `${new Date().getFullYear()}- ${month}-${day}`;
  };

}
export default new DateHandler();
