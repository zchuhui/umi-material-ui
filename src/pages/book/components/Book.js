import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import styles from './Book.less'

class Book extends React.Component {

  state = {
    q: null
  }

  render() {

    const { books } = this.props;
    console.log('books', books);


    return (
      <div className={styles.bookContainer}>
        <Input
          placeholder="Search"
          className={styles.searchInput}
          onChange={this.handleChangeQ}
          inputProps={{
            'aria-label': 'Description',
          }}
        />

        <Button variant="fab" color="primary" aria-label="add" className={styles.btnSearch} onClick={this.handleSearch}>
          <Search />
        </Button>

        <div>
          {
            books && books.map((i,index) => (
              <Card className={styles.card} key={index}>
                {/* <CardMedia
                  image='http://p2.so.qhimgs1.com/t013dc9096acc4f6ad2.jpg'
                  title={i.title}
                /> */}
                <img src="http://p2.so.qhimgs1.com/t013dc9096acc4f6ad2.jpg"/>
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h6">
                    {i.title}
                  </Typography>
                  <Typography component="p">
                    {i.subtitle}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    <a href={i.alt} target="_blank">详情</a>
                  </Button>
                </CardActions>
              </Card>
            ))
          }
          
        </div>


      </div>
    )
  }

  handleChangeQ = (q) => {
    console.log('q', q.target.value);
    this.setState({
      q: q.target.value
    })
  }


  handleSearch = () => {
    this.props.dispatch({
      type: 'book/search',
      payload: {
        q: this.state.q
      }
    })
  }

}

function mapStateToProps(state) {
  const { books, total, page, } = state.book;

  return {
    books,
    total,
    page,
    loading: state.loading.models.users,
  };
}

export default connect(mapStateToProps)(Book);

