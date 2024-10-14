import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage } from "../features/chatSlice";
import {
  Box,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/system";

const ChatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
}));

const ChatWindow = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[200],
  borderTopLeftRadius: "16px",
  borderTopRightRadius: "16px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
}));

const Message = styled(Typography)(({ theme, isCurrentUser }) => ({
  alignSelf: isCurrentUser ? "flex-end" : "flex-start",
  backgroundColor: isCurrentUser
    ? theme.palette.primary.main
    : theme.palette.secondary.main,
  color: theme.palette.common.white,
  borderRadius: "20px",
  padding: theme.spacing(1.5, 2),
  margin: theme.spacing(1, 0),
  maxWidth: "70%",
  wordWrap: "break-word",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
}));

const InputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderBottomLeftRadius: "16px",
  borderBottomRightRadius: "16px",
  boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  marginRight: theme.spacing(1),
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    "& fieldset": {
      borderColor: theme.palette.grey[400],
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const ChatComponent = () => {
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      dispatch(sendMessage({ text: inputValue, user: "User1" }));
      setInputValue("");
      setTimeout(() => {
        dispatch(sendMessage({ text: "Hello from User2!", user: "User2" }));
      }, 1000);
    }
  };

  useEffect(() => {
    const chatWindow = document.getElementById("chat-window");
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatContainer>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Chat Room</Typography>
        </Toolbar>
      </AppBar>
      <ChatWindow id="chat-window">
        {messages.map((msg, index) => (
          <Message
            key={index}
            variant="body1"
            isCurrentUser={msg.user === "User1"}
          >
            <strong>{msg.user}:</strong> {msg.text}
            <span
              style={{ fontSize: "0.8em", color: "white", marginLeft: "5px" }}
            >
              {msg.timestamp}
            </span>
          </Message>
        ))}
      </ChatWindow>
      <InputContainer>
        <StyledTextField
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message"
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatComponent;
