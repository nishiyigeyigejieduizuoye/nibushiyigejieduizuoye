import { LoadingUserInfoState, UserInfoState } from "@/state/user";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Loading from "../Loading";

interface Props {
  children: React.ReactElement<any, any>;
}

const NeedLoginPage = ({ children }: Props) => {
  const loadingUserInfo = useRecoilValue(LoadingUserInfoState);
  const userInfo = useRecoilValue(UserInfoState);
  const navigate = useNavigate();

  if (loadingUserInfo) {
    return <Loading />;
  } else if (userInfo === null) {
    navigate("/login");
  }

  return userInfo !== null ? children : null;
};

export default NeedLoginPage;
