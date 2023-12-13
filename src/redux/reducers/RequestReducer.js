import { DETAIL_RESET } from "../actions/HomepageAction";
import { ERROR_REQUEST, PAGE_REQUEST, SINGLE_REQUEST } from "../actions/RequestAction";

const initialState = {
  content: [
    {
      id: 0,
      habitability: false,
      condominiumFees: 0.0,
      numberOfRooms: [],
      condition: "",
      otherCharacteristics: [],
      regions: [],
      cities: [],
      hamlets: [],
      surface: 0,
      numberOfBathrooms: 0,
      parkingSpace: 0,
      typeOfProperty: [],
      maximal: 0,
      note: "",
      idToRent: false,
    },
  ],
  selected: {
    id: 0,
    habitability: false,
    condominiumFees: 0.0,
    numberOfRooms: [],
    condition: "",
    otherCharacteristics: [],
    regions: [],
    cities: [],
    hamlets: [],
    surface: 0,
    numberOfBathrooms: 0,
    parkingSpace: 0,
    typeOfProperty: [],
    maximal: 0,
    note: "",
    isToRent: false,
  },
  errorMessages: "",
};

const RequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAGE_REQUEST:
      return {
        ...state,
        content: action.payload.content,
      };
    case SINGLE_REQUEST:
      return {
        ...state,
        selected: action.payload,
      };
    case DETAIL_RESET:
      return {
        ...state,
        selected: {
          id: 0,
          habitability: true,
          condominiumFees: 0.0,
          numberOfRooms: [],
          condition: "",
          otherCharacteristics: [],
          regions: [],
          cities: [],
          hamlets: [],
          surface: 0,
          numberOfBathrooms: 0,
          parkingSpace: 0,
          typeOfProperty: [],
          maximal: 0,
          note: "",
          toRent: false,
        },
        errorMessages: action.payload,
      };
    case ERROR_REQUEST:
      return {
        ...state,
        errorMessages: action.payload,
      };
    default:
      return state;
  }
};
export default RequestReducer;
