import React, {Component} from 'react'
import Articles from './Articles.js'
import PopUp from './PopUp.js'
import Loader from './Loader.js'

class FetchCall extends Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: [

      ],
      chooseFeed: '',
      loading: this.props.loading
    }
  }

  getDigg() {
    fetch("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json")
      .then(response => response.json())
      .then(response => {
        let title = response.data.feed.map(articles => {
          return articles.content.title_alt
        })
        let link = response.data.feed.map(articles => {
          return articles.content.original_url
        })
        let category = response.data.feed.map(articles => {
          return articles.content.tags.map((tags, idx) => {
            return tags.name
          })
        })
        let score = response.data.feed.map(articles => {
          return articles.digg_score
        })
        let image = response.data.feed.map(articles => {
          return articles.content.media.images.map(images => {
            return images.original_url
          })
        })
        const diggArticle = title.map((element, index) => (
          { title: element,
            link: link[index],
            category: category[index][0],
            score: score[index],
            image: image[index][0] }
        ))
        this.setState({
          articles: this.state.articles.concat(diggArticle)
        })
      })
  }

  getMashable() {
    fetch("https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/api/v1/posts")
      .then(response => response.json())
      .then(response => {
        let title = response.posts.map(articles => {
          return articles.title
        })
        let content = response.posts.map(articles => {
          return articles.content.excerpt
        })
        let link = response.posts.map(articles => {
          return articles.url
        })
        let category = response.posts.map(articles => {
          return articles.channel
        })
        let score = response.posts.map(articles => {
          return articles.shares.total
        })
        let imageArray = response.posts.map(articles => {
          return articles.images
        })
        let images = imageArray.map(image => {
          return image.i120x120
        })
        const mashableArticle = title.map((element, index) => (
          { title: element,
            content: content,
            link: link[index],
            category: category[index],
            score: score[index],
            image: images[index] }
        ))
        this.setState({
        articles: this.state.articles.concat(mashableArticle)
        })
      })
  }

  getBuzzfeed() {
    fetch("https://accesscontrolalloworiginall.herokuapp.com/https://www.buzzfeed.com/api/v2/feeds/index")
      .then(response => response.json())
      .then(response => {
        let title = response.buzzes.map(articles => {
          return articles.title
        })
        let category = response.buzzes.map(articles => {
          return articles.category
        })
        let link = response.buzzes.map(articles => {
          return link = `https://www.buzzfeed.com${articles.canonical_path}`
        })
        let score = response.buzzes.map(articles => {
          return articles.category_id
        })
        let image = response.buzzes.map(articles => {
          return articles.images.standard
        })
        const buzzfeedArticle = title.map((element, index) => (
          { title: element,
            link: link[index],
            category: category[index],
            score: score[index],
            image: image[index] }
        ))
        this.setState({
        articles: this.state.articles.concat(buzzfeedArticle)
        })
      })
  }

  getAll() {
    const apiRequest1 =
    fetch("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json")
      .then(response => {
        return response.json()
      })

    const apiRequest2 =
    fetch("https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/api/v1/posts")
      .then(response => {
        return response.json()
      })

    const apiRequest3 =
    fetch("https://accesscontrolalloworiginall.herokuapp.com/https://www.buzzfeed.com/api/v2/feeds/index")
      .then(response => {
        return response.json()
      })

    const combinedData = { 'digg':{}, 'mashable':{}, 'buzzfeed':{} }
    Promise.all([apiRequest1, apiRequest2, apiRequest3])
    .then(values => {
      combinedData['digg'] = values[0]
      combinedData['mashable'] = values[1]
      combinedData['buzzfeed'] = values[2]
    })
    //console.log(combinedData);
    // .then(values => {
    //   this.setState({
    //     newsFeed: combinedData
    //   })
    // })
  }


  componentWillReceiveProps(nextProps) {
    console.log(`THIS ${this.props.chooseFeed}`);
    console.log(`NEXT ${nextProps.chooseFeed}`);
    if (nextProps.chooseFeed === 'Digg') {
      this.setState({
        chooseFeed: 'Digg',
        loading: true
      })
      this.getDigg(nextProps.chooseFeed === 'Digg')
    } else if (nextProps.chooseFeed === 'Mashable') {
      this.setState({
        chooseFeed: 'Mashable',
        loading: true
      })
      this.getMashable(nextProps.chooseFeed === 'Mashable')
    } else if (true) {
      this.setState({
        chooseFeed: 'Buzzfeed',
        loading: true
      })
      this.getBuzzfeed()
    }
    //this.getAll()
  }

  render() {
    return(
      <div>
        <Loader loading={this.state.loading}/>
        <PopUp {...this.state.articles}/>
      <section id="main" className="container">
        <Articles {...this.state.articles} />
      </section>
      </div>
    )
  }
}

export default FetchCall
