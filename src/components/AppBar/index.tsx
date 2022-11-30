import { logout } from "@/api/api";
import { LoadingUserInfoState, UserInfoState } from "@/state/user";
import {
  AppBar,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

const MemoAppBar = () => {
  const loading = useRecoilValue(LoadingUserInfoState);
  const [userInfo, setUserInfo] = useRecoilState(UserInfoState);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    setUserInfo(null);
    handleClose();
  };

  return (
    <AppBar position="relative" sx={{ zIndex: "10" }}>
      <Toolbar>
        <Typography
          variant="h6"
          onClick={() => navigate("/")}
          sx={{ flexGrow: 1 }}
        >
          Memo
        </Typography>
        {loading ? (
          <></>
        ) : userInfo === null ? (
          <>
            <Button color="inherit" component={Link} to="/login">
              登录
            </Button>
            <Button color="inherit" component={Link} to="/register">
              注册
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              {userInfo.username}
            </Button>
          </>
        )}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>登出</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default MemoAppBar;
