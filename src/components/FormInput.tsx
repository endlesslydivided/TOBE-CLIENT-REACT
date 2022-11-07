import {FormHelperText,Typography,FormControl,Input as _Input,InputProps, TextField,} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const Input = styled(_Input)`background-color: white;padding: 0.4rem 0.7rem;`;

type IFormInputProps = {
name: string;
label: string;
type?: string;
} & InputProps;

const FormInput: FC<IFormInputProps> = ({ name, label,type, ...otherProps }) => 
{

    const {control,formState:{errors}} = useFormContext();

    return (
        <Controller
        control={control}
        defaultValue=''
        name={name}
        render=
        {
            ({ field }) => 
            (
            <FormControl fullWidth sx={{ p: 0.5 }}>

                <TextField
                    {...field}
                    type={type}
                    variant="outlined"
                    fullWidth
                    label={label}
                    error={!!errors[name]}
                    helperText={errors[name] ? errors[name]?.message?.toString() : ''}
                    InputProps={{...otherProps}}
                />

            </FormControl>
            )
        }
        />
    );
};

export default FormInput;
  
  