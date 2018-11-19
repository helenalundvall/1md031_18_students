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
        document.getElementById("pressedbuttomID").style.display = "block";
      },
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
                          y: event.clientY - 10 - offset.y}

// Write a new function called "displayOrder" which is triggered for click-events
//  on the map. Instead of sending the data over the socket, the function should
//   update the order object of the Vue function right away by not appending but
//   overwriting what is currently in the object. This is how we ensure that a
//   customer can only set one location.

// Instead of the orderID, display a "T"
//   for "target" in the circle for the customer. Remember that we only need to
//   store the position information at this stage - we have no information about
//    the order-id or the orderItems. Ensure that your code is working by
//    clicking on the map. You should now see a black circle with a "T" inside
//    which is not visible in the dispatcher view and which changes the location
//    when you click at the map again.

        },
        addOrder: function (event) {
          console.log("testerrorinfunctionaddorder");
          socket.emit("addOrder", { orderId: this.getNext(),
                     details: { x: event.clientX-10 - event.currentTarget.getBoundingClientRect().left,
                       y: event.clientY-10 - event.currentTarget.getBoundingClientRect().top},
                       orderItems: ["Beans", "Curry"]
                     });
          }
        }
  });
