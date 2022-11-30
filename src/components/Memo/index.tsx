import { getMemo } from "@/api/api";
import { MemoDetail, MemoInfo } from "@/api/schema";
import useMessage from "@/hooks/useMessage";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import MonacoEditor from "react-monaco-editor";
import remarkGfm from "remark-gfm";
import Loading from "../Loading";
import "./index.css";

interface Props {
  memo: MemoInfo | null;
  showDelete?: boolean;
  defaultTab?: "view" | "edit";
  handleSave?: (memo: MemoDetail) => void;
  handleDelete?: (memo: MemoDetail) => void;
}

const Memo: React.FunctionComponent<Props> = ({
  memo,
  showDelete = true,
  defaultTab = "view",
  handleSave,
  handleDelete,
}: Props) => {
  const [tab, setTab] = useState<"view" | "edit">(defaultTab);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<MemoDetail | null>(null);

  const [, { addMessage }] = useMessage();

  const handleChange = useCallback(
    (newVal: string) => {
      if (detail === null) return;
      setDetail({
        ...detail,
        content: newVal,
      });
    },
    [detail, setDetail]
  );

  const handleTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (detail === null) return;
      setDetail({
        ...detail,
        title: e.target.value,
      });
    },
    [detail, setDetail]
  );

  let body = <></>;
  if (loading) {
    body = <Loading />;
  } else if (detail !== null) {
    if (tab === "view") {
      body = (
        <ReactMarkdown
          children={"# " + detail.title + "\n\n" + detail.content}
          remarkPlugins={[remarkGfm]}
        />
      );
    } else if (tab === "edit") {
      body = (
        <Grid container>
          <Grid item xs={12} sx={{ paddingLeft: "40px" }}>
            <TextField
              label="标题"
              value={detail.title}
              onChange={handleTitleChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "40px" }}>
            <MonacoEditor
              language="markdown"
              height="60vh"
              value={detail.content}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      );
    }
  }

  const [dialogOpen, setDialogOpen] = useState(false);

  let dialog = (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>确认删除</DialogTitle>
      <DialogContent>是否确认删除</DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            setDialogOpen(false);
            handleDelete && handleDelete(detail!);
          }}
        >
          确认
        </Button>
        <Button onClick={() => setDialogOpen(false)}>取消</Button>
      </DialogActions>
    </Dialog>
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      setTab(defaultTab);
      try {
        if (memo) {
          setDetail(await getMemo(memo.id));
        } else {
          setDetail({
            id: -1,
            title: "",
            content: "",
            lastModified: "",
          });
        }
      } catch (e) {
        addMessage("error", "加载备忘录失败");
      } finally {
        setLoading(false);
      }
    })();
  }, [memo, defaultTab, setLoading, setTab, setDetail]);

  return (
    <Grid container justifyContent="center" className="memo-container">
      <Grid item xs={12} sm={10}>
        <Grid container>
          <Grid item xs={10}>
            <Tabs value={tab} onChange={(_event, newVal) => setTab(newVal)}>
              <Tab value="view" label="查看" />
              <Tab value="edit" label="编辑" />
            </Tabs>
          </Grid>
          <Grid item xs></Grid>
          {detail !== null && tab === "edit" && (
            <>
              <Grid item xs={1}>
                <Tooltip title="保存">
                  <IconButton onClick={() => handleSave && handleSave(detail)}>
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              {showDelete ? (
                <>
                  <Grid item xs={1}>
                    <Tooltip title="删除">
                      <IconButton onClick={() => setDialogOpen(true)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  {dialog}
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={10} sx={{ marginTop: "20px" }}>
        {body}
      </Grid>
    </Grid>
  );
};

export default Memo;
