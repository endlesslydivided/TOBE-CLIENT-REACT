import { styled } from  '@mui/material/styles';
import { Card, CardContent, Divider, FormControlLabel, FormGroup, FormLabel,Radio, RadioGroup, Select, Switch, Tab, Tabs, MenuItem, Button } from '@mui/material';
import { FC, useEffect} from 'react';
import CountrySelect from '../../components/ui/CountrySelect';
import { Refresh } from '@mui/icons-material';

interface IUserListProps
{
    sx?: object;
    setFilters: Function;
    filters: any;
    initial: any
}


const UsersFilter:FC<IUserListProps>= ({setFilters,filters,initial,...other}) => {

 
    return (
            <Card {...other} sx={{ p: 3}}>
                <CardContent  sx={{ p: 1}}>
                        <FormGroup>    
                            <FormLabel>Сортировать по:</FormLabel>
                            <Select value={filters.orderBy} defaultValue="createdAt" size="small" sx={{my:1}} 
                            onChange={(e) => setFilters((previous:any) => ({...previous,orderBy:e.target.value}))}>
                                <MenuItem value="firstName">По имени</MenuItem>
                                <MenuItem value="createdAt">По дате регистрации</MenuItem>
                                <MenuItem value="updatedAt">По времени последнего входа</MenuItem>
                            </Select>
                        </FormGroup>
                        <FormGroup>    
                            <FormLabel>Направление сортировки:</FormLabel>
                            <Select value={filters.orderDirection}  size="small" defaultValue="DESC" sx={{my:1}} 
                            onChange={(e) => setFilters((previous:any) => ({...previous,orderDirection:e.target.value}))}>
                                <MenuItem value="ASC">По возрастанию</MenuItem>
                                <MenuItem value="DESC">По убыванию</MenuItem>
                            </Select>
                        </FormGroup>
                        <Divider orientation="horizontal" sx={{my:1}}/>

                        <FormGroup>    
                            <FormLabel>Пол</FormLabel>
                            <RadioGroup row value={filters.sex}  onChange={(e) => setFilters((previous:any) => ({...previous,sex:e.target.value}))}>
                                <FormControlLabel value="Мужской" control={<Radio />} label="Мужской" />
                                <FormControlLabel value="Женский" control={<Radio />} label="Женский" />
                                <FormControlLabel value="" defaultChecked control={<Radio />} label="Любой" />
                            </RadioGroup>
                        </FormGroup>

                        <Divider orientation="horizontal" sx={{my:1}}/>

                        <FormGroup sx={{display:"flex",flexDirection:"row"}}>
                            <FormLabel sx={{p:1}}>Есть фото</FormLabel>
                            <Switch checked={filters.havePhoto} onChange={(e) => setFilters((previous:any) => ({...previous,havePhoto:e.target.checked}))} />
                        </FormGroup>
                        <Divider orientation="horizontal"sx={{my:1}} />

                        <FormGroup sx={{display:"flex",flexDirection:"row"}}>
                            <FormLabel sx={{p:1}}>Страна</FormLabel>
                            <CountrySelect setCountry={setFilters} values={filters}/>
                        </FormGroup>

                        <Divider orientation="horizontal"sx={{my:1}} />

                        <FormGroup sx={{display:"flex",flexDirection:"row"}}>
                            <Button variant="outlined" sx={{width:"100%"}} onClick={() => setFilters((previous:any) => ({...previous,...initial}))} startIcon={<Refresh />}>
                                Очистить
                            </Button>
                        </FormGroup>
                </CardContent>           
            </Card>
  );
}

export default UsersFilter;