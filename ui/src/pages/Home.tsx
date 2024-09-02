import { useCookies } from "react-cookie";
import UserAppBar from "../components/user-app-bar";
import UserTaskList from "../components/task-list";

function Home() {
  const [cookies] = useCookies();

  return (
    <>
      <UserAppBar />
      <UserTaskList userId={cookies.userId} />
    </>
  );
}

export default Home;
