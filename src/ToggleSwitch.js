import React from "react";

const ToggleSwitch = ({ isOn, handleToggle, name }) => {
  return (
    <>
      <input
        key={name}
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={name}
        type="checkbox"
      />
      <label className="react-switch-label" htmlFor={name}>
        {name}
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default ToggleSwitch;
