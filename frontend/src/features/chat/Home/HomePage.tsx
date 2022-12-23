import * as React from "react";
import InputView from "../InputView/InputView";
import MessageWindow from "../MessagesWindow/MessageWindow";
import style from "./HomePage.module.css";

function HomePage(): JSX.Element {
  return <div className={style.chatView}>
    <MessageWindow/>
    <InputView/>
  </div>;
}

export default HomePage;
