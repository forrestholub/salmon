'use strict';
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var allStores = [];// create array for all the stores information
localStorage.setItem('allStoredStores', JSON.stringify(allStores)); // lets add local storage 
const storeData = JSON.parse(localStorage.getItem('allStoredStores')); 

//create new constructor function to replace the object literal function setup before
function Store(storeName, minCustomers, maxCustomers, avgSale) { 
  this.storeName = storeName;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgSale = avgSale;
  this.dailySales = 0;
  this.hourlySales = [];
  this.employee = [];
  allStores.push(this); // push salmon cookie store variables into each store 
}

//create reusable methods that can be used with all stores within Store constructor function
Store.prototype.customerPerHour = function () {
  return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers;
};

Store.prototype.hourlyTransactions = function () {
  for (var i in hours) {
    var numberOfCustomers = this.customerPerHour();
    this.hourlySales.push(Math.round(numberOfCustomers * this.avgSale));
  }
};

Store.prototype.dailyTransactions = function () {
  for (var i in this.hourlySales) {
    this.dailySales += this.hourlySales[i];
  }
};

var pike = new Store('1st and Pike', 1, 23, 5);
var seatac = new Store('SeaTac Airport', 5, 21, 5.2);
var queenann = new Store('Queen Anne', 18, 42, 3.2);
var chill = new Store('Capitol Hill', 139, 12, 4.9);


//calculate the variables for the new stores
pike.hourlyTransactions();
seatac.hourlyTransactions();
queenann.hourlyTransactions();
chill.hourlyTransactions();


pike.dailyTransactions();
seatac.dailyTransactions();
queenann.dailyTransactions();
chill.dailyTransactions();

//staffing requirements
// single salmon cookie tosser can serve 20 customers per hour
// each location has minimum of two salmon cookie tossers on shift at all times
// goal: calculate how many cookie tossers are needed at each location each hour

Store.prototype.hourlyEmployees = function(){
for (var i in hours){
var cookieTossers = this.hourlySales[i];
var cookieEquation = Math.round(cookieTossers / 20);
if (cookieEquation > 2 ){
this.employee.push(cookieEquation);
}
else {
  this.employee.push(2)
}
}
}


pike.hourlyEmployees();
console.log(pike.employee);
console.log(allStores);


//create new Store on user input 
function addNewStore(){
  var newStoreName = document.getElementById("storeName").value;
  var newMinCustomers = document.getElementById("minCustomers").value;
  var newMaxCustomers = document.getElementById("maxCustomers").value;
  var newAvgSales = document.getElementById("avgSales").value;

 var newStore = new Store(newStoreName, newMinCustomers, newMaxCustomers, newAvgSales);

 newStore.hourlyTransactions();
 newStore.dailyTransactions();
 
 //add to local storage
 localStorage.setItem('allStoredStores', JSON.stringify(allStores)); 
 
 var tbody = document.createElement('tbody');
 var tr = document.createElement('tr');

 var td = document.createElement('td');
 td.textContent = newStore.storeName;
 tr.appendChild(td);
 tbody.appendChild(tr);
 table.appendChild(tbody); 

for (var i in hours){
var td = document.createElement('td');
var txt = document.createTextNode(newStore.hourlySales[i]);
td.appendChild(txt);
tr.appendChild(td);
tbody.appendChild(tr);
table.appendChild(tbody);
}

var td = document.createElement('td');
td.textContent = newStore.dailySales;
tr.appendChild(td);
tbody.appendChild(tr);
table.appendChild(tbody);

 console.log(newStore);
 console.log(allStores);
}

//call button event so addNewStore can be executed and then rewritten
//as false to exit 

var subButton = document.getElementById('subButton');
subButton.addEventListener('click', addNewStore, false); 

//play with the object values of "Store"

//delete last entry
function deleteEntry(){
document.getElementById('table').deleteRow(allStores.length);
allStores.pop(allStores.length);
console.log(allStores.length); 
console.log(allStores);
}

var deleteButton = document.getElementById('delete');
deleteButton.addEventListener('click', deleteEntry, false); 


//call table from index.html
var table = document.getElementById('table');


function makeHeaderRow() {

  var trEl = document.createElement('tr'); //create new table row element
  var thEl = document.createElement('th'); //create new table header element
  thEl.textContent = 'Store';
  trEl.appendChild(thEl); // append "store" name to the table header element

  for (var i in hours) {
    thEl = document.createElement('th');
    var txt = document.createTextNode(hours[i]);
    thEl.appendChild(txt); 
    trEl.appendChild(thEl);
  }
  var thEl = document.createElement('th');
  thEl.textContent = 'Daily Sales';
  trEl.appendChild(thEl);
  table.appendChild(trEl);
}

function makeTableBody(){
  var tbody = document.createElement('tbody');
  var storeArray = []; // store Store names
  var storeTotalArray = []; // store alll daily sales into array

  // for each outer array row
  for (var i = 0; i < allStores.length; i++) {
    var tr = document.createElement("tr");
    console.log(allStores.length);

    // create function inside of function that stores store names
    // into an array 
    var storeBreakDown = allStores[i];
    storeArray.push(storeBreakDown.storeName);
    console.log(storeArray);

    storeTotalArray.push(storeBreakDown.dailySales);
    console.log(storeTotalArray);

    //create store name for each 1st position
    var td = document.createElement('td');
    var txt = document.createTextNode(storeArray[i]);
    td.appendChild(txt);
    tr.appendChild(td);
    tbody.appendChild(tr);
    table.appendChild(tbody);

// pair hours with hourly sales into table
    for (var j = 0; j < hours.length; j++) {
      
      var td = document.createElement("td");
      var txt = document.createTextNode(storeBreakDown.hourlySales[j]);
      td.appendChild(txt);
      tr.appendChild(td);
      tbody.appendChild(tr);
      table.appendChild(tbody);
    }
    var td = document.createElement('td');
    var txt = document.createTextNode(storeTotalArray[i]);
    td.appendChild(txt);
    tr.appendChild(td);
    tbody.appendChild(tr);
    table.appendChild(tbody);

  }
  console.log(storeBreakDown);
}

function makeFooterRow(){
var tfoot = document.createElement('tfoot');
var trEl = document.createElement('tr'); 
var tdEl = document.createElement('td');

tdEl.textContent = "Totals";
trEl.appendChild(tdEl);
tfoot.appendChild(trEl);
table.appendChild(tfoot);
}
  makeHeaderRow();
  makeTableBody();
  makeFooterRow();

//staffing variables: string name : "employee" in all stores
// 

var staffTable = document.getElementById("staffTable"); 
console.log(typeof(staffTable)); 

//make header row for staffing requirements table
// function makeStaffHeader(){
// var thEl = document.createElement('th');
// var trEl = document.createElement('tr');
// thEl.textContent = "Store";
// trEl.appendChild(thEl);

// for (var i in hours){
//   var thEl= document.createElement('th'); 
//   var txt = document.createTextNode(hours[i]);
//   thEl.appendChild(txt);
//   trEl.appendChild(thEl);
// }
// var thEl2 = document.createElement('th');
// thEl2.textContent= "totals";
// trEl.appendChild(thEl2);
// staffTable.appendChild(trEl); 
// }

// makeStaffHeader();


