import React from "react";
import { Provider } from "react-redux";
import { useStore } from "../../redux/store";
const CustomProvider = (props) => {
  const store = useStore(props.initialReduxState);
  return <Provider store={store}>{props.children}</Provider>;
};

export default CustomProvider;
