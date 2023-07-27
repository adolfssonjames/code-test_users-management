import { useEffect, useState } from "react";
import { IUsers } from "../../types/userTypes";
import { getUsers } from "../../api/requests";
import { IEvents } from "../../types/eventTypes";
import "./listStyle.scss";

export default function List() {
  const [usersState, setUsersState] = useState<IUsers[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "email">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState<string>("");
  const [title, setTitle] = useState<string>("User List");

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

  const handleSort = (event: IEvents["SelectChangeEvent"]) => {
    const selectedValue = event.target.value;
    setSortBy(selectedValue as "name" | "email");
    setTitle(`Users sorted by ${selectedValue === "name" ? "Name" : "Email"}`);
  };
  const handleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  const handleFilter = (event: IEvents["InputChangeEvent"]) => {
    const { value } = event.target;
    setFilter(value);
    setTitle(value !== "" ? "Filtered Users" : "User List");
  };
  const sortedUsers = usersState
    .filter((user) => {
      const searchValue = filter.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue)
      );
    })
    .sort((userA, userB) => {
      const sortValueA = userA[sortBy].toLowerCase();
      const sortValueB = userB[sortBy].toLowerCase();

      if (sortValueA < sortValueB) {
        return sortDirection === "asc" ? -1 : 1;
      } else if (sortValueA > sortValueB) {
        return sortDirection === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });

  return (
    <div className="list-wrapper">
      <section>
        <h2>{title}</h2>
        <div className="searchBar-wrapper">
          <input
            type="text"
            value={filter}
            onChange={handleFilter}
            placeholder="search user"
          />
        </div>
        <label htmlFor="sort-select">Sort by</label>
        <select
          className="dropDown-list"
          data-testid="sort-by"
          id="sort-select"
          onChange={handleSort}
          value={sortBy}
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
        <label htmlFor="sort-direction">Sort direction</label>
        <button data-testid="sort-direction" onClick={handleSortDirection}>
          {sortDirection === "asc" ? "Ascending" : "Descending"}
        </button>
      </section>
      {sortedUsers.length > 0 ? (
        sortedUsers.map((user) => (
          <section className="user-list" data-testid="user-list" key={user.id}>
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
