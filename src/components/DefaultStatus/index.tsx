import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { getUserInfo, listMemos } from "@/api/api";
import { LoadingUserInfoState, MemosState, UserInfoState, listNuclein } from "@/state/user";

const DefaultStatus = () => {
  const setUserInfo = useSetRecoilState(UserInfoState);
  const setMemos = useSetRecoilState(MemosState);
  const settLoadingUserInfo = useSetRecoilState(LoadingUserInfoState);
  const setListNuclein = useSetRecoilState(listNuclein);
  useEffect(() => {
    (async () => {
      try {
        const [userInfo, memos] = await Promise.all([
          getUserInfo(),
          listMemos(),
        ]);
        setUserInfo(userInfo);
        setMemos(memos);
        if(userInfo.username === '田所浩二') {
          setListNuclein([{
              'Nno': '1001', 'Nmname': '阿吉安医疗', 'Snum': 20, 'Nqdate': '2022-12-23', 'Nmdate': '2022-11-30', 'Nmaddr': '福州','Nneq': null
            },{
              'Nno': '1001', 'Nmname': '阿吉安医疗', 'Snum': 15, 'Nqdate': '2022-12-22', 'Nmdate': '2022-11-27', 'Nmaddr': '福州','Nneq': true
            },{
              'Nno': '1001', 'Nmname': '阿吉安医疗', 'Snum': 20, 'Nqdate': '2022-12-23', 'Nmdate': '2022-11-26', 'Nmaddr': '福州', 'Nneq': true
            },
          ]);
        }
      } catch (e) {
      } finally {
        settLoadingUserInfo(false);
      }
    })();
  });
  return <></>;
};

export default DefaultStatus;
