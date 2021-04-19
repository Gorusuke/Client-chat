import { useEffect, useState } from "react";
import { authStateChange } from "../firebase/firebase";

const useUser = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    authStateChange(setUser);
  }, []);

  return user;
};

export default useUser;
