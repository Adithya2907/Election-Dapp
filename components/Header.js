import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Router } from "../routes";

class Header extends Component {
  onClickHome = () => {
    Router.pushRoute("/");
  };

  onClickCandidates = () => {
    Router.pushRoute("/candidates");
  };

  onClickVoters = () => {
    Router.pushRoute("/voters");
  };

  onClickCommissioner = () => {
    Router.pushRoute("/commissioner");
  };

  render() {
    return (
      <Menu>
        <Menu.Item name="home" onClick={this.onClickHome}>
          Home
        </Menu.Item>
        <Menu.Item name="candidates" onClick={this.onClickCandidates}>
          Candidates
        </Menu.Item>
        <Menu.Item name="voters" onClick={this.onClickVoters}>
          Voters
        </Menu.Item>
        <Menu.Item name="commissioner" onClick={this.onClickCommissioner}>
          Commissioner
        </Menu.Item>
      </Menu>
    );
  }
}

export default Header;
