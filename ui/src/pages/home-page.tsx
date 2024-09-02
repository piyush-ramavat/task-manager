import { useCookies } from "react-cookie";
import UserTaskList from "../components/task-list";
import PageContainer from "../components/page-container";

function Home() {
  const [cookies] = useCookies();

  return (
    <PageContainer>
      <UserTaskList userId={cookies.userId} />
    </PageContainer>
  );
}

export default Home;
