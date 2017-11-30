import React, {Component} from 'react'

class Articles extends Component {

  handleClick = () => {
    this.props.showPopUp(this.props.title, this.props.content, this.props.link)
  }

  render() {
    return (
        <article className="article" key={this.props.title}>
          <section className="featuredImage">
            <img src={this.props.image} alt="" />
          </section>
          <section className="articleContent">
              <a onClick={this.handleClick}><h3>{this.props.title}</h3></a>
              <h6>{this.props.category}</h6>
          </section>
          <section className="impressions">
            {this.props.score}
          </section>
          <div className="clearfix"></div>
        </article>
      )
  }
}

export default Articles
