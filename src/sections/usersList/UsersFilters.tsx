import { styled } from  '@mui/material/styles';
import { Card, CardContent, Divider, FormControlLabel, FormGroup, FormLabel,Radio, RadioGroup, Select, Switch, Tab, Tabs, MenuItem } from '@mui/material';
import { FC} from 'react';

interface IUserListProps
{
    sx?: object;
    setFilters: Function;
    filters: any;
}


const UsersFilter:FC<IUserListProps>= ({setFilters,filters,...other}) => {
 
    return (
            <Card {...other} sx={{ p: 3}}>
                <CardContent  sx={{ p: 1}}>
                    <FormGroup>    
                        <FormLabel>Сортировать по:</FormLabel>
                        <Select defaultValue="createdAt" size="small" sx={{my:1}} 
                        onChange={(e) => setFilters({...filters,orderBy:e.target.value})}>
                            <MenuItem value="firstName">По имени</MenuItem>
                            <MenuItem value="createdAt">По дате регистрации</MenuItem>
                            <MenuItem value="updatedAt">По времени последнего входа</MenuItem>
                        </Select>
                    </FormGroup>
                    <FormGroup>    
                        <FormLabel>Направление сортировки:</FormLabel>
                        <Select size="small" defaultValue="DESC" sx={{my:1}} 
                        onChange={(e) => setFilters({...filters,orderDirection:e.target.value})}>
                            <MenuItem value="ASC">По возрастанию</MenuItem>
                            <MenuItem value="DESC">По убыванию</MenuItem>
                        </Select>
                    </FormGroup>
                    <Divider orientation="horizontal" sx={{my:1}}/>

                    <FormGroup>    
                        <FormLabel>Пол</FormLabel>
                        <RadioGroup row onChange={(e) => setFilters({...filters,sex:e.target.value})}>
                            <FormControlLabel value="Мужской" control={<Radio />} label="Мужской" />
                            <FormControlLabel value="Женский" control={<Radio />} label="Женский" />
                            <FormControlLabel value="" defaultChecked control={<Radio />} label="Любой" />
                        </RadioGroup>
                    </FormGroup>

                    <Divider orientation="horizontal" sx={{my:1}}/>

                    <FormGroup sx={{display:"flex",flexDirection:"row"}}>
                        <FormLabel sx={{p:1}}>Есть фото</FormLabel>
                        <Switch onChange={(e) => setFilters({...filters,havePhoto:e.target.checked})} />
                    </FormGroup>
                    <Divider orientation="horizontal"sx={{my:1}} />

                </CardContent>           
            </Card>
  );
}

export default UsersFilter;