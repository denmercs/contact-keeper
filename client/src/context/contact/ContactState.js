import React, { useReducer } from "react";
import { uuid } from "uuid";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Dennis Mercado",
        email: "dennis@test.com",
        phone: "111-111-1111",
        type: "personal",
      },
      {
        id: 2,
        name: "Jackie Dy",
        email: "Jackie@test.com",
        phone: "111-111-1111",
        type: "professional",
      },
      {
        id: 3,
        name: "Tester Testing",
        email: "Jayden@test.com",
        phone: "111-111-1111",
        type: "personal",
      },
    ],
    current: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // add contacts
  const addContact = (contact) => {
    contact.id = uuid.v4();
    dispatch({
      type: ADD_CONTACT,
      payload: contact,
    });
  };

  //delete contacts
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // set current contacts
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // clear current contacts
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // update contacts

  // filter contacts

  // clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
