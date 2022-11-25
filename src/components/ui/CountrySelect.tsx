//@ts-nocheck
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import countries  from '../../utils/languageCountries';

interface ICountrySelect
{
    setCountry: Function
    values: any
}
const CountrySelect: React.FC<ICountrySelect> = ({setCountry,values}) =>  {

    const [value, setValue] = React.useState();

    return (
        <Autocomplete
        id="country-select"
        sx={{ width: "100%" }}
       
        value={value}

        onChange={(event, newValue) => {
            setValue(newValue);
            if(newValue !== null)
            setCountry({...values,country: newValue?.ru});
            else
            {
                setCountry({...values,country: ''});
            }
        }}

        inputValue={values.country}

        onInputChange={(event, newInputValue) => {
            if(event !== null)
            setCountry({...values,country: newInputValue});
        }}

        inputValue={values.country}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.ru}
        renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img loading="lazy" width="20" src={`https://flagcdn.com/w20/${option.alpha2.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.alpha2.toLowerCase()}.png 2x`}
            />
            {option.ru}
            </Box>
        )}
        renderInput={(params) => (
            <TextField
            {...params}
            autoComplete="off"
            label="Выберите страну"
            inputProps={{...params.inputProps,}}
            />
        )}
        />
    );
}


export default CountrySelect;