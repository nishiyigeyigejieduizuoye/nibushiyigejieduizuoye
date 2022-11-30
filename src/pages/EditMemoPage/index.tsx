import EditMemo from "@/components/EditMemo";
import { MemosState } from "@/state/user";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const EditMemoPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const memos = useRecoilValue(MemosState);
  const memoId = searchParams.get("id");

  const memo = useMemo(() => {
    return memos.find((m) => m.id.toString() === memoId);
  }, [memos, memoId]);

  return memo ? (
    <EditMemo memo={memo} onDeleted={() => navigate("/")} />
  ) : (
    <></>
  );
};

export default EditMemoPage;
