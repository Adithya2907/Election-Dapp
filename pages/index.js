import React, { Component } from "react";
import { Link } from "../routes";
import election from "../ethereum/election";
import Layout from "../components/Layout";
import Home from "../components/Home";

class Index extends Component {
  static async getInitialProps() {
    const manager = await election.methods.manager().call();

    return { manager };
  }

  render() {
    return (
      <Layout>
        <Home />
        <h4>
          Election commissioner of this election is{" "}
          <Link route={"/commissioner"}>
            <a>{this.props.manager}</a>
          </Link>
        </h4>
      </Layout>
    );
  }
}

export default Index;
