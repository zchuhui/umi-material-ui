import React from 'react';
import { connect } from 'dva';
//import { routerRedux } from 'dva/router';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import styles from './User.less'

class Users extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 5
    }
  }

  render() {

    const { dispatch, list, total, page, pageSize } = this.props;

    const handleSearch = () => {
      const q = document.getElementById('q').value;

      dispatch({
        type: 'users/fetch',
        payload: {
          q: q
        }
      })
    }

    const handleChangePage = (event, page) => {
      this.setState({ page:page });
    }

    const handleChangeRowsPerPage = (event) => {
      this.setState({ rowsPerPage: event.target.value });
    }

    let sliceData = list.slice(this.state.page * this.state.rowsPerPage, page * this.state.rowsPerPage + this.state.rowsPerPage);
    console.log('sliceData', sliceData);
    
    return (
      <div>
        <Paper className={styles.searchContainer}>
          <Input
            id="q"
            placeholder="豆瓣用户"
            className={styles.searchInput}
            inputProps={{
              'aria-label': 'Description',
            }}
          />
          <Button variant="raised" color="primary" className={styles.searchBtn} onClick={handleSearch}>
            搜索
          </Button>
        </Paper>

        <Table key="table1">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell numeric>Address</TableCell>
              <TableCell numeric>Date</TableCell>
              <TableCell numeric>签名</TableCell>
              <TableCell numeric>简洁</TableCell>
              <TableCell numeric>链接</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              sliceData
                .map((n, index) => {
                  return (
                    <TableRow key={n.id}>
                      <TableCell component="th" scope="row">
                        {n.name}
                      </TableCell>
                      <TableCell numeric>{n.loc_name}</TableCell>
                      <TableCell numeric>{n.created}</TableCell>
                      <TableCell numeric>{n.signature}</TableCell>
                      <TableCell numeric>{n.desc}</TableCell>
                      <TableCell numeric><a href={n.alt} target="_blank">豆瓣地址</a></TableCell>
                    </TableRow>
                  );
                })
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={1}
                count={total}
                rowsPerPage={this.state.rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              //ActionsComponent={TablePaginationActionsWrapped}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;

  return {
    list,
    total,
    page,
    loading: state.loading.models.users,
  };
}

export default connect(mapStateToProps)(Users);

