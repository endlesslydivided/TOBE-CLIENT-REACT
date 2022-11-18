import {FormHelperText,Typography,FormControl,Input as _Input,InputProps, TextField, RadioGroup, FormLabel, Radio, FormControlLabel,} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC, ReactNode, useState } from 'react';
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
children?:any;
} & InputProps;

const FormInput: FC<IFormInputProps> = ({ children,name, label,type, ...otherProps }) => 
{
    const [showPassword,setShowPassword] = useState(false);
    const {control,formState:{errors}} = useFormContext();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const renderContent = (field:any) =>
    {
        switch(type)
        {
            case "radio":
            {
                return (<>
                <FormLabel>{label}</FormLabel>
                <RadioGroup
                  row
                  variant="outlined"
                  {...field}
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
                >
                  {children}
                </RadioGroup>
                </>
                )
            }
            case "password":
            {
                return(
                    <TextField
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
                )
            }
            case "email":
            case "text":
            {
                return(
                    <TextField
                        {...field}
                        type={type}
                        variant="outlined"
                        fullWidth
                        label={label}
                        error={!!errors[name]}
                        InputProps={{...otherProps,
                        endAdornment:                    
                            ( 
                            <InputAdornment position='end'>
                                {!!errors[name] && <PopperIcon text={errors[name] ? errors[name]?.message?.toString() : ''} icon={<QuestionMark color='error'/>}/>}

                            </InputAdornment>)
                        }}
                    />                      
                )
            }
        }
    }
    

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
                {renderContent(field)}
            </FormControl>
            )
        }
        />
    );
};

export default FormInput;
  
  