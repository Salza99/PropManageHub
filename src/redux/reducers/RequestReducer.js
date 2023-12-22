import { DETAIL_RESET, LOGOUT } from "../actions/HomepageAction";
import {
  ERROR_REQUEST,
  ERROR_REQUEST_RESET,
  PAGE_REQUEST,
  POST_FETCH_OK,
  SINGLE_REQUEST,
} from "../actions/RequestAction";

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
      insertDate: "",
      typeOfProperty: [],
      maximal: 0,
      note: "",
      idToRent: false,
    },
  ],
  pageable: { pageNumber: 0, pageSize: 0 },
  totalPages: 0,
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
    insertDate: "",
    typeOfProperty: [],
    maximal: 0,
    note: "",
    isToRent: false,
  },
  errorMessages: "",
  fetchOk: false,
};

const RequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAGE_REQUEST:
      return {
        ...state,
        content: action.payload.content,
        pageable: action.payload.pageable,
        totalPages: action.payload.totalPages,
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
    case POST_FETCH_OK:
      return {
        ...state,
        fetchOk: action.payload,
      };
    case ERROR_REQUEST:
      return {
        ...state,
        errorMessages: action.payload,
      };
    case ERROR_REQUEST_RESET:
      return {
        ...state,
        errorMessages: action.payload,
      };
    case LOGOUT:
      return {
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
            insertDate: "",
            typeOfProperty: [],
            maximal: 0,
            note: "",
            idToRent: false,
          },
        ],
        pageable: { pageNumber: 0, pageSize: 0 },
        totalPages: 0,
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
          insertDate: "",
          typeOfProperty: [],
          maximal: 0,
          note: "",
          isToRent: false,
        },
        errorMessages: "",
        fetchOk: false,
      };
    default:
      return state;
  }
};
export default RequestReducer;
