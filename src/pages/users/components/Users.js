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
      rowsPerPage: 10
    }
  }

  componentDidMount(){
    // init data
    this.props.dispatch({
      type: 'users/fetch',
      payload: {
        q: 'test'
      }
    })
  }

  render() {

    const { dispatch, list, total } = this.props;
    const { page, rowsPerPage } = this.state
    
    let sliceData = list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
      <div>
        <Paper className={styles.searchContainer}>
          <Input
            id="q"
            placeholder="search user"
            defaultValue="test"
            className={styles.searchInput}
            inputProps={{
              'aria-label': 'Description',
            }}
          />
          <Button variant="raised" color="primary" className={styles.searchBtn} onClick={this.handleSearch}>
            搜索
          </Button>
        </Paper>

        <Table key="table1" className={styles.tableWrap}>
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>签名</TableCell>
              <TableCell>简洁</TableCell>
              <TableCell>链接</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              sliceData
                .map((n, index) => {
                  return (
                    <TableRow key={n.id} className={styles.tRow}>
                      <TableCell component="th" scope="row">
                        {index}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {n.name}
                      </TableCell>
                      <TableCell>{n.loc_name}</TableCell>
                      <TableCell>{n.created}</TableCell>
                      <TableCell>{n.signature}</TableCell>
                      <TableCell className={styles.tcellDesc}>
                        <div>
                          {n.desc}
                        </div>
                      </TableCell>
                      <TableCell><a href={n.alt} target="_blank">豆瓣地址</a></TableCell>
                    </TableRow>
                  );
                })
            }
          </TableBody>
          {
            total && total > 0 ?
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={list.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
              : null
          }

        </Table>
      </div>
    )
  }

  // 翻页
  handleChangePage = (event, page) => {
    this.setState({ page });
  }

  // 每页显示多少条
  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  }

  // 搜索
  handleSearch = () => {
    const q = document.getElementById('q').value;

    this.props.dispatch({
      type: 'users/fetch',
      payload: {
        q: q
      }
    })
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

