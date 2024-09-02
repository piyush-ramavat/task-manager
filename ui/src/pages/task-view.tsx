import { useCookies } from "react-cookie";
import PageContainer from "../components/page-container";
import UserTaskDetails from "../components/task-details";

function TaskView() {
  const [cookies] = useCookies();

  return (
    <PageContainer>
      <UserTaskDetails userId={cookies.userId} />
    </PageContainer>
  );
}

export default TaskView;
