import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { PAGE_SIZE } from '../constants';

class Users extends React.Component {

  render() {

    const { list, total } = this.props;
    
    return (
      <div>

        <Paper>
          <Table key="table1">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell numeric>Age</TableCell>
                <TableCell numeric>Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                list && list.length > 0?
                list.map((n,index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {n.name}
                      </TableCell>
                      <TableCell numeric>{n.age}</TableCell>
                      <TableCell numeric>{n.msg}</TableCell>
                    </TableRow>
                  );
                })
                :null
              }
            </TableBody>
          </Table>
        </Paper>
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

