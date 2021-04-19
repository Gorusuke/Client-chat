import { BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./Components/pages/Login";
import SignUp from "./Components/pages/SignUp";
import Chat from "./Components/pages/Chat";

import { Protected } from "./Components/routes/Protected";
import { Public } from "./Components/routes/Public";
import "./globals.css";

function App() {
  return (
    <Router>
      <Switch>
        <Public exact path="/login" component={Login} />
        <Public exact path="/new-account" component={SignUp} />
        <Protected exact path="/" component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;
