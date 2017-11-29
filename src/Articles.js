import React from 'react'

function Articles(props) {
  return Object.keys(props).map(key =>
      <article className="article" key={key}>
        <section className="featuredImage">
          <img src={props[key].image} alt="" />
        </section>
        <section className="articleContent">
            <a href=""><h3>{props[key].title}</h3></a>
            <h6>{props[key].category}</h6>
        </section>
        <section className="impressions">
          {props[key].score}
        </section>
        <div className="clearfix"></div>
      </article>
  )
}

export default Articles
