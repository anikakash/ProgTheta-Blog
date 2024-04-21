import React, { userState } from 'react'


const DUMMY_POSTS = [
    {
      id: "1",
      thumbnail: "thumbnail11",
      category: "system-design",
      title: "Introduction to System Design",
      desc: "Learn the basics of system design and architecture. Understand key concepts such as scalability, reliability, and performance. Explore various design patterns and best practices. Dive into real-world case studies and examples. Gain practical skills for designing scalable and efficient systems.",
      authorID: 3
    },
    {
      id: "2",
      thumbnail: "thumbnail22",
      category: "web-development",
      title: "Building Modern Web Applications",
      desc: "Explore the latest tools and technologies for web development. Learn about front-end frameworks such as React and Vue.js. Dive into back-end technologies like Node.js and Django. Discover best practices for building responsive and user-friendly web applications. Gain hands-on experience through projects and exercises.",
      authorID: 5
    },
    {
      id: "3",
      thumbnail: "thumbnail33",
      category: "data-science",
      title: "Machine Learning Fundamentals",
      desc: "Discover the essential concepts of machine learning. Explore algorithms for regression, classification, and clustering. Learn how to preprocess data and evaluate model performance. Dive into advanced topics like deep learning and natural language processing. Gain practical experience through projects and case studies.",
      authorID: 2
    },
    {
      id: "4",
      thumbnail: "thumbnail44",
      category: "cloud-computing",
      title: "Introduction to Cloud Computing",
      desc: "Understand the fundamentals of cloud computing and its applications. Learn about different cloud service models: Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). Explore popular cloud providers like AWS, Azure, and Google Cloud. Gain hands-on experience with cloud services and deployment techniques.",
      authorID: 4
    },
    {
      id: "5",
      thumbnail: "thumbnail55",
      category: "programming",
      title: "Mastering Python Programming",
      desc: "Learn Python programming language from beginner to advanced level. Explore fundamental concepts such as variables, data types, and control structures. Dive into object-oriented programming and functional programming paradigms. Discover Python libraries for data analysis, web development, and more. Build real-world projects to solidify your skills.",
      authorID: 1
    }
]  

export const Posts = () => {
    const [posts, setPosts] = userState(DUMMY_POSTS)
  return (
    <section className="posts">
        
    </section>
  )
}
