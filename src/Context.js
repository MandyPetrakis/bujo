import React, { useContext, useState, useEffect } from "react";
import { LocalDate } from "@js-joda/core";

const dateDetails = LocalDate.now();
const month = dateDetails.monthValue();
const year = dateDetails.year();

const CurrentDate = React.createContext();
const Notes = React.createContext();
const CurrentMonth = React.createContext(month);
const CurrentYear = React.createContext(year);
const GoalsList = React.createContext();

export function useCurrentYear() {
  return useContext(CurrentYear);
}

export function useCurrentDate() {
  return useContext(CurrentDate);
}
export function useCurrentMonth() {
  console.log("useCurrentMonth", CurrentMonth);
  return useContext(CurrentMonth || 2);
}

export function useNotes() {
  return useContext(Notes);
}

export function useGoalsList() {
  return useContext(GoalsList);
}

function ContextProvider({ children }) {
  const [today, setToday] = useState();
  const [notes, setNotes] = useState([]);
  const [currentMonth, setCurrentMonth] = useState();
  const [currentYear, setCurrentYear] = useState();
  const [goalsList, setGoalsList] = useState([]);

  useEffect(() => {
    console.log("use effect");
    const dateDetails = LocalDate.now();
    const month = dateDetails.monthValue();
    const year = dateDetails.year();

    setCurrentYear(year);
    setCurrentMonth(month);
    setToday(dateDetails);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/notes")
      .then((r) => r.json())
      .then((data) => setNotes(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((r) => r.json())
      .then((data) => setGoalsList(data));
  }, []);

  function updateNotes(array) {
    setNotes(array);
  }

  function updateGoalsList(array) {
    setGoalsList(array);
  }

  return (
    <GoalsList.Provider value={[goalsList, setGoalsList]}>
      <CurrentYear.Provider value={currentYear}>
        <CurrentMonth.Provider value={currentMonth}>
          <CurrentDate.Provider value={today}>
            <Notes.Provider value={[notes, setNotes]}>
              {children}
            </Notes.Provider>
          </CurrentDate.Provider>
        </CurrentMonth.Provider>
      </CurrentYear.Provider>
    </GoalsList.Provider>
  );
}
export default ContextProvider;
