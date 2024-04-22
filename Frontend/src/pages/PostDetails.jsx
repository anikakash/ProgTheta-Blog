import React from 'react'
import { Link } from 'react-router-dom'
import Thumbnail from '../assets/blog1.jpg'
import PostAuthor from '../components/PostAuthor'

export const PostDetails = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
          <div className="post-detail__header">
            <PostAuthor/>
            <div className="post-detail_buttons">
              <Link to={`/posts/anik/edit`} className='btn sm primary'>Edit</Link>
              <Link to={`/posts/anik/delete`} className='btn sm danger'>Delete</Link>
            </div>
          </div>
          <h1>Ths is the post titel</h1>
          <div className="post-detail__thumbnail">
              <img src={Thumbnail} alt="" />
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, pariatur cupiditate. Ipsum aut corrupti illum deleniti facere, aspernatur corporis ipsa obcaecati eum sapiente reprehenderit quia! Explicabo tempore aperiam quas expedita maxime qui provident, et iure debitis reiciendis. Earum, officia voluptas.
          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, at dolorem quos fugiat quas recusandae maxime pariatur ea praesentium autem nobis alias voluptatibus deserunt cum eos nemo? Eum autem unde iusto quas placeat iure nostrum. Eos amet laboriosam totam eum reiciendis, voluptatibus nulla odit voluptatem rem cum adipisci omnis sunt nisi possimus, eius magni culpa.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam temporibus totam pariatur est assumenda, blanditiis ullam alias dolorem porro molestias vero expedita voluptatibus ipsa laudantium mollitia eos fugiat soluta iure! Recusandae non itaque assumenda. Aspernatur fuga labore nobis reprehenderit quos molestias amet asperiores eius doloribus, quam, optio repudiandae voluptatum ipsa natus fugiat culpa voluptate, sunt a. Soluta nemo natus architecto! At consequatur, officiis nobis, iusto ducimus amet fuga molestiae architecto blanditiis voluptatum dolor placeat? Laboriosam voluptate nihil quis sequi minus dolorem voluptatibus sed, consequuntur excepturi fugiat esse, voluptates, perspiciatis doloremque aliquid ipsam libero earum voluptatum atque? Debitis earum pariatur nesciunt eum magnam in cumque suscipit vero! Expedita possimus tempora nemo minima.</p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, possimus soluta. 

          </p>
          <p><br />Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid et quod inventore autem nisi nemo obcaecati alias odio impedit saepe. Odit cumque a at eum quasi numquam sapiente consequuntur quibusdam quo beatae laborum nostrum iure sunt ab, quos iste voluptates autem placeat minus explicabo temporibus. Illo quibusdam nemo dignissimos inventore iure quod magnam impedit et a doloribus dolorem atque explicabo expedita quasi repellat sed laudantium qui veniam deserunt fuga, consectetur officiis iusto! Magnam totam consectetur libero tempore assumenda possimus minima, aliquam molestiae illo doloremque! Amet minima tempore quasi veritatis nobis necessitatibus excepturi quaerat. Soluta sed a consectetur voluptate similique beatae nesciunt cupiditate numquam commodi unde ipsam, architecto quos consequatur nulla necessitatibus inventore molestiae harum minus aperiam asperiores? Repellat sequi minima quod corrupti, voluptatibus harum totam dolor accusamus dolore vel iusto tenetur fuga quisquam culpa soluta, incidunt laudantium ea reprehenderit consequuntur. Quam distinctio molestias illo natus reprehenderit amet sint iusto ullam non, voluptatem accusantium molestiae quis itaque excepturi, esse explicabo. Neque deserunt repudiandae, dolorem labore suscipit aperiam vitae quaerat debitis et id accusantium fuga sint? Dolorum et porro debitis accusantium enim iure possimus dolorem distinctio, culpa unde odit, ratione incidunt deleniti beatae amet doloribus vel iusto. Facere sequi obcaecati necessitatibus porro!</p>
      </div>
    </section>
  )
}

// export default PostDetails