import {FormHelperText,Typography,FormControl,Input as _Input,InputProps, TextField,} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InputAdornment } from '@mui/material';
import {QuestionMark} from '@mui/icons-material';
import PopperIcon from './ui/PopperIcon';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

const Input = styled(_Input)`background-color: white;padding: 0.4rem 0.7rem;`;

type IFormInputProps = {
name: string;
label: string;
type?: string;
} & InputProps;

const FormInput: FC<IFormInputProps> = ({ name, label,type, ...otherProps }) => 
{
    const [showPassword,setShowPassword] = useState(false);
    const {control,formState:{errors}} = useFormContext();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    

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
                {type === 'password' ?
                <TextField
                    className={"p-3"}
                    {...field}
                    type={showPassword? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    label={label}
                    error={!!errors[name]}
                    InputProps={{...otherProps,
                    endAdornment:                    
                        ( 
                        <InputAdornment position='end'>
                            {!!errors[name] && <PopperIcon text={errors[name] ? errors[name]?.message?.toString() : ''} icon={<QuestionMark color='error'/>}/>}
                            <IconButton onClick={handleClickShowPassword} color='default'>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>)
                    }}
                />
                :
                <TextField
                    className={"p-3"}
                    {...field}
                    type={type}
                    variant="outlined"
                    fullWidth
                    label={label}
                    error={!!errors[name]}
                    InputProps={{...otherProps,
                    endAdornment:
                    
                        (!!errors[name] && 
                        <InputAdornment position='end'>
                            <PopperIcon text={errors[name] ? errors[name]?.message?.toString() : ''} icon={<QuestionMark color='error'/>}/>
                        </InputAdornment>)
                    }}
                />
                }

            </FormControl>
            )
        }
        />
    );
};

export default FormInput;
  
  