export const ColDefs = {
    orders: [
        { field: 'id', headerName: 'Order Id', width: 100},
        { field: 'day', headerName: 'Order Date', width: 250, valueGetter: (params: any) => {
            if (!params.value) {
              return params.value;
            }
            const date = new Date(params.value * 1000);
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1; // Months start at 0!
            let dd = date.getDate();
            let ddStr = dd.toString()
            let mmStr = mm.toString();

            if (dd < 10) ddStr = '0' + dd.toString();
            if (mm < 10) mmStr = '0' + mm.toString();

            const formattedDate = mmStr + '/' + ddStr + '/' + yyyy;
            return formattedDate
          },},
        { field: 'username', headerName: 'Customer Name', width: 250},
        { field: 'address', headerName: 'Customer Address', width: 400}
    ],
    userOrders: [
        { field: 'id', headerName: 'Order Id', width: 100},
        { field: 'day', headerName: 'Order Date', width: 250, valueGetter: (params: any) => {
            if (!params.value) {
              return params.value;
            }
            const date = new Date(params.value * 1000);
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1; // Months start at 0!
            let dd = date.getDate();
            let ddStr = dd.toString()
            let mmStr = mm.toString();

            if (dd < 10) ddStr = '0' + dd.toString();
            if (mm < 10) mmStr = '0' + mm.toString();

            const formattedDate = mmStr + '/' + ddStr + '/' + yyyy;
            return formattedDate
          },},
        { field: 'dollName', headerName: 'Doll', width: 250},
        { field: 'address', headerName: 'Customer Address', width: 400}
    ],
    users: [
        { field: 'id', headerName: 'User Id', width: 250},
        { field: 'name', headerName: 'Name', width: 250},
        { field: 'username', headerName: 'Username', width: 250},
        { field: 'email', headerName: 'Email Address', width: 250}
    ],
    dollNames: [
        { field: 'id', headerName: 'Id', width: 250},
        { field: 'name', headerName: 'Name', width: 250}
    ],
    dollSizes: [
        { field: 'id', headerName: 'Id', width: 250},
        { field: 'name', headerName: 'Size', width: 250}
    ],
    extras: [
        { field: 'id', headerName: 'Id', width: 250},
        { field: 'name', headerName: 'Available Options', width: 250}
    ]
}