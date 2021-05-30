let event_favorites = localStorage.getItem("event_favorites")
  ? JSON.parse(localStorage.getItem("event_favorites"))
  : [];

const venue_favorites = localStorage.getItem("venue_favorites")
  ? JSON.parse(localStorage.getItem("venue_favorites"))
  : [];

const initialState = {
  isLoading: true,
  counter: 0,
  event_favorites: event_favorites,
  venue_favorites: venue_favorites,
};
const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "ADD_EVENT_FAVORITE": {
      console.log("ADD_EVENT_FAVORITE");
      let itemToAdd = action.value;
      let arr = state.event_favorites;
      if (newState.event_favorites.length !== 0) {
        console.log("if");

        let existed_item = newState.event_favorites.find(
          (item) => itemToAdd.id === item.id
        );
        console.log(existed_item);
        if (existed_item === undefined) {
          arr.push(itemToAdd);
          newState.event_favorites = arr;
          console.log(newState.event_favorites);
        } else {
          var removeIndex = newState.event_favorites
            .map(function (item) {
              return item.id;
            })
            .indexOf(itemToAdd.id);

          newState.event_favorites.splice(removeIndex, 1);
        }
      } else {
        console.log("else");
        arr.push(itemToAdd);
        newState.event_favorites = arr;
      }
      localStorage.setItem(
        "event_favorites",
        JSON.stringify(newState.event_favorites)
      );
      // let itemToAdd = action.value;
      // if (newState.cartItem.length != 0) {
      //   console.log("if");
      //   let existed_item = newState.cartItem.find(
      //     (item) => itemToAdd.id === item.id
      //   );
      //   if (existed_item) {
      //     console.log("if if");
      //     existed_item.quantity += 1;
      //     existed_item.totalPrice += itemToAdd.product_price;
      //   } else {
      //     console.log("if else");
      //     itemToAdd.quantity = 1;
      //     itemToAdd.totalPrice = itemToAdd.product_price;
      //     newState.cartItem.push(itemToAdd);
      //   }
      // } else {
      //   console.log("else");
      //   itemToAdd.quantity = 1;
      //   itemToAdd.totalPrice = itemToAdd.product_price;
      //   newState.cartItem.push(itemToAdd);
      // }
      // console.log(newState.cartItem);
      // localStorage.setItem("cart", JSON.stringify(newState.cartItem));
      // //   newState.cartItem = action.value;
      break;
    }
    default:
      return newState;
  }
  return newState;
};

export default reducer;
