var socket = io();

var vm = new Vue ({
  el: '#myID',
  data: {
    burgersArray: food,

    deliveryName: "",
    deliveryMail: "",
    deliveryStreet: "",
    deliveryHouse: 0,
    selectedPaymentMethod: "",
    gender: "",
    checkedBurgers: [],

    orders: {},
  },
  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));
  },
  methods: {
      markDone: function() {
        document.getElementById("orderID").style.display = "block";
      },
        getNext: function () {
          var lastOrder = Object.keys(this.orders).reduce( function (last, next) {
            return Math.max(last, next);
          }, 0);
          return lastOrder + 1;
        },
        addOrder: function (event) {
          console.log("testerrorinfunctionaddorder");
          socket.emit("addOrder"), { orderId: this.getNext(),
            details: { x: event.clientX-10 - event.currentTarget.getBoundingClientRect().left,
              y: event.clientY-10 - event.currentTarget.getBoundingClientRect().top},
              orderItems: ["Beans", "Curry"]
            }
          }
        }
  });

/*
var vm = new Vue({
  el: '#dots',
  data: {
    orders: {},
  },
  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));
  },
  methods: {
    getNext: function () {
      var lastOrder = Object.keys(this.orders).reduce( function (last, next) {
        return Math.max(last, next);
      }, 0);
      return lastOrder + 1;
    },
    addOrder: function (event) {
      socket.emit("addOrder", { orderId: this.getNext(),
        details: { x: event.clientX-10 - event.currentTarget.getBoundingClientRect().left,
          y: event.clientY-10 - event.currentTarget.getBoundingClientRect().top},
          orderItems: ["Beans", "Curry"]
        });
       }
     }
   });*/
