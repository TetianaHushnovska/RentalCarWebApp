import React from "react";
import { components } from "react-select";

export default function CustomSingleValue({ prefix, ...props }) {
  return (
    <components.SingleValue {...props}>
      {prefix ? `${prefix}${props.data.value}` : props.data.label}
    </components.SingleValue>
  );
}
