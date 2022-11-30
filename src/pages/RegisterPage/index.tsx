import { register } from "@/api/api";
import useMessage from "@/hooks/useMessage";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [, { addMessage }] = useMessage();

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (password !== repeatPassword) {
        addMessage("error", "两次密码不匹配");
        return;
      }
      setLoading(true);
      try {
        await register(username, password);
        navigate("/login");
      } catch (e) {
        addMessage("error", "注册失败");
      } finally {
        setLoading(false);
      }
    },
    [username, password, repeatPassword, setLoading]
  );

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      component="div"
      className="login-page-container"
    >
      <Grid item xs={12} lg={3}>
        <Grid
          container
          component="form"
          direction="column"
          alignItems="center"
          onSubmit={onSubmit}
        >
          <TextField
            variant="outlined"
            label="用户名"
            name="username"
            type="text"
            value={username}
            fullWidth
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <TextField
            variant="outlined"
            label="密码"
            name="password"
            type="password"
            value={password}
            fullWidth
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></TextField>
          <br />
          <TextField
            variant="outlined"
            label="重复密码"
            name="repeatPassword"
            type="password"
            value={repeatPassword}
            fullWidth
            required
            onChange={(e) => {
              setRepeatPassword(e.target.value);
            }}
          ></TextField>
          <br />
          <LoadingButton
            color="primary"
            variant="contained"
            sx={{
              width: "128px",
            }}
            type="submit"
            loading={loading}
          >
            注册
          </LoadingButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
