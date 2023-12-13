import { useState } from "react";
import { useSelector } from "react-redux";
import ChipRooms from "./MuiSupportComponents/ChipRooms";
import ChipOtherCharacteristics from "./MuiSupportComponents/ChipOtherCharacteristics";
import ChipTypeOfProperty from "./MuiSupportComponents/ChipTypeOfProperty";
import { Form } from "react-bootstrap";

const CreateRequestForm = () => {
  const [body, setBody] = useState({
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
  });

  const customerId = useSelector((state) => state.customer.selected.id);

  return (
    <div>
      <Form>
        <ChipRooms setBody={setBody} body={body} />
        <ChipOtherCharacteristics setBody={setBody} body={body} />
        <ChipTypeOfProperty setBody={setBody} body={body} />
        <button className="form-button">Aggiungi</button>
      </Form>
    </div>
  );
};
export default CreateRequestForm;
