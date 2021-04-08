import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/pages/Login";
import SignUp from "./Components/pages/SignUp";
import Chat from "./Components/pages/Chat";

// import { Protected } from "./component/routes/Protected";
// import { Public } from "./component/routes/Public";
import "./globals.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/new-account" component={SignUp} />
        <Route exact path="/" component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;
