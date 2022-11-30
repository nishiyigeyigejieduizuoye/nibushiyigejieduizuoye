import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { getUserInfo, listMemos } from "@/api/api";
import { LoadingUserInfoState, MemosState, UserInfoState } from "@/state/user";

const DefaultStatus = () => {
  const setUserInfo = useSetRecoilState(UserInfoState);
  const setMemos = useSetRecoilState(MemosState);
  const settLoadingUserInfo = useSetRecoilState(LoadingUserInfoState);
  useEffect(() => {
    (async () => {
      try {
        const [userInfo, memos] = await Promise.all([
          getUserInfo(),
          listMemos(),
        ]);
        setUserInfo(userInfo);
        setMemos(memos);
      } catch (e) {
      } finally {
        settLoadingUserInfo(false);
      }
    })();
  });
  return <></>;
};

export default DefaultStatus;
