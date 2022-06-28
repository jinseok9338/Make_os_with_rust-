import { createSignal, onCleanup } from "solid-js";
import {
  ProcessDirectoryProvider,
  useProcess,
} from "./context/processDirectory";
import Main from "./main";
import "./style/desktop.scss";
import "./style/global.scss";
import "./style/variables.scss";
import "./style/window.scss";

const App = () => {
  return (
    <ProcessDirectoryProvider>
      <Main />
    </ProcessDirectoryProvider>
  );
};

export default App;