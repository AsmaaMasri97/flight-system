import { useState } from "react";
import styles from "../styles/InputField.module.css";
export const DropdownButton = (props) => {
  return (
    <select
      className={styles.select}
      onChange={props.onChange}
      value={props.value}
    >
      {props.data.length > 0 ? (
        props.data.map((place, i) => (
          <>
            <option key={i} selected disabled hidden>
              {props.placeholde}
            </option>
            <option key={i} value={place.value}>
              {place.value}
            </option>
          </>
        ))
      ) : (
        <option>No data</option>
      )}
    </select>
  );
};
export const InputButton = (props) => {
  return (
    <div>
      <button
        className={styles[props.className]}
        name={props.name}
        onClick={props.onClick}
      >
        {props.value}
      </button>
    </div>
  );
};
