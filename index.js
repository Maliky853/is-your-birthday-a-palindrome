// ex.no 1
function reversedStr(str) {
  let reversedString = str.split("").reverse().join("");
  return reversedString;
}
// console.log(reversedStr("hello"))

// ----------------------------------------

// ex.no 2

function checkPalindrome(str) {
  let reversed = reversedStr(str);
  return str === reversed;
}
// console.log(checkPalindrome("mom"))

// -----------------------------------------

// ex.no 3

function convertDateToStr(date) {
  let dateStr = {
    day: "",
    month: "",
    year: "",
  };
  if (date.day < 0) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}

// -------------------------------------------

// ex .no 4

function getDateInAllFormates(date) {
  let dateStr = convertDateToStr(date);
  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyy = dateStr.month + dateStr.day + dateStr.year;
  let yymmdd = dateStr.year + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

// --------------------------------------------

// ex .no 5

function checkPalindromeForAllFormats(date) {
  let listOfPalindrome = getDateInAllFormates(date);

  let flag = false;

  for (let i = 0; i < listOfPalindrome.length; i++) {
    if (checkPalindrome(listOfPalindrome[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

// ----------------------------------------

// ex .no 6

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return false;
  } else if (year % 4 === 0) {
    return true;
  }
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month = month + 1;
    }
  }
  if (month > 12) {
    month = 1;
    year = year + 1;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date){
    let counter = 0
    let nextDate = getNextDate(date)

    while(1){
        counter++
        var isPalindrome =checkPalindromeForAllFormats(nextDate)
        if(isPalindrome){
            break
        }
        nextDate  = getNextDate(nextDate)
    }
    return [counter, nextDate]

} 

const dateInput = document.querySelector("#date-input")
const checkBtn = document.querySelector("#check-btn")
const outputDiv = document.querySelector("#output-div")


function clickHandler(e){
    let bdayStr = dateInput.value
    if(bdayStr!==''){
       let listOfDate =  bdayStr.split('-')
       let date = {
        day: Number(listOfDate[2]),
        month:Number(listOfDate[1]),
        year:Number(listOfDate[0])
       }
       let isPalindrome = checkPalindromeForAllFormats(date)
       if(isPalindrome){
        outputDiv.innerText = `YAY! Your Birthday Is Palindrome 😃`
       }
       else{
        let [counter, nextDate] = getNextPalindromeDate(date)
        outputDiv.innerText = `The Next Palindrome Date Is ${nextDate.day}-${nextDate.month}-${nextDate.year}, You Missed It By ${counter} Days 😐`
    }
    }

}

checkBtn.addEventListener("click", clickHandler)
