import { xml2json } from 'xml-js';
import { AppConstants } from '../Constants/AppConstants';

export class AppUtil {
    static getResponseBody(xmlbody: any) {
        return JSON.parse(xml2json(xmlbody, {compact: true, spaces: 4, textFn: this.removeJsonTextAttribute}));
    }

    static removeJsonTextAttribute(value: any,parentElement: any){
        try{
            var keyNo = Object.keys(parentElement._parent).length;
            var keyName = Object.keys(parentElement._parent)[keyNo-1];
            parentElement._parent[keyName] = value;
        }
        catch(e){}
    }

    static async getOrders(userId: number) {
        const response = await fetch(AppConstants.serverUrl+ '/UserService/getOrders?userid=' + userId);
        const data = await response.text();
        let orders = AppUtil.getResponseBody(data)?.orders?.order;
        if (!orders) return [];
        return orders instanceof Array? orders : [orders];
    }

    static async getUsers() {
        const response = await fetch(AppConstants.serverUrl+ '/UserService/getUsers');
        const data = await response.text();
        const users = AppUtil.getResponseBody(data)?.users?.user;
        if (!users) return [];
        return users instanceof Array? users : [users];
    }

    static async getDollNames() {
        const response = await fetch(AppConstants.serverUrl+ '/UserService/getDollNames');
        const data = await response.text();
        const dollnames = AppUtil.getResponseBody(data)?.dollNames?.dollname;
        if (!dollnames) return [];
        return dollnames instanceof Array? dollnames : [dollnames];
    }

    static async getDollSizes() {
        const response = await fetch(AppConstants.serverUrl+ '/UserService/getDollSizes');
        const data = await response.text();
        const dollsizes = AppUtil.getResponseBody(data)?.dollSizes?.dollsize;
        if (!dollsizes) return [];
        return dollsizes instanceof Array? dollsizes : [dollsizes];
    }

    static async getExtras() {
        const response = await fetch(AppConstants.serverUrl+ '/UserService/getExtras');
        const data = await response.text();
        const extras = AppUtil.getResponseBody(data)?.extras?.extra;
        if (!extras) return [];
        return extras instanceof Array? extras : [extras];
    }

    static async getCart(userId: number) {
        const response = await fetch(AppConstants.serverUrl+ '/UserService/getCart?userid='+ userId);
        const data = await response.text();
        const cart = AppUtil.getResponseBody(data)?.carts?.cart;
        if (!cart) return [];
        return cart instanceof Array? cart : [cart];
    }

    static async removeCartItem(itemId: number) {
        const response = await fetch(AppConstants.serverUrl+ '/UserService/removeCartItem?cartid='+ itemId);
        let data = await response.text();
        data = AppUtil.getResponseBody(data)?.status?.status;
        if (data === 'Success') {
            return;
        } else {
          alert("Could not remove item. Please contact system admin.");
        }
      }

      static async placeOrder(userid: number, address: string) {
        const response = await fetch(AppConstants.serverUrl+ '/UserService/placeOrder?userid='+ userid +'&address='+ address);
        let data = await response.text();
        data = AppUtil.getResponseBody(data)?.status?.status;
        if (data === 'Success') {
            return true;
        } else {
          return false;
        }
      }

      static isUserAdmin(user: any) {
        return user.username === "Administrator";
      }

}