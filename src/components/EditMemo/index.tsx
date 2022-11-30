import { deleteMemo, listMemos, patchMemo } from "@/api/api";
import { MemoDetail, MemoInfo } from "@/api/schema";
import Memo from "@/components/Memo";
import useMessage from "@/hooks/useMessage";
import { MemosState } from "@/state/user";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

interface Props {
  memo: MemoInfo;
  onDeleted?: () => void;
}

const EditMemo = ({ memo, onDeleted }: Props) => {
  const [loading, setLoading] = useState(false);
  const [, { addMessage }] = useMessage();
  const setMemos = useSetRecoilState(MemosState);

  const handleSave = (detail: MemoDetail) => {
    (async () => {
      if (loading) {
        return;
      }
      setLoading(true);
      try {
        await patchMemo(detail);
        setMemos(await listMemos());
        addMessage("success", "保存成功");
      } catch (e) {
        addMessage("error", "保存失败");
      } finally {
        setLoading(false);
      }
    })();
  };

  const handleDelete = (detail: MemoDetail) => {
    (async () => {
      if (loading) {
        return;
      }
      setLoading(true);
      try {
        await deleteMemo(detail.id);
        setMemos(await listMemos());
        onDeleted && onDeleted();
        addMessage("success", "删除成功");
      } catch (e) {
        addMessage("error", "删除失败");
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <>
      <Memo memo={memo} handleSave={handleSave} handleDelete={handleDelete} />
    </>
  );
};

export default EditMemo;
