// Import Actions
import { CREATE_NOTE, DELETE_NOTE } from "../Note/NoteActions";
// Initial State
const initialState = {};

const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE:
      return state.map(lane => {
        if (lane.id === action.laneId) {
          const notes = [...lane.notes, action.note.id];
          return { ...lane, notes };
        }
        return lane;
      });
    default:
      return state;
  }
};

export default NoteReducer;
