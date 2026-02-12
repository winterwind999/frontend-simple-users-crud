import User from "./User";
import UsersList from "./UsersList";

const Landing = () => {
  return (
    <div className="h-full flex flex-col gap-3 overflow-hidden">
      <User />
      <div className="flex-1 min-h-0">
        <UsersList />
      </div>
    </div>
  );
};

export default Landing;
