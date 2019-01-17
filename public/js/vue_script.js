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
    details: {},

    orders: {}
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

    displayOrder: function(event){
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
        y: event.currentTarget.getBoundingClientRect().top};
        this.details = {x: event.clientX-10 - offset.x,
          y: event.clientY - 10 - offset.y};
        },
        addOrder: function (event) {
          document.getElementById("pressedbuttomID").style.display = "block";
          socket.emit("addOrder", { orderId: this.getNext(),
            details: this.details,
            orderItems: this.checkedBurgers,
            orderName: this.deliveryName,
            orderMail: this.deliveryMail,
            orderPayment: this.selectedPaymentMethod,
            orderGender: this.gender
          });
        }
      }
    });
