import React, { useEffect, useState } from 'react';
import { Button, Card, Container, TextField, Typography } from '@mui/material';

import './Cart.scss';
import { AppUtil } from '../../Util/AppUtil';
import { Close } from '@mui/icons-material';

function Cart(props: any): JSX.Element {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() =>{
        loadData();
    }, []);

    async function loadData() {
        const cart = await AppUtil.getCart(props.user?.id);
        setCartItems(cart);
    }

    function getCartItems(): any {
        const cards: any = []
        cartItems.map((item, key) => {
            cards.push(getCartItem(item,key))
        })
        return cards;
    }

    async function removeItem(id: number) {
        await AppUtil.removeCartItem(id);
        await loadData();
    }

    function getExtras(item: any) {
        return item.extras instanceof String? item.extras : "";
    }

    async function submitOrder() {
        const address = (document.getElementById('address-input-field') as HTMLInputElement).value;
        if (address == "") {
            alert("Address is required to place an order.");
        } else {
            const result = await AppUtil.placeOrder(props.user?.id, address);
            if (result) {
                alert('Order successfully placed.');
                await loadData();
            } else {
                alert('Order could not be placed. Please contact system admin.');
            }
        }
    }

    function getCartItem(item: any, key: number): any {
        return (
            <Card className='cart-item-card' key={key}>
                <div className='cart-item-card-row cart-item-card-row1'>
                    <Typography  variant="body2">Doll name: {item.dollName}</Typography>
                    <Close onClick={() => removeItem(item.id)} titleAccess='Remove item' className='close-icon'/>
                </div>
                <Typography className='cart-item-card-row' variant="body2">Size: {item.dollSize}</Typography>
                <Typography className='cart-item-card-row' variant="body2">Extras: {getExtras(item)}</Typography>
            </Card>
        )
    }

    return (<Container className='cart-container-component' maxWidth="xl">
            {!cartItems.length && (<Typography variant="h4">Your cart is empty.</Typography>)}
            {(cartItems.length > 0) &&<div className='cart-items-wrapper'>
                {getCartItems()}
                <div className='cart-item-card'>
                    <TextField className='cart-item-card-row address-input-field' size='small' id="address-input-field" label="Please enter delivery address" variant="outlined" />
                    <Button className='cart-item-card-row add-button' size='large' variant="contained" onClick={submitOrder}>Submit Order</Button>
                </div>
            </div>}
        </Container>
    )
}

const memo = React.memo(Cart);
export { memo as Cart };