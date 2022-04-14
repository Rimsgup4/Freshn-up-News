import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';



export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general"
  }
  static defaultProps = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  cap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    console.log("const");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    }
    document.title = `${this.cap(this.props.category)} - Newsabbs`;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b175a3fc05a44925b885b5fcd5732593&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let pysco = await data.json();
    this.setState({ articles: pysco.articles, totalResults: pysco.totalResults, loading: false })
    this.props.setProgress(100);

  }
  handleprev = async () => {
    console.log("prev");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b175a3fc05a44925b885b5fcd5732593&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let pysco = await data.json();
    this.setState(
      {
        page: this.state.page - 1,
        articles: pysco.articles,
        loading: false

      }
    )


  }
  handlenext = async () => {
    console.log(" next");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b175a3fc05a44925b885b5fcd5732593&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let pysco = await data.json();
      this.setState(
        {
          page: this.state.page + 1,
          articles: pysco.articles,
          loading: false

        }
      )
    }
  }
  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: 70 }}>Newsabbs-Top {this.cap(this.props.category)}</h1>
        {/*{this.setState.loading && <Spinner/>}*/}
        <InfiniteScroll
        dataLength={this.state.articles.length} //This is important field to render the next data
        next={this.fetchData}
        hasMore={this.state.articles.length != this.state.totalResults}
        loader={<Spinner/>}
        ></InfiniteScroll>
        <div className="container my-4">
          <div className='row '>
            {this.state.articles.map((element) => {
              return <div className='col-md-4 my-4' key={element.url}>
                <Newsitem title={element.title ? element.title.slice(0, 45) : ""} desc={element.description ? element.description.slice(0, 88) : ""} url={!element.url ? "https://png.pngtree.com/illustrations/20190327/ourmid/pngtree-cure-starry-sky-night-sky-star-png-image_38228.jpg" : element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handleprev}>&larr; Prev</button>
            <button type="button" className="btn btn-dark" onClick={this.handlenext}>Next &rarr;</button>
          </div>
        </div>
      </>
    )
  }
}

export default News;
