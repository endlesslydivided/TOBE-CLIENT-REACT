//@ts-nocheck
import PropTypes from 'prop-types';
import AdminUsersTableHeader from './AdminUsersTableHeader';
import {fDate} from '../../utils/formatTime'
import {Card,  Table,  Stack,  Paper,  Avatar, TableHead,TableSortLabel,Box,  Button,  Popover,  Checkbox,  TableRow,  MenuItem,  TableBody,  TableCell,  Container,  Typography,  IconButton,  TableContainer,  TablePagination,} from '@mui/material';
import { Add, Cancel, Email } from '@mui/icons-material';
import Scrollbar from '../scrollbar';
import { useEffect, useState } from 'react';
import { useCreateDialogMutation } from '../../services/DialogsApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../hooks/redux';

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

const checkStatus = (status,successMessage) => 
    {
        if (status.isSuccess && successMessage) 
        {
          toast.success(successMessage);
        }
  
        if (status.isError) 
        {
          if (Array.isArray((status.error as any).data.error)) 
          {
            (status.error as any).data.error.forEach((el: any) =>toast.error(el.message, {position: 'top-right',}));
          } 
          else 
          {
            toast.error((status.error as any).data.message, {position: 'top-right',});
          }
        }
};

const  AdminUsersTable: FC<AdminUsersTableProps> =({filters,users,changeUsersList,setChangeUsersList,setFilters}) =>
{
  const userState :any = useAppSelector(state => state.auth.user);

  const [rowsPerPage,setRowsPerPage] = useState(10);
  const [page,setPage] = useState(0);
  const navigate = useNavigate();
  const [createDialog,createDialogStatus] = useCreateDialogMutation();
  useEffect(() => checkStatus(createDialogStatus),[createDialogStatus.isLoading]);
  const writeMessageHandler=  async (user) =>
  {
    const {data} = await createDialog({name:`${user?.firstName} ${user?.lastName}`,isChat:false,creatorId:userState.id,usersId:[user?.id]});
    if(data)
    {
      navigate(`/admin/chat/${data.dialog.id}`);
    }
  }

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
                          <Stack direction="column">
                          <IconButton onClick={() => writeMessageHandler(user)}>
                              <Email/>
                          </IconButton>
                          {selectedUser ?
                            <IconButton onClick={() => setChangeUsersList(previous => ({rows:previous.rows.filter(x => x.email !== email)}))}>
                              <Cancel/>
                            </IconButton>:
                            <IconButton onClick={() => setChangeUsersList(previous => ({rows:[...previous.rows,user]}))}>
                              <Add/>
                            </IconButton>
                          }
                          </Stack>
                          
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
            labelRowsPerPage='Записей на страницу:'
            labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count !== -1 ? count : `более чем ${to}`}`}
            component="div"
            count={users.count}
            rowsPerPage={filters.limit}
            page={filters.page}
            onPageChange={(e,page) => {setFilters(previous => ({...previous,page}))}}
            onRowsPerPageChange={(e) => {setFilters(previous => ({...previous,limit:parseInt(e.target.value, 10),page:0}))}}
          />:
          <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage='Записей на страницу:'
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count !== -1 ? count : `более чем ${to}`}`}
          component="div"
          count={users.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e,page) => {setPage(page)}}
          onRowsPerPageChange={(e) => {setRowsPerPage(parseInt(e.target.value, 10));setPage(0)}}

        />
          }
        
        </Card>
  );
}


export default AdminUsersTable;