import React from "react";
import { Snackbar, Alert } from "@mui/material";
import useMessage from "@/hooks/useMessage";

const MESSAGE_DISPLAY_DURATION = 3000;

const GlobalMessage: React.FC = () => {
  const [messages, { hideMessage }] = useMessage();
  return (
    <>
      {messages.map((message, index) => (
        <Snackbar
          key={`${message.message}-${index}`}
          open={message.isShow}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          autoHideDuration={MESSAGE_DISPLAY_DURATION}
          onClose={() => {
            hideMessage(message);
          }}
        >
          <Alert
            onClose={() => {
              hideMessage(message);
            }}
            severity={message.type}
            sx={{ width: "100%" }}
          >
            {message.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default GlobalMessage;
