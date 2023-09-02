import { store } from "../../app/store";
import { billApiSlice } from "../bills/billsApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {

    store.dispatch(billApiSlice.util.prefetch("getBills", "billsList", { force: true }))
    store.dispatch(usersApiSlice.util.prefetch("getUsers", "usersList", { force: true }))

  }, []);

  return <Outlet />;
};

export default Prefetch;
