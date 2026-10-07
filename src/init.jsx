import debug from "debug";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from "./app/providers/query-client-provider";
import { I18nextProvider } from "react-i18next";
import i18n from "./shared/i18n/index";

const logSocket = debug("chat:socket");


const init = async (socket) => {

  
 
  socket.on("newMessage", logSocket);

  return (
        <I18nextProvider i18n={i18n}>            

      <MantineProvider>      
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>   
            <App socket = {socket} />
          </BrowserRouter>  
        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MantineProvider>
      </I18nextProvider>
  );
};

export default init;
