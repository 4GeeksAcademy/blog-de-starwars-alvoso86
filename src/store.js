
export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    characters: [],
    favorites: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

      case "set_character":
      return {
        ...store,
        characters: [...store.characters, action.payload],
      };
      
      case "add_to_favorites":
      if (store.favorites.some((fav) => fav.uid === action.payload.uid && fav.type === action.payload.type)) {
        return store; 
      }
      return {
        ...store,
        favorites: [...store.favorites, action.payload], 
      };

    case "remove_from_favorites":
      return {
        ...store,
        favorites: store.favorites.filter(
          (fav) => fav.uid !== action.payload.uid || fav.type !== action.payload.type
        ), 
      };
      



    default:
      throw Error('Unknown action.');
  }    
}
