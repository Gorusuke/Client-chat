import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { authStateChange } from "../firebase/firebase";

const useUser = () => {
  const [user, setUser] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    authStateChange(setUser);
  }, []);

  useEffect(() => {
    user === null && history.push("/login");
  }, [user, history]);

  return user;
};

export default useUser;
