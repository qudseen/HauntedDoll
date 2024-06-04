import React, { useEffect } from 'react';
import { useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import './AdminPage.scss'
import { ColDefs } from '../../Constants/ColDefs';
import { AppUtil } from '../../Util/AppUtil';
import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button/Button';
import { AppConstants } from '../../Constants/AppConstants';

function AdminPage(props: any) {
  const [currentOption, setCurrentOption] = useState('orders');
  const [colDef, setColDef] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    onChange({}, 'orders');
  }, [])

  async function onChange(_event: any, value: string) {
    setCurrentOption(value);
    console.log(props.user?.id);
    let rows = [];
    switch (value) {
      case 'orders':  setColDef(ColDefs.orders);
                      rows = await AppUtil.getOrders(0) 
                      setRows(rows);
                      break;
      case 'users':   setColDef(ColDefs.users);
                      rows = await AppUtil.getUsers();
                      setRows(rows);
                      break;
      case 'dollNames':  setColDef(ColDefs.dollNames);
                      rows = await AppUtil.getDollNames();
                      setRows(rows);
                      break;
      case 'dollSizes':  setColDef(ColDefs.dollSizes);
                      rows = await AppUtil.getDollSizes()
                      setRows(rows);
                      break;
      case 'extras':  setColDef(ColDefs.extras);
                      rows = await AppUtil.getExtras();
                      setRows(rows);
                      break;

      default:        setColDef(ColDefs.orders);
                      setRows([]);
                      break;
    }
  }

  async function addItem() {
      const value = (document.getElementById('add-input-field') as HTMLInputElement)?.value;
      if (value == "") return;
      const response = await fetch(AppConstants.serverUrl+ '/UserService/addItem?table=' + currentOption + '&value='+value);
      let data = await response.text();
      data = AppUtil.getResponseBody(data)?.status?.status;
      if (data === 'Success') {
        onChange({}, currentOption);
        (document.getElementById('add-input-field') as HTMLInputElement).value = "";
      } else {
        alert("Could not add the field. Please contact system admin.");
      }
  }

  return (
    <div className='admin-page-container'>
        <FormControl className="admin-radio-buttons">
            <FormLabel id="demo-radio-buttons-group-label">Administrator Panel</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="orders"
                name="radio-buttons-group"
                value={currentOption}
                onChange={onChange}
            >
                <FormControlLabel value="orders" control={<Radio />} label="Orders" />
                <FormControlLabel value="users" control={<Radio />} label="Users" />
                <FormControlLabel value="dollNames" control={<Radio />} label="Doll Names" />
                <FormControlLabel value="dollSizes" control={<Radio />} label="Doll Sizes" />
                <FormControlLabel value="extras" control={<Radio />} label="Extras" />
            </RadioGroup>
        </FormControl>


        <Box sx={{ height: '75%', width: '100%' }}>
          {(currentOption !== 'orders' && currentOption !== 'users') && <div className='add-field-wrapper'>
            <TextField className='add-input-field' size='small' id="add-input-field" label="Add new entry" variant="outlined" />
            <Button className='add-button' size='large' variant="contained" onClick={addItem}>Add</Button>
          </div>}

          <DataGrid
            rows={rows}
            columns={colDef}
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

const memo = React.memo(AdminPage);
export { memo as AdminPage };
