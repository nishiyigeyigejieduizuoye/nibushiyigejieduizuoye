import { useState, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';
import Grid from '@mui/material/Unstable_Grid2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Clock from './components/Clock';
import QRCode from 'qrcode.react';
import Button from '@mui/material/Button';
import { UserInfoState, listNuclein } from "@/state/user";
import {
  Box,
  Typography,
  Paper,
  Container,
  List,
  ListItem,
  Divider,
  Drawer,
} from '@mui/material';

import './index.css'

const Item = styled(Paper)(({ theme, position = 'center' }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: position,
  color: theme.palette.text.secondary,
}));

export default function ProfilePage() {
  const [visible, setVisible] = useState(false);
  const name = useRecoilValue(UserInfoState);
  const [idCode, setIdCode] = useState<String>(name.username === '田所浩二' ? '11451419198101' : '12345678901234');
  const nucleinList = useRecoilValue(listNuclein);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <Container>
            <Grid
              xs={12}
              container
              justifyContent="space-between"
              alignItems="center"
              direction={"row"}
              sx={{ fontSize: { md: '22px', sm: '18px', xs: '16px'} }}
            >
              <Grid xs={2}>
                <Container align="center" justify="center">
                  机构
                </Container>
              </Grid>
              <Grid xs={2}>
                <Container align="center" justify="center" >
                  结果
                </Container>
              </Grid>
              <Grid xs={2}>
                <Container align="center" justify="center">
                  人数
                </Container>
              </Grid>
              <Grid xs={2}>
                <Container align="center" justify="center">
                  时间
                </Container>
              </Grid>
              <Grid xs={2}>
                <Container align="center" justify="center">
                  地点
                </Container>
              </Grid>
            </Grid>
          </Container>
        </ListItem>
      <Divider />
      {nucleinList.map((e, idx) => (
        <ListItem>
          <Container>
            <Grid
              xs={12}
              container
              justifyContent="space-between"
              alignItems="center"
              direction={"row"}
              sx={{ fontSize: { md: '18px', sm: '15px', xs: '12px'} }}
            >
              <Grid xs={2}>
                <Container align="center" justify="center">
                  {e.Nmname}
                </Container>
              </Grid>
              <Grid xs={2}>
                <Container align="center" justify="center">
                  {e.Nneq === null ? '未出' : (e.Nneq ? '阴性' : '阳性')}
                </Container>
              </Grid>
              <Grid xs={2}>
                <Container align="center" justify="center">
                  {e.Snum}
                </Container>
              </Grid>
              <Grid xs={2}>
                <Container align="center" justify="center">
                  {e.Nmdate}
                </Container>
              </Grid>
              <Grid xs={2}>
                <Container align="center" justify="center">
                  {e.Nmaddr}
                </Container>
              </Grid>
            </Grid>
          </Container>
        </ListItem>
      ))}
      </List>
    </Box>
  );
  
  return (
    <Box sx={{ flexGrow: 1, marginLeft: '10px', marginRight: '10px' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 1, md: 2 }}>
        <Grid xs={12} md={12} lg={12}/>
        <Grid xs={12} md={12} lg={12}/>

        <Grid xs={12} md={5} lg={4}
          align="center"
          justify="center"
          direction="column"
        >
          <Container maxWidth="sm" align = "center" justify = "center">
            <Item position={'left'}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  marginLeft: { xs: '0px', md: '10px'},
                  display: { md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 1000,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                {name.username}
              </Typography>
              <br/>
              <IconButton aria-label="visible-off"
                onClick={() => { setVisible(!visible); ; }}
              >
                { visible ?
                  <VisibilityIcon /> : <VisibilityOffIcon/>
                }
              </IconButton>{ visible ? idCode : (() => { return idCode[0] + idCode[1] + '***********' + idCode[13]; })()}
            </Item>
          </Container>
        </Grid>
        <Grid container xs={12} md={7} lg={8} rowSpacing={1} columnSpacing={{ xs: 0, sm: 1, md: 2 }}>
          <Grid xs={6} lg={3}>
            <Item>
              <Box
                id="category-a"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                近期核酸记录 1
              </Box>
              <Box aria-labelledby="category-a">
                <br/> {nucleinList.length > 0 ? nucleinList[0].Nmdate : ""}
                <br/> {nucleinList.length > 0 ? nucleinList[0].Nneq === null ? '未出' : (nucleinList[0].Nneq ? '阴性' : '阳性') : "无"}
              </Box>
            </Item>
          </Grid>
          <Grid xs={6} lg={3}>
            <Item>
              <Box
                id="category-b"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                近期核酸记录 2
              </Box>
              <Box aria-labelledby="category-b">
                <br/> {nucleinList.length > 1 ? nucleinList[1].Nmdate : ""}
                <br/> {nucleinList.length > 1 ? nucleinList[1].Nneq === null ? '未出' : (nucleinList[1].Nneq ? '阴性' : '阳性') : "无"}
              </Box>
            </Item>
          </Grid>
          <Grid xs={6} lg={3} sx={{display: { md: 'inline' , sm: 'none', xs: 'none' }}}>
            <Item>
              <Box
                id="category-c"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                近期核酸记录 3
              </Box>
              <Box aria-labelledby="category-c">
                <br/> {nucleinList.length > 2 ? nucleinList[2].Nmdate : ""}
                <br/> {nucleinList.length > 2 ? nucleinList[2].Nneq === null ? '未出' : (nucleinList[2].Nneq ? '阴性' : '阳性') : "无"}
              </Box>
            </Item>
          </Grid>
          <Grid xs={6} lg={3} sx={{display: { md: 'inline' , sm: 'none', xs: 'none' }}}>
            <Item>
              <Box
                id="category-d"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                近期核酸记录 4
              </Box>
              <Box aria-labelledby="category-d">
                <br/> {nucleinList.length > 3 ? nucleinList[3].Nmdate : ""}
                <br/> {nucleinList.length > 3 ? nucleinList[3].Nneq === null ? '未出' : (nucleinList[3].Nneq ? '阴性' : '阳性') : "无"}
              </Box>
            </Item>
          </Grid>
        </Grid>
        <Grid xs={12}><br/></Grid>
        <Grid xs={12}>
          <Grid container spacing={3}>
            <Grid xs>
              
            </Grid>
            <Grid xs={'auto'}>
              <Item>
                <QRCode value={toString(name)} size={256} id="qrCode" fgColor='#00FF00'/>
              </Item>
            </Grid>
            <Grid xs>
              
            </Grid>
          </Grid>
        </Grid>

        <Grid xs={12}>
          <Container maxWidth="sm" align = "center" justify = "center">
            <Clock/>
          </Container>
        </Grid>
        <></>
        <Grid
          xs={12}
          container
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: 'column', sm: 'row' }}
          sx={{ fontSize: '12px' }}
        >
          <Grid sx={{ order: { xs: 2, sm: 1 } }}>
            <Item>© FZU 数据库作业</Item>
          </Grid>
          <Grid container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
            <Grid>
              <Item>
              {(['bottom'] as const).map((anchor) => (
                <Fragment key={anchor}>
                  <Button onClick={toggleDrawer(anchor, true)}>查询核酸记录</Button>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </Fragment>
              ))}
              </Item>
            </Grid>
            <Grid>
            <Item><Button variant="text">管理员后台</Button></Item>
            </Grid>
            <Grid>
              <Item><Button variant="text">反馈</Button></Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}