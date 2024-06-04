import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import './AppBar.scss'
import { AppUtil } from '../../Util/AppUtil';

export default function ButtonAppBar(props: any) {

    function onLogoutClick(_event: React.MouseEvent) {
        props.setCurrentPage("SignInPage");
    }
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className='app-bar' position="static">
        <Toolbar>
          {!AppUtil.isUserAdmin(props.user) && <HomeIcon className='home-icon' onClick={()=> {
            props.setCurrentPage('DollSelection');
          }}/>}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Haunted Doll Store
          </Typography>
          {!AppUtil.isUserAdmin(props.user) && <ShoppingCartIcon className='cart-icon' onClick={()=> {
            props.setCurrentPage('Cart');
          }} />}
          {!AppUtil.isUserAdmin(props.user) && <Button color="inherit" onClick={()=> {
            props.setCurrentPage('Orders');
          }}>Order History</Button>}
          <Button color="inherit" onClick={onLogoutClick}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}