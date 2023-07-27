import { useEffect, useState } from "react";
import { IUsers } from "../../types/userTypes";
import { getUsers } from "../../api/requests";
export default function Listedusers() {
  const [usersState, setUsersState] = useState<IUsers[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsersState(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);
  console.log(usersState);
  return (
    <div>
      {usersState.length > 0 ? (
        usersState.map((user) => (
          <section data-testid="user-list" className="user-list" key={user.id}>
            <p className="user-name" data-testid="user-name">
              {user.name}
            </p>{" "}
            <a data-testid="user-email" href={`mailto:${user.email}`}>
              {" "}
              {user.email}{" "}
            </a>
          </section>
        ))
      ) : (
        <p>Cannot find users. Please wait or try again later.</p>
      )}
    </div>
  );
}
