import React from "react";

const fontSizeMap = {
  sm: "text-sm",
  lg: "text-lg",
  xl: "text-xl",
};

function Button({ text, type, onClick=()=>{}, fontSize="base" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer ${fontSizeMap[fontSize]||""}`}
    >
      {text}
    </button>
  );
}

export default Button;
