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
      let itemToAdd = action.value;
      let arr = state.event_favorites;
      if (newState.event_favorites.length !== 0) {
        let existed_item = newState.event_favorites.find(
          (item) => itemToAdd.id === item.id
        );
        if (existed_item === undefined) {
          arr.push(itemToAdd);
          newState.event_favorites = arr;
        } else {
          var removeIndex = newState.event_favorites
            .map(function (item) {
              return item.id;
            })
            .indexOf(itemToAdd.id);

          newState.event_favorites.splice(removeIndex, 1);
        }
      } else {
        arr.push(itemToAdd);
        newState.event_favorites = arr;
      }
      localStorage.setItem(
        "event_favorites",
        JSON.stringify(newState.event_favorites)
      );
      break;
    }

    case "ADD_VENUE_FAVORITE": {
      let itemToAdd = action.value;
      let arr = state.venue_favorites;
      if (newState.venue_favorites.length !== 0) {
        let existed_item = newState.venue_favorites.find(
          (item) => itemToAdd.id === item.id
        );
        if (existed_item === undefined) {
          arr.push(itemToAdd);
          newState.venue_favorites = arr;
        } else {
          var removeIndex = newState.venue_favorites
            .map(function (item) {
              return item.id;
            })
            .indexOf(itemToAdd.id);

          newState.venue_favorites.splice(removeIndex, 1);
        }
      } else {
        arr.push(itemToAdd);
        newState.venue_favorites = arr;
      }
      localStorage.setItem(
        "venue_favorites",
        JSON.stringify(newState.venue_favorites)
      );
      break;
    }

    default:
      return newState;
  }
  return newState;
};

export default reducer;
