import UserFormWithUser from "./form/UserForm";
import UsersList from "./table/UsersList";

const Landing = () => {
  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden">
      <UserFormWithUser />
      <div className="min-h-0 flex-1">
        <UsersList />
      </div>
    </div>
  );
};

export default Landing;
