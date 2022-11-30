import CreateMemo from "@/components/CreateMemo";
import { useNavigate } from "react-router-dom";

const CreateMemoPage = () => {
  const navigate = useNavigate();
  return (
    <CreateMemo
      onCreated={(memo) => navigate("/edit?id=" + memo.id.toString())}
    />
  );
};

export default CreateMemoPage;
