import { logout } from "@/redux/slices/authSlice";
import { useEffect } from "react";
import { useAppDispatch } from "./reduxHooks";
import strings from "@/constants/strings.constant";

const useAutoLogout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const expirationDate = localStorage.getItem(
      "__Ojygiuh94s__6fbkygsdiefkjbv48867"
    );
    if (expirationDate) {
      const now = new Date();
      const expirationDateObj = new Date(parseInt(expirationDate, 10));
      if (now >= expirationDateObj) {
        dispatch(logout());
        alert(strings.TEXTS.AUTO_LOGOUT);
      }
    }
  }, [dispatch]);
};

export default useAutoLogout;
