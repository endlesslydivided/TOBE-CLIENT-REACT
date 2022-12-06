//@ts-nocheck
import PropTypes from 'prop-types';
import AdminUsersTableHeader from './AdminUsersTableHeader';
import {fDate} from '../../utils/formatTime'
import {Card,  Table,  Stack,  Paper,  Avatar, TableHead,TableSortLabel,Box,  Button,  Popover,  Checkbox,  TableRow,  MenuItem,  TableBody,  TableCell,  Container,  Typography,  IconButton,  TableContainer,  TablePagination,} from '@mui/material';
import { Add, Cancel, VisibilityOutlined, Watch } from '@mui/icons-material';
import Scrollbar from '../scrollbar';
import { useState } from 'react';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false,sx:{maxWidth: 10} },
  { id: 'user', label: 'Пользователь', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false  },
  { id: 'country', label: 'Страна', alignRight: false,sx:{maxWidth: 10} },
  { id: 'createAt', label: 'Дата регистрации', alignRight: false,sx:{maxWidth: 50} },
  { id: 'updatedAt', label: 'Дата последнего изменения', alignRight: false,sx:{maxWidth: 50} },
  { id: '' },
];

interface AdminPostsTableProps
{
  filters?:object;
  posts: Array<any>
  setSelectedPost:Function;
  changePostsList: Array<any>;
  setChangePostsList: Function;
  setFilters: Function;
}



const  AdminPostsTable: FC<AdminPostsTableProps> =({filters,posts,changePostsList,setSelectedPostId,setChangePostsList,setFilters}) =>
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
                  {posts?.rows?.map((post) => {

                    const { id, user,createdAt,updatedAt } = post;
                    const selectedPost = changePostsList?.rows?.some(x => x.id === id);

                    return (
                       <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedPost}>
                       

                       <TableCell sx={{ maxWidth: 10}} align="left">{id}</TableCell>


                       <TableCell sx={{ maxWidth: 50}}  component="th" scope="row" padding="none">
                         <Stack direction="row" alignItems="center" spacing={2}>
                           <Avatar src={user?.photo?.path && `${process.env.REACT_APP_API_URL}${user?.photo?.path}`} />
                           <Typography sx={{ fontSize: "11px"}} variant="subtitle2" noWrap>
                             {`${user?.lastName} ${user?.firstName}`}
                           </Typography>
                         </Stack>
                       </TableCell>

                       <TableCell sx={{ fontSize: "11px",maxWidth: 50}}  align="left"> 
                         <Typography sx={{ fontSize: "11px"}} variant="subtitle2" noWrap>
                           {user?.email}
                         </Typography>
                       </TableCell>

                       <TableCell sx={{ fontSize: "11px",maxWidth: 20}} align="left">{user?.country}</TableCell>

                       <TableCell sx={{ fontSize: "11px",maxWidth: 50}} align="left">{fDate(createdAt)}</TableCell>
                       <TableCell sx={{ fontSize: "11px",maxWidth: 50}} align="left">{fDate(updatedAt)}</TableCell>

                       <TableCell padding="checkbox">
                          <IconButton onClick={() => setSelectedPostId(id)}>
                             <VisibilityOutlined/>
                          </IconButton>:
                         {selectedPost ?
                           <IconButton onClick={() => setChangePostsList(previous => ({rows:previous.rows.filter(x => x.id !== id)}))}>
                             <Cancel/>
                           </IconButton>:
                           <IconButton onClick={() => setChangePostsList(previous => ({rows:[...previous.rows,user]}))}>
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

                {posts?.rows?.length === 0 && filters &&(
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
            count={posts?.count}
            rowsPerPage={filters.limit}
            page={filters.page}
            onPageChange={(e) => {setFilters(previous => ({...previous,page:e.target.value}))}}
            onRowsPerPageChange={(e) => {setFilters(previous => ({...previous,limit:e.target.value,page:0}))}}
          />:
          <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={posts?.rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e) => {setPage(e.target.value)}}
          onRowsPerPageChange={(e) => {setRowsPerPage(e.target.value);setPage(0)}}

        />
          }
        
        </Card>
  );
}


export default AdminPostsTable;