import { useGetBillsQuery } from "./billsApiSlice";
import Bill from "./Bill";
import UseAuth from "../../hooks/useAuth";
import { PulseLoader } from "react-spinners";

const BillsList = () => {

  const { username, roles } = UseAuth()

  const isAdmin = roles.includes("Admin")

  const {
    data: bills,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBillsQuery("billsList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });


  let content;

  if (isLoading) content = <PulseLoader color={"#BADA55"} />

  if (isError) {
    content = <p className="errmsg">{error?.data?.message} </p>;
  }

  if (isSuccess) {
    const { ids, entities } = bills;

    // console.log(username)

    let filteredIds
    if (isAdmin) {
      filteredIds = [...ids]
      // console.log(filteredIds)
    } else {
      filteredIds = ids.filter(billId => entities[billId].user.username === username)

    }

    const billContent = ids?.length && filteredIds.map((billId) => <Bill key={billId} billId={billId} />);

    content = (
      <div> { billContent } </div>
      

    )

    return content

    // const tableContent = ids?.length
    //   ? ids.map((postId) => <Post key={postId} postId={postId} />)
    //   : null;

    // content = (
    //   <table className="table table--posts">
    //     <thead>
    //       <tr>
    //         <th>postname</th>
    //         <th>Roles</th>
    //         <th>Edit</th>
    //       </tr>
    //     </thead>
    //     <tbody>{tableContent}</tbody>
    //   </table>
    // );
  }


};

export default BillsList;
