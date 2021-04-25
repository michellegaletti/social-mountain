import React, { Component } from "react";
import axios from "axios";

import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import Post from "./Post/Post";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.filterPosts = this.filterPosts.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://practiceapi.devmountain.com/api/posts")
      .then((results) => {
        this.setState({ posts: results.data });
      });
  }

  updatePost(id, text) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then((results) => {
        this.setState({ posts: results.data });
      });
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then((results) => {
        this.setState({ posts: results.data });
      });
  }

  createPost(text) {
    axios
      .post("https://practiceapi.devmountain.com/api/posts", { text })
      .then((results) => {
        this.setState({ posts: results.data });
      });
  }

  filterPosts(input) {
    let filteredPosts = this.state.posts.filter(function (element) {
      return element.text.toLowerCase().includes(input);
    });
    this.setState({ posts: filteredPosts });
  }

  reset() {
    axios
      .get("https://practiceapi.devmountain.com/api/posts")
      .then((results) => {
        this.setState({ posts: results.data });
      });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header filterPosts={this.filterPosts} reset={this.reset} />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />

          {posts.map((element) => (
            <Post
              key={element.id}
              id={element.id}
              text={element.text}
              date={element.date}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
