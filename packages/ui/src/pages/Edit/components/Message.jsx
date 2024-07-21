import React, { ReactElement } from "react";
import { RxCross1, RxCheck } from "react-icons/rx";
const variantMapping = {
  error: {
    icon: <RxCross1 />,
    className: "bg-primary-light text-primary",
  },
  success: {
    icon: <RxCheck />,
    className: "bg-secondary-light text-secondary",
  },
};

export const Message = ({ children, variant }) => {
  return (
    <div
      className={`${variantMapping[variant].className} flex items-center gap-2 rounded-2xl p-4`}
    >
      {React.cloneElement(variantMapping[variant].icon, {
        className: "w-6 h-6 flex-shrink-0",
      })}
      {children}
    </div>
  );
};
