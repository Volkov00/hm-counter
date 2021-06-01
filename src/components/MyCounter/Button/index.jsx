import React, { useState } from "react";
function Button(props) {
  const { caption, handler } = props;
  return (
    <>
      <button onClick={handler}>{caption}</button>
    </>
  );
}
export default Button;

// Button.propTypes = {
//   caption: PropTypes.string.isRequired,
//   handler: PropTypes.func.isRequired,
// };
