import React from "react";

export default function layout(props) {
  return (
    <>
      <h2>Create!</h2>
      <div>{props.children}</div>
    </>
  );
}
