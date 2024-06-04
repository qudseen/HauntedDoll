import React, { useEffect } from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import './Orders.scss'

import { ColDefs } from '../../Constants/ColDefs';
import { AppUtil } from '../../Util/AppUtil';

function Orders(props: any) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const rows: any = await AppUtil.getOrders(props.user.id);
    setRows(rows);
  }

  return (
    <div className='admin-page-container'>
        <Box sx={{ height: '75%', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={ColDefs.userOrders}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
      </Box>

    </div>
  );
}

const memo = React.memo(Orders);
export { memo as Orders };
