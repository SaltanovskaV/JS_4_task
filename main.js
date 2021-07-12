/*1*/
let myLongStr =
'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, dolor corrupti eos nulla, odit voluptatibus incidunt minima recusandae dolores, dolore error? Ab, mollitia. Alias reiciendis doloribus officia debitis, laudantium blanditiis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis deserunt sapien';
let wordsList = function fun (str, subStr) {
  let reg = new RegExp('\\.|,|\\?|!|:|;|"', 'gui');
  let arr = str.
    replace(reg, '').
    toLowerCase().
    split (' ' ).
    filter((arrItem) => arrItem.indexOf(subStr) > -1);
  let result = new Set();

  arr.forEach((arrItem) => {
    result.add(arrItem);
  });

  return result;
};

console.log(wordsList(myLongStr, 'lore'));
console.log(wordsList(myLongStr, 'do')); 
console.log(wordsList(myLongStr, 'cor')); 

/*2*/
let myDate = new Date();
let getLocalDate = (date, isSeconds = false, isISO = false) => {
  const reg = new RegExp(':\\d{2}$', 'gui');
  let res;

  if (!isISO) res = isSeconds
    ? date.toLocaleString()
    : date.toLocaleString().replace(reg, '');
  else {
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 9 ? `0${date.getDate()}` : date.getDate();
    const hour = date.getHours() < 9 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 9 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds = date.getSeconds() < 9 ? `0${date.getSeconds()}` : date.getSeconds();

    res = isSeconds
      ? `${year}-${month}-${day}, ${hour}:${minutes}:${seconds}`
      : `${year}-${month}-${day}, ${hour}:${minutes}`;
  }

  return res;
};

console.log(getLocalDate(myDate)); 
console.log(getLocalDate(myDate, true)); 
console.log(getLocalDate(myDate, false, true)); 
console.log(getLocalDate(myDate, true, true)); 
console.log(getLocalDate(new Date(123456))); 
console.log(getLocalDate(new Date(123456), true)); 
console.log(getLocalDate(new Date(123456), false, true)); 
console.log(getLocalDate(new Date(123456), true, true)); 

/*3*/
function getWeekDay (x) {
  const date = new Date(x);
  const days = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота'
  ];
  return days[date.getDay()];
};
console.log(getWeekDay('2021-07-09')); 
console.log(getWeekDay('2021-07-10')); 
console.log(getWeekDay('2021-07-11')); 

/*4*/
function getLocalDay (x) {
  const date = new Date(x);
  let day = date.getDay();
  if (day===0){
    day=7;
  }
  return day;
}
console.log (getLocalDay('2021-07-09'));
console.log (getLocalDay('2021-07-10'));
console.log (getLocalDay('2021-07-11'));

/*5*/

function getDateAgo (d, days) {
  let date= new Date(d);
  date.setDate(date.getDate() - days);
  return date.toLocaleDateString().split(",")[0];
};
console.log(getDateAgo('2019-01-29', 1));
console.log(getDateAgo('2019-01-29', 2));
console.log(getDateAgo('2019-01-29', 365));


/*6*/
let Car = function (engine, model, name, year) {
  this.engine = engine;
  this.model = model;
  this.name = name;
  this.year = year;
};

Object.defineProperties(Car.prototype, {
  used:{
  get() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.year > 1 ? 'used' : 'new';
  },
  set(value) {
    const currentYear = new Date().getFullYear();
    if (value === 'new' && this.year < currentYear) this.year = currentYear;
  }
}
});

Car.prototype.info = function () {
  return `${this.name} ${this.model}, ${this.engine}cc, year ${this.year}, ${this.used}`;
};

let car = new Car(3000, 'Camry', 'Toyota', 2020);
let car2 = new Car(2500, 6, 'Mazda', 2018);

console.log(car.info()); 
car.used = 'new';
console.log(car.info()); 
car.used = 'used';
console.log(car.info()); 
console.log(car2.info()); 
car.used = 'used';
console.log(car2.info()); 

/*7*/
let testPerformance = (iterations, func) => {
  let date = new Date();
  if (typeof func === 'function') for (let i = iterations; i--;) func();
  return new Date() - date;
};

function test1() {
  let str = myLongStr;

  while (str.indexOf('o') !== -1) str = str.replace('o', '');
  while (str.indexOf('a') !== -1) str = str.replace('a', '');
  while (str.indexOf('e') !== -1) str = str.replace('e', '');
  while (str.indexOf('u') !== -1) str = str.replace('u', '');
  while (str.indexOf('i') !== -1) str = str.replace('i', '');
}

function test2() {
  const reg = new RegExp('[oaeui]', 'gui');
  myLongStr.replace(reg, '');
}

console.log(testPerformance(100, test1));
console.log(testPerformance(100, test2));
console.log(testPerformance(100, 12345));