import Header from "../Header";
import Screens from "./Screens";
import Addbtn from "../Addbtn.jsx";
import { TextField, Button } from "@mui/material";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import DeleteIcon from '@mui/icons-material/Delete';

import React, { useState, useEffect } from "react";
import CreatescreenForm from "../React-forms/CreateScreenForm";

import { useLocation } from "react-router-dom";
export default function ScreenContainer({
  showForm,
  onToggleForm,
  listOfScreen,
  setListOfScreen,
}) {

  const location = useLocation();
  const { departmnt } = location.state || {};
  console.log("i got the Department:", departmnt)
  useEffect(() => {
    // You can access departmnt here when it's updated
    console.log("Department in useEffect:", departmnt);
  }, [departmnt]);

  return (
    <div>
      <Header />
      <Screens listOfScreen={listOfScreen} setListOfScreen={setListOfScreen} departmnt={departmnt} />

      {showForm && (
        <CreatescreenForm
          listOfScreen={listOfScreen}
          setListOfScreen={setListOfScreen}
          showForm={showForm}
          onToggleForm={onToggleForm}
        />
      )}
      <Addbtn buttonName={"Add Screen"} showForm={showForm} onToggleForm={onToggleForm} />


      <hr />
    </div>
  );
}
