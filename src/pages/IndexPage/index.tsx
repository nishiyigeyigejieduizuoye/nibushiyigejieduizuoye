import { MemosState } from "@/state/user";
import {
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import NotesIcon from "@mui/icons-material/Notes";
import { useState } from "react";
import { MemoInfo } from "@/api/schema";
import EditMemo from "@/components/EditMemo";
import CreateMemo from "@/components/CreateMemo";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const navigate = useNavigate();
  const memos = useRecoilValue(MemosState);
  const [selectedMemo, setSelectedMemo] = useState<MemoInfo | null>(null);

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "300px",
            zIndex: "1",
          },
        }}
        open
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem>
            <ListItemButton onClick={() => setSelectedMemo(null)}>
              <ListItemIcon>
                <NoteAddIcon />
              </ListItemIcon>
              <ListItemText primary="新建备忘录" />
            </ListItemButton>
          </ListItem>
          <Divider />
          {memos.map((m) => (
            <ListItem key={m.id}>
              <ListItemButton onClick={() => setSelectedMemo(m)}>
                <ListItemIcon>
                  <NotesIcon />
                </ListItemIcon>
                <ListItemText
                  primary={m.title}
                  secondary={new Date(m.lastModified).toLocaleString()}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Grid
        container
        sx={{
          paddingLeft: {
            xs: 0,
            sm: "310px",
          },
        }}
      >
        <Grid
          item
          xs={12}
          sm={0}
          sx={{
            display: {
              sm: "none",
            },
          }}
        >
          <List>
            <ListItem>
              <ListItemButton onClick={() => navigate("/create")}>
                <ListItemIcon>
                  <NoteAddIcon />
                </ListItemIcon>
                <ListItemText primary="新建备忘录" />
              </ListItemButton>
            </ListItem>
            <Divider />
            {memos.map((m) => (
              <ListItem key={m.id}>
                <ListItemButton
                  onClick={() => navigate("/edit?id=" + m.id.toString())}
                >
                  <ListItemIcon>
                    <NotesIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={m.title}
                    secondary={new Date(m.lastModified).toLocaleString()}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid
          item
          xs={0}
          sm={12}
          flexGrow={1}
          sx={{
            display: { xs: "none", sm: "flex" },
          }}
        >
          {selectedMemo ? (
            <EditMemo
              memo={selectedMemo}
              onDeleted={() => setSelectedMemo(null)}
            />
          ) : (
            <CreateMemo onCreated={setSelectedMemo} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default IndexPage;
