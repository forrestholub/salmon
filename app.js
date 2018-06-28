'use strict';

var hours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm', '6pm'];

var pike = {

  storeName: 'Pike and 1st', 
  minCustomers: 23,
  maxCustomers: 65,
  avgSales: 6.3,
  dailySales: 0,
  hourlySales: [],
  customersPerHour: function() {
    return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers +1)) + this.minCustomers; 
  },
  render: function(){ 
    for(var i = 0; i < hours.length; i++){
     var numberOfCustomers = this.customersPerHour();
     this.hourlySales.push(Math.round(numberOfCustomers * this.avgSales));
     this.dailySales += this.hourlySales[i];

     var pikeEl = document.getElementById('hours');
     var liEl = document.createElement('li');
     liEl.textContent = hours[i] + ': ' + this.hourlySales[i] + ' cookies';
     pikeEl.appendChild(liEl);
    }

    pikeEl = document.getElementById('hours');
    liEl = document.createElement('b');
    liEl.textContent = 'Total: ' + this.dailySales + ' cookies';
    pikeEl.appendChild(liEl);

  }

};

pike.render();