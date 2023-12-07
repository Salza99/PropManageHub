import { ERROR_REQUEST, PAGE_REQUEST, SINGLE_REQUEST } from "../actions/RequestAction";

const initialState = {
  content: [
    {
      id: 0,
      habitability: true,
      condominiumFees: 0.0,
      numberOfRooms: [],
      condition: "",
      otherCharacteristics: [],
      regions: [],
      cities: [],
      hamlets: [],
      surface: [],
      numberOfBathrooms: [],
      parkingSpace: [],
      typeOfProperty: [],
      maximal: 0,
      note: "",
      toRent: false,
    },
  ],
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
    surface: [],
    numberOfBathrooms: [],
    parkingSpace: [],
    typeOfProperty: [],
    maximal: 0,
    note: "",
    toRent: false,
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
