import React from "react";

type NetworkErrorMessageProps = {
  message: string;
  dismiss: React.MouseEventHandler<HTMLButtonElement>;
};

const NetworkErrorMessage: React.FC<NetworkErrorMessageProps> = ({
  message,
  dismiss,
}) => {
  return (
    <div>
      {message}
      <button type="button" onClick={dismiss}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default NetworkErrorMessage;
