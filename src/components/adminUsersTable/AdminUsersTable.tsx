//@ts-nocheck
import PropTypes from 'prop-types';
import AdminUsersTableHeader from './AdminUsersTableHeader';
import fDate from '../../utils/formatTime'
import {Card,Container,  Table,  Stack,  Paper,  Avatar,  Button,  Popover,  Checkbox,  TableRow,  MenuItem,  TableBody,  TableCell,  Container,  Typography,  IconButton,  TableContainer,  TablePagination,} from '@mui/material';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'name', label: 'Имя', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'country', label: 'Страна', alignRight: false },
  { id: 'createAt', label: 'Дата регистрации', alignRight: false },
  { id: 'updatedAt', label: 'Дата последнего изменения', alignRight: false },
  { id: '' },
];

interface AdminUsersTableProps
{
  filters?:object;
  users: Array<any>
}



const  AdminUsersTable: FC<AdminUsersTableProps> =({filters,users,setFilters}) =>
{
  const [rowsPerPage, setRowsPerPage] = useState(5);


  // const handleFilterByName = (event) => {
  //   setFilters(previous => {...previous,page:0});
  //   setFilterName(event.target.value);
  // };

  return (
    <Container>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={data.rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                      />
                    </TableCell>
                    {TABLE_HEAD.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        align={headCell.alignRight ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                      >
                        <TableSortLabel
                          hideSortIcon
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : 'asc'}
                          onClick={createSortHandler(headCell.id)}
                        >
                          {headCell.label}
                          {orderBy === headCell.id ? (
                            <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => {

                    const { id, firstName, lastName, country, photo:{path:photoPath},email,createdAt,updatedAt } = user;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell align="left">{id}</TableCell>


                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar src={`${process.env.REACT_API_URL}/${photoPath}`} />
                            <Typography variant="subtitle2" noWrap>
                              {`${lastName} ${firstName}`}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{country}</TableCell>

                        <TableCell align="left">fDate(createdAt)</TableCell>
                        <TableCell align="left">fDate(updatedAt)</TableCell>

                      
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
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
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.count}
            rowsPerPage={filters.rowsPerPage}
            page={filters.page}
          />
        </Card>
      </Container>
  );
}


export default AdminUsersTable;