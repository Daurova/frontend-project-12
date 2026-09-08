import debug from "debug";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

const logSocket = debug("chat:socket");


const init = async (socket) => {

  
 
  socket.on("newMessage", logSocket);

  return (
      <MantineProvider>      // ← обертка 1
        <BrowserRouter>   
          <App socket = {socket} />
        </BrowserRouter>   
      </MantineProvider>
  );
};

export default init;
