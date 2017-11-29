import React, { Component } from 'react';
import './App.css';
import './normalize.css';
import './html5bp.css';
import FetchCall from './FetchCall'

class App extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    loading: "block",
    switchFeed: false,
    feed: 'Digg',
    sourceName: 'Click to Choose'
  }

  getDigg(e) {
    e.preventDefault()
    const changeFeed = this.refs.digg.getAttribute("value")
    this.setState({
      feed: changeFeed,
      sourceName: changeFeed
    })
  }

  getBuzzfeed(e) {
    e.preventDefault()
    const changeFeed = this.refs.buzzfeed.getAttribute("value")
    this.setState({
      feed: changeFeed,
      sourceName: changeFeed
    })
  }

  getMashable(e) {
    e.preventDefault()
    const changeFeed = this.refs.mashable.getAttribute("value")
    this.setState({
      feed: changeFeed,
      sourceName: changeFeed
    })
  }

  render() {
    return (
      <div>
        <header>
          <section className="container">
            <a href=""><h1>Feedr</h1></a>
            <nav>
              <ul>
                <li><div>News Source: <span className="feed-name">{this.state.sourceName}</span></div>
                  <ul>
                      <li ref="digg" value="Digg" onClick={this.getDigg.bind(this)}><a href="">Digg</a></li>
                      <li ref="buzzfeed" value="Buzzfeed" onClick={this.getBuzzfeed.bind(this)}><a href="">Buzzfeed</a></li>
                      <li ref="mashable" value="Mashable" onClick={this.getMashable.bind(this)}><a href="">Mashable</a></li>
                  </ul>
                </li>
              </ul>
              <section id="search">
                <input type="text" name="name" value="" />
                <a href=""><img src="images/search.png" alt="" /></a>
              </section>
            </nav>
            <div className="clearfix"></div>
          </section>
        </header>
          <FetchCall
            chooseFeed={this.state.feed}
            switchFeed={() => this.setState({switchFeed: true})}
            loading={this.state.loading}
          />
      </div>
    );
  }
}

export default App;
