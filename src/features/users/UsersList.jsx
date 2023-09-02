import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { PulseLoader } from "react-spinners";
// import { useEffect } from "react";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  // useEffect(() => {
  //   console.log(users)
  // })

  let content;

  if (isLoading) content = <PulseLoader color={"#BADA55"} />

  if (isError) {
    content = <p className="errmsg">{error?.data?.message} </p>;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;
    
      // console.log(tableContent)

    content = (
      <table className="table table--users">
        <thead>
          <tr>
            <th>Username</th>
            <th>Roles</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }
  return content;
};

export default UsersList;
