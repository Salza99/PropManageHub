import { DETAIL_RESET, LOGOUT } from "../actions/HomepageAction";
import {
  ERROR_PROPERTY,
  ERROR_PROPERTY_RESET,
  PAGE_PROPERTY,
  POST_PROPERTY_OK,
  POST_PROPERTY_RESET,
  POST_PROPERTY_SELECT_DATA,
  PUT_PROPERTY_OK,
  PUT_PROPERTY_RESET,
  SINGLE_PROPERTY,
} from "../actions/PropertyAction";

const initialState = {
  content: [
    {
      id: 0,
      habitability: true,
      condominiumFees: 0.0,
      numberOfRooms: [],
      condition: "",
      otherCharacteristics: null,
      floor: 0,
      surface: 0,
      numberOfFloors: 0,
      numberOfBathrooms: 0,
      parkingSpace: 0,
      yearOfConstruction: 0,
      insertDate: "",
      energyClass: "",
      typeOfProperty: "",
      price: 0,
      description: null,
      availability: true,
      address: {
        id: 0,
        region: "",
        city: "",
        hamlet: "",
        postalCode: 0,
        street: "",
        houseNumber: 0,
      },
      heating: "",
      toRent: false,
    },
  ],
  pageable: { pageNumber: 0, pageSize: 0 },
  totalPages: 0,
  selected: {
    id: 0,
    habitability: true,
    condominiumFees: 0.0,
    numberOfRooms: [],
    condition: "",
    otherCharacteristics: null,
    floor: 0,
    surface: 0,
    numberOfFloors: 0,
    numberOfBathrooms: 0,
    parkingSpace: 0,
    yearOfConstruction: 0,
    energyClass: "",
    typeOfProperty: "",
    price: 0,
    description: null,
    availability: true,
    address: {
      id: 0,
      region: "",
      city: "",
      hamlet: "",
      postalCode: 0,
      street: "",
      houseNumber: 0,
    },
    heating: "",
    toRent: false,
  },
  postProperty: false,
  errorMessages: "",
  putProperty: false,
};

const PropertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAGE_PROPERTY:
      return {
        ...state,
        content: action.payload.content,
        pageable: action.payload.pageable,
        totalPages: action.payload.totalPages,
      };
    case SINGLE_PROPERTY:
      return {
        ...state,
        selected: action.payload,
      };
    case POST_PROPERTY_SELECT_DATA:
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
          otherCharacteristics: null,
          floor: 0,
          surface: 0,
          numberOfFloors: 0,
          numberOfBathrooms: 0,
          parkingSpace: 0,
          yearOfConstruction: 0,
          energyClass: "",
          typeOfProperty: "",
          price: 0,
          description: null,
          availability: true,
          address: {
            id: 0,
            region: "",
            city: "",
            hamlet: "",
            postalCode: 0,
            street: "",
            houseNumber: 0,
          },
          heating: "",
          toRent: false,
        },
        errorMessage: action.payload,
      };
    case POST_PROPERTY_OK:
      return {
        ...state,
        postProperty: action.payload,
      };
    case ERROR_PROPERTY:
      return { ...state, errorMessages: action.payload };
    case ERROR_PROPERTY_RESET:
      return {
        ...state,
        errorMessages: action.payload,
      };
    case POST_PROPERTY_RESET:
      return {
        ...state,
        postProperty: action.payload,
      };
    case PUT_PROPERTY_OK:
      return {
        ...state,
        putProperty: action.payload,
      };
    case PUT_PROPERTY_RESET:
      return {
        ...state,
        putProperty: action.payload,
      };
    case LOGOUT:
      return {
        content: [
          {
            id: 0,
            habitability: true,
            condominiumFees: 0.0,
            numberOfRooms: [],
            condition: "",
            otherCharacteristics: null,
            floor: 0,
            surface: 0,
            numberOfFloors: 0,
            numberOfBathrooms: 0,
            parkingSpace: 0,
            yearOfConstruction: 0,
            insertDate: "",
            energyClass: "",
            typeOfProperty: "",
            price: 0,
            description: null,
            availability: true,
            address: {
              id: 0,
              region: "",
              city: "",
              hamlet: "",
              postalCode: 0,
              street: "",
              houseNumber: 0,
            },
            heating: "",
            toRent: false,
          },
        ],
        pageable: { pageNumber: 0, pageSize: 0 },
        totalPages: 0,
        selected: {
          id: 0,
          habitability: true,
          condominiumFees: 0.0,
          numberOfRooms: [],
          condition: "",
          otherCharacteristics: null,
          floor: 0,
          surface: 0,
          numberOfFloors: 0,
          numberOfBathrooms: 0,
          parkingSpace: 0,
          yearOfConstruction: 0,
          energyClass: "",
          typeOfProperty: "",
          price: 0,
          description: null,
          availability: true,
          address: {
            id: 0,
            region: "",
            city: "",
            hamlet: "",
            postalCode: 0,
            street: "",
            houseNumber: 0,
          },
          heating: "",
          toRent: false,
        },
        postProperty: false,
        errorMessages: "",
        putProperty: false,
      };
    default:
      return state;
  }
};
export default PropertyReducer;
