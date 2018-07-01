'use strict';
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var allStores = [];// create array for all the stores information

//create new constructor function to replace the object literal function setup before
function Store(storeName, minCustomers, maxCustomers, avgSale) { 
  this.storeName = storeName;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgSale = avgSale;
  this.dailySales = 0;
  this.hourlySales = [];
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

//create new stores that will automatically have properties of the Store constructor functions
var pike = new Store('1st and Pike', 23, 65, 6.3);
var seatac = new Store('SeaTac Airport', 25, 24, 1.2);
var queenann = new Store('Queen Anne', 18, 42, 3.2);
var capitalhill = new Store('Capital Hill', 139, 12, 4.9);

// add new store function
function addNewStore(){

  var newStoreName = (document.newStore.storeName.value);
  var newMinCustomers = (document.newStore.minCustomers.value);
  var newMaxCustomers = (document.newStore.maxCustomers.value);
  var newAvgSales = (document.newStore.avgSales.value);

 var newStore = new Store(newStoreName, newMinCustomers, newMaxCustomers, newAvgSales);
 newStore.hourlyTransactions();
 newStore.dailyTransactions();
 makeTablebody();
 alert("you made it through the add new store function call request");

  console.log(newStore);
  console.log(allStores);
  console.log(newStoreName);
}

//calculate the variables for the new stores
pike.hourlyTransactions();
seatac.hourlyTransactions();
queenann.hourlyTransactions();
capitalhill.hourlyTransactions();

pike.dailyTransactions();
seatac.dailyTransactions();
queenann.dailyTransactions();
capitalhill.dailyTransactions();

//play with the object values of "Store"


//call table from index.html
var table = document.getElementById('table');


function makeHeaderRow() {

  var trEl = document.createElement('tr'); //create new table row element
  var thEl = document.createElement('th'); //create new table header element
  thEl.textContent = 'Store';
  trEl.appendChild(thEl); // append "store" name to the table header element

  for (var i in hours) {
    thEl = document.createElement('th');
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
    table.appendChild(trEl);
  }
  var thEl = document.createElement('th');
  thEl.textContent = 'Daily Sales';
  trEl.appendChild(thEl);
  table.appendChild(trEl);
}

function makeTableBody(){
  var tbody = document.createElement('tbody');
  var storeArray = [];
  var storeTotalArray = [];
  var storeHourlyTotalArray = [];
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
console.log(allStores);
console.log(allStores.propertyIsEnumerable(Store));
  makeHeaderRow();
  makeTableBody();