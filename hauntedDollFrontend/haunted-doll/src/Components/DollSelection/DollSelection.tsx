import React, { useEffect, useState } from 'react';

import './DollSelection.scss';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AppUtil } from '../../Util/AppUtil';
import { Button, FormLabel } from '@mui/material';
import { AppConstants } from '../../Constants/AppConstants';

function DollSelection(props: any): JSX.Element {
    const [dollNames, setDollNames] = useState([]);
    const [selectedDollName, setSelectedDollName] = useState('');

    const [dollSizes, setDollSizes] = useState([]);
    const [selectedDollSize, setSelectedDollSize] = useState('');

    const [extras, setExtras] = useState([]);
    const [selectedExtras, setSelectedExtras] = useState([]);

    // const [address, setAddress] = useState("");

    useEffect(()=>{
        loadData();
    },[])

    async function loadData() {
        const dollNamesResponse = await AppUtil.getDollNames();
        setDollNames(dollNamesResponse);

        const dollSizesResponse = await AppUtil.getDollSizes();
        setDollSizes(dollSizesResponse);

        const extrasResponse = await AppUtil.getExtras();
        setExtras(extrasResponse);
    }

    function getDollNameOptions(list: any): any {
        return(
            list.map((row: any, index: number) => {
                return <MenuItem value={row.id} key={index}>{row.name}</MenuItem>
            })
        );
    }

    function getSelectControl(label: string, options: any, value: any, onChangeHandler: any, multiple: boolean = false): any {
        return (
            <FormControl className='select-wrapper'>
            <FormLabel className='doll-selection-label'>{label}</FormLabel>
            <span>
            <Select
                multiple={multiple}
                labelId="demo-simple-select-label"
                className="doll-selection-select"
                value={value}
                label="Age"
                onChange={(event: SelectChangeEvent) => {
                    onChangeHandler(event.target.value);
                }}
            >
                {getDollNameOptions(options)}
            </Select>
            </span>
            </FormControl>
        )
    }

    async function addToCart() {
        if(selectedDollName == "" || selectedDollSize =="") {
            alert("Name and size are required.")
        } else {
            const selectedExtrasNames = [];
            for (var i = 0; i < selectedExtras.length; i++) {
                for (var j=0; j< extras.length; j++) {
                    const extra = extras[j];
                    if (extra.id === selectedExtras[i]) {
                        selectedExtrasNames.push(extra.name);
                        break;
                    }
                }
            }
            const response = await fetch(AppConstants.serverUrl+ '/UserService/addToCart?userid=' + props.user?.id
                                        + '&dollnameid='+selectedDollName + '&dollsizeid='+selectedDollSize + '&extrasnames='+selectedExtrasNames.join(','));
            let data = await response.text();
            data = AppUtil.getResponseBody(data)?.status?.status;
            if (data === 'Success') {
                alert('Successfully added to cart');
                setSelectedDollName('');
                setSelectedDollSize('');
                setSelectedExtras([]);
            } else {
              alert("Could not add the field. Please contact system admin.");
            }
      
        }

    }

    return (
        <Box className="doll-selection-box" sx={{ minWidth: 120 }}>
            <h2 className='form-header'>Order customization screen</h2>
            {getSelectControl("Select a doll:", dollNames, selectedDollName, setSelectedDollName, false)}
            {getSelectControl("Select size of the doll:", dollSizes, selectedDollSize, setSelectedDollSize, false)}
            {getSelectControl("Add extras:", extras, selectedExtras, setSelectedExtras, true)}
            <Button className='add-button' size='large' variant="contained" onClick={addToCart}>Add to cart</Button>
        </Box>
    )
}

const memo = React.memo(DollSelection);
export { memo as DollSelection };