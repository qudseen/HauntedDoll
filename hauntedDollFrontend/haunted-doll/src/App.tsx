import React from 'react';
import { SignInPage } from './Components/SignInPage/SignInPage';
import { AdminPage } from './Components/AdminPage/AdminPage';
import { Cart } from './Components/Cart/Cart';
import { Container } from '@mui/material';
import AppBar from './Components/AppBar/AppBar';

import './App.scss';
import { DollSelection } from './Components/DollSelection/DollSelection';
import { Orders } from './Components/Orders/Orders';

function App(): JSX.Element {
    const [currentPage, setCurrentPage] = React.useState('SignInPage');
    const [user, setUser] = React.useState(null);
    
    return (<div className='App-div'>
        {currentPage !== 'SignInPage' && (<AppBar user={user} setCurrentPage = {setCurrentPage}></AppBar>)}
        <Container className='App-container-component' maxWidth="xl">
            {currentPage === 'SignInPage' && (<SignInPage setUser = {setUser} setCurrentPage = {setCurrentPage}></SignInPage>)}
            {currentPage === 'AdminPage' && (<AdminPage user={user}></AdminPage>)}
            {currentPage === 'DollSelection' && (<DollSelection user={user}></DollSelection>)}
            {currentPage === 'Cart' && (<Cart user={user} setCurrentPage = {setCurrentPage}></Cart>)}
            {currentPage === 'Orders' && (<Orders user={user}></Orders>)}
        </Container>
    </div>)
}

const memo = React.memo(App);
export { memo as App };