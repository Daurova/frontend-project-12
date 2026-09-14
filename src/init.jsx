import debug from "debug";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from "./app/providers/query-client-provider";

const logSocket = debug("chat:socket");


const init = async (socket) => {

  
 
  socket.on("newMessage", logSocket);

  return (
      <MantineProvider>      
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>   
            <App socket = {socket} />
          </BrowserRouter>  
        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MantineProvider>
  );
};

export default init;
