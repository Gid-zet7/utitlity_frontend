import { Outlet } from "react-router-dom";
import BillHeader from "./BillHeader";
import BillFooter from "./BillFooter";



const BillLayout = () => {
  return (
    <>
      <BillHeader />
      <main className="App">
        <Outlet />
      </main>
      <BillFooter />
    </>
    
  );
};

export default BillLayout;
