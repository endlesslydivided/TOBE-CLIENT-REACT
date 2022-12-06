//@ts-nocheck
import PropTypes from 'prop-types';
import AdminUsersTableHeader from './AdminUsersTableHeader';
import {fDate} from '../../utils/formatTime'
import {Card,  Table,  Stack,  Paper,  Avatar, TableHead,TableSortLabel,Box,  Button,  Popover,  Checkbox,  TableRow,  MenuItem,  TableBody,  TableCell,  Container,  Typography,  IconButton,  TableContainer,  TablePagination,} from '@mui/material';
import { Add, Cancel } from '@mui/icons-material';
import Scrollbar from '../scrollbar';
import { useState } from 'react';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false,sx:{maxWidth: 10} },
  { id: 'name', label: 'Имя', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false  },
  { id: 'country', label: 'Страна', alignRight: false,sx:{maxWidth: 10} },
  { id: 'createAt', label: 'Дата регистрации', alignRight: false,sx:{maxWidth: 50} },
  { id: 'updatedAt', label: 'Дата последнего изменения', alignRight: false,sx:{maxWidth: 50} },
  { id: '' },
];

interface AdminUsersTableProps
{
  filters?:object;
  users: Array<any>
  changeUsersList: Array<any>;
  setChangeUsersList: Function;
  setFilters: Function;
}



const  AdminUsersTable: FC<AdminUsersTableProps> =({filters,users,changeUsersList,setChangeUsersList,setFilters}) =>
{

  const [rowsPerPage,setRowsPerPage] = useState(10);
  const [page,setPage] = useState(0);

  return (
        <Card >
            <TableContainer sx={{maxHeight:500,minHeight:500}}>
              <Table stickyHeader >
                <TableHead>
                  <TableRow>
                    {TABLE_HEAD.map((headCell) => (
                      <TableCell
                        sx={headCell.sx}
                        style={{fontSize:'10px' }}
                        key={headCell.id}
                        align={headCell.alignRight ? 'right' : 'left'}
                    //    sortDirection={orderBy === headCell.id ? order : false}
                      >
                        <TableSortLabel hideSortIcon>
                          {headCell.label}
                          {/* {orderBy === headCell.id ? (
                            <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
                          ) : null} */}
                        </TableSortLabel> 
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody sx={{overflowX:false}}>
                  {users?.rows?.map((user) => {

                    const { id, firstName, lastName, country, photo,email,createdAt,updatedAt } = user;
                    const selectedUser = changeUsersList.rows.some(x => x.email === email);

                    return (
                       <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                       

                       <TableCell sx={{ maxWidth: 10}} align="left">{id}</TableCell>


                       <TableCell sx={{ maxWidth: 50}}  component="th" scope="row" padding="none">
                         <Stack direction="row" alignItems="center" spacing={2}>
                           <Avatar src={photo?.path && `${process.env.REACT_APP_API_URL}${photo?.path}`} />
                           <Typography sx={{ fontSize: "11px"}} variant="subtitle2" noWrap>
                             {`${lastName} ${firstName}`}
                           </Typography>
                         </Stack>
                       </TableCell>

                       <TableCell sx={{ fontSize: "11px",maxWidth: 50}}  align="left"> 
                         <Typography sx={{ fontSize: "11px"}} variant="subtitle2" noWrap>
                           {email}
                         </Typography>
                       </TableCell>

                       <TableCell sx={{ fontSize: "11px",maxWidth: 20}} align="left">{country}</TableCell>

                       <TableCell sx={{ fontSize: "11px",maxWidth: 50}} align="left">{fDate(createdAt)}</TableCell>
                       <TableCell sx={{ fontSize: "11px",maxWidth: 50}} align="left">{fDate(updatedAt)}</TableCell>

                       <TableCell padding="checkbox">
                         {selectedUser ?
                           <IconButton onClick={() => setChangeUsersList(previous => ({rows:previous.rows.filter(x => x.email !== email)}))}>
                             <Cancel/>
                           </IconButton>:
                           <IconButton onClick={() => setChangeUsersList(previous => ({rows:[...previous.rows,user]}))}>
                             <Add/>
                           </IconButton>
                         }
                       </TableCell>
                        </TableRow>

                     
                    );
                  })}
                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
                </TableBody>

                {users.rows.length === 0 && filters &&(
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper sx={{   textAlign: 'center', }}>
                          <Typography variant="h6" paragraph>
                            Не найдено
                          </Typography>

                          <Typography variant="body2">
                            Не найдено результатов для &nbsp;
                            <strong>&quot;{filters.search}&quot;</strong>.
                            <br /> Попробуйте ввести другой запрос
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          {filters ?   
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.count}
            rowsPerPage={filters.limit}
            page={filters.page}
            onPageChange={(e) => {setFilters(previous => ({...previous,page:e.target.value}))}}
            onRowsPerPageChange={(e) => {setFilters(previous => ({...previous,limit:e.target.value,page:0}))}}
          />:
          <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e) => {setPage(e.target.value)}}
          onRowsPerPageChange={(e) => {setRowsPerPage(e.target.value);setPage(0)}}

        />
          }
        
        </Card>
  );
}


export default AdminUsersTable;