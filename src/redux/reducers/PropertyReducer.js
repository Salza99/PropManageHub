import { DETAIL_RESET } from "../actions/HomepageAction";
import { ERROR_PROPERTY, PAGE_PROPERTY, SINGLE_PROPERTY } from "../actions/PropertyAction";

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
  errorMessage: "",
};

const PropertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAGE_PROPERTY:
      return {
        ...state,
        content: action.payload.content,
      };
    case SINGLE_PROPERTY:
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
    case ERROR_PROPERTY:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};
export default PropertyReducer;
