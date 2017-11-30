import React, {Component} from 'react'
import Articles from './Articles.js'

//function to handle the search filter, called on articles.map
function searchingFor(term){
  return function(s){
    return s.text.includes(term) || !term;
  }
}

class FetchCall extends Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: [],
      chooseFeed: 'All',
      popUp: 'none',
      popUpInfo: {},
      loading: 'block',
      search: '',
      term: ''
    }
  }

  togglePopUp = (title, content, link) => {
    this.setState({
      popUp: 'block',
      popUpInfo: {
        title,
        content,
        link
      }
    })
  }

  closePopUp = () => {
    this.setState({
      popUp: 'none'
    })
  }

  openSearch = () => {
    this.setState({
      search: 'active'
    })
  }

  changeFeed = (e) => {
    this.setState({
      loading: 'block'
    })
    if (e.currentTarget.dataset.id === 'digg') {
      this.getDigg()
      this.setState({
        chooseFeed: 'Digg'
      })
    } else if (e.currentTarget.dataset.id === 'buzzfeed') {
      this.getBuzzfeed()
      this.setState({
        chooseFeed: 'Buzzfeed'
      })
    } else if (e.currentTarget.dataset.id === 'mashable') {
      this.getMashable()
      this.setState({
        chooseFeed: 'Mashable'
      })
    }
  }

  showAllFeed = () => {
    this.setState({
      loading: 'block'
    })
    this.getAll()
  }

  getDigg() {
    return fetch("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json")
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then(response => response.json())
      .then(response => {
        const articles = response.data.feed.map(article => {
          return {
            title: article.content.title_alt,
            content: article.content.description,
            link: article.content.original_url,
            score: article.digg_score,
            image: article.content.media.images[0].url,
            category: article.content.tags[0].name
        }
      })
        this.setState({
          articles: articles,
          loading: 'none',
          chooseFeed: 'Digg'
        })
        return articles
      })
      .catch(error => {
        alert(`There's something wrong, I can't get articles from Digg 😭. ${error}`)
      })
  }


  getBuzzfeed() {
    return fetch("https://accesscontrolalloworiginall.herokuapp.com/https://www.buzzfeed.com/api/v2/feeds/index")
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then(response => response.json())
      .then(response => {
        const articles = response.buzzes.map(article => {
          return {
            title: article.title,
            content: article.description,
            link: `https://www.buzzfeed.com${article.canonical_path}`,
            score: article.category_id,
            image: article.images.standard,
            category: article.category,
          }
        })
        this.setState({
          articles: articles,
          loading: 'none',
          chooseFeed: 'Buzzfeed'
        })
        return articles
      }).catch(error => {
        alert(`There's something wrong, I can't get articles from Buzzfeed 😵. ${error}`)
      })

  }

  getMashable() {
    return fetch("https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/api/v1/posts")
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then(response => response.json())
      .then(response => {
        const articles = response.posts.map(article => {
          return {
            title: article.title,
            content: article.content.excerpt,
            link: article.url,
            score: article.shares.total,
            image: article.images.i120x120,
            category: article.channel
          }
        })
        this.setState({
          articles: articles,
          loading: 'none',
          chooseFeed: 'Mashable'
        })
        return articles
      }).catch(error => {
        alert(`There's something wrong, I can't get articles from Mashable 🙊. ${error}`)
      })
  }

  getAll() {
    const apiRequest1 = this.getDigg()

    const apiRequest2 = this.getBuzzfeed()

    const apiRequest3 = this.getMashable()

    let combinedData = []
    Promise.all([apiRequest1, apiRequest2, apiRequest3])
    .then(values => {
      combinedData = [].concat.apply([], values)
      this.setState({
        articles: combinedData,
        chooseFeed: 'All'
      })
    })
  }

  componentDidMount() {
    this.getDigg()
  }

  handleSearch(event) {
    this.setState({term: event.target.value})
  }

  render() {
    const {articles, term} = this.state
    return(
      <div>
        <header>
          <section className="container">
            <a onClick={this.showAllFeed}><h1>Feedr</h1></a>
            <nav>
              <ul>
                <li className="head-li"><div>News Source: <span className="feed-name">{this.state.chooseFeed}</span></div>
                  <ul>
                      <li data-id="digg" value="Digg" onClick={this.changeFeed}>Digg</li>
                      <li data-id="buzzfeed" value="Buzzfeed" onClick={this.changeFeed}>Buzzfeed</li>
                      <li data-id="mashable" value="Mashable" onClick={this.changeFeed}>Mashable</li>
                  </ul>
                </li>
              </ul>
              <section id="search" className={this.state.search}>
                <input type="text" name="name" value={term} onChange={this.handleSearch.bind(this)} />
                <a onClick={this.openSearch}><img src="images/search.png" alt="" /></a>
              </section>
            </nav>
            <div className="clearfix"></div>
          </section>
        </header>
        <div className="loader" style={{display: this.state.loading}}></div>
        <div className="popUp" style={{display: this.state.popUp}}>
          <a onClick={this.closePopUp} className="closePopUp">X</a>
          <div className="container">
            <h1>{this.state.popUpInfo.title}</h1>
            <p>
              {this.state.popUpInfo.content}
            </p>
            <a href={this.state.popUpInfo.link} className="popUpAction" target="_blank">Read more from source</a>
          </div>
        </div>
      <section id="main" className="container">
        {this.state.articles.map(article => {
          return (
            <Articles
              showPopUp={this.togglePopUp}
              title= {article.title}
              content={article.content}
              link={article.link}
              category={article.category}
              score={article.score}
              image={article.image}
              key={article.title}
            />
          )
        })}
      </section>
      </div>
    )
  }
}

export default FetchCall
