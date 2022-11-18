import { FileDownload } from '@mui/icons-material';
import { FormControl, InputAdornment, InputProps, TextField } from '@mui/material';
import React, { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PopperButton from '../ui/PopperButton';
import PopperIcon from '../ui/PopperIcon';

type ITextAreaProps = {
    name: string;
    label: string;
    type?: string;
    children?:any;
} & InputProps;

const TextArea: FC<ITextAreaProps> = ({children,name, label,type, ...otherProps}) => {

    const {control} = useFormContext();
    const dispatch = useDispatch();

    // const addFile = async (file:File| null) =>
    // {
    //     if(!file)
    //     {
    //         toast.error("Выберите файл", {position: 'top-right',}); 
    //         return; 
    //     }
    //     const formData = new FormData();
    //     formData.append('file', file);

    //     formData.append('name',file.name);
    //     const photoData = await createPhoto(formData).unwrap();
    //     dispatch(setCurrentPhoto({...photoData})); 
    // }

    const renderContent = (field:any) =>
    {
        return( 
        <TextField
        multiline
        {...field}
        variant="outlined"
        fullWidth
        label={label}
        InputProps={{...otherProps,
        rows: 10,
        // endAdornment:                    
        //     ( 
        //     <InputAdornment position='end'>
        //         <PopperButton onClick={} text="Добавить прикрепления" icon={<FileDownload color='primary'/>}/>
        //     </InputAdornment>)
        }
        }/>
        )
    }
  return (
    <Controller
        control={control}
        defaultValue=''
        name={name}
        render=
        {
            ({ field} :any) => 
            (
            <FormControl fullWidth sx={{ p: 0.5 }}>
                {renderContent(field)}
            </FormControl>
            )
        }
        />    
  )
}

export default TextArea