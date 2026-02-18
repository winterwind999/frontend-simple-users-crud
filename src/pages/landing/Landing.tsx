import User from "./form/User";
import UsersList from "./table/UsersList";

const Landing = () => {
  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden">
      <User />
      <div className="min-h-0 flex-1">
        <UsersList />
      </div>
    </div>
  );
};

export default Landing;
