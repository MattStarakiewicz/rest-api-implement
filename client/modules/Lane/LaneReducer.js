import { CREATE_LANE, UPDATE_LANE, DELETE_LANE } from "./LaneActions";

const initialState = [];

export default function lanes(state = initialState, action) {
  switch (action.type) {
    case CREATE_LANE:
      return [...state, action.lane];
    case UPDATE_LANE:
      return state.map(lane => {
        return lane.id === action.id ? { ...lane, ...action.lane } : lane;
      });
    case DELETE_LANE:
      return state.filter(lane => lane.id !== action.laneId);
    default:
      return state;
  }
}
