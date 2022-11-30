import { createMemo, listMemos } from "@/api/api";
import { MemoDetail, MemoInfo } from "@/api/schema";
import Memo from "@/components/Memo";
import useMessage from "@/hooks/useMessage";
import { MemosState } from "@/state/user";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

interface Props {
  onCreated?: (memo: MemoInfo) => void;
}

const CreateMemo = ({ onCreated }: Props) => {
  const [loading, setLoading] = useState(false);
  const [, { addMessage }] = useMessage();
  const setMemos = useSetRecoilState(MemosState);

  const handleCreate = (detail: MemoDetail) => {
    (async () => {
      if (detail.title === "") {
        addMessage("error", "标题不能为空");
        return;
      }
      if (loading) {
        return;
      }
      setLoading(true);
      try {
        await createMemo(detail.title, detail.content);
        const newList = await listMemos();
        setMemos(newList);
        onCreated && onCreated(newList[0]);
        addMessage("success", "创建成功");
      } catch (e) {
        addMessage("error", "创建失败");
      } finally {
        setLoading(false);
      }
    })();
  };
  return (
    <Memo
      memo={null}
      defaultTab="edit"
      showDelete={false}
      handleSave={handleCreate}
    />
  );
};

export default CreateMemo;
