import debug from "debug";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const logSocket = debug("chat:socket");

// Сокет приходит параметром, открывает его точка входа. Внешний ресурс тем
// самым остаётся на стороне того, кто запускает приложение, и подменить его
// можно снаружи, ничего не меняя внутри.
const init = async (socket) => {

  
  // Обработчики событий сокета живут здесь, вне реакта. Это уровень
  // инициализации приложения, и по шагам проекта их станет больше.
  socket.on("newMessage", logSocket);

  return (
        <BrowserRouter>   
          <App socket = {socket} />
        </BrowserRouter>   

  );
};

export default init;
