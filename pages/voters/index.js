import React, { Component } from "react";
import { Card, Button, Message } from "semantic-ui-react";
import election from "../../ethereum/election";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class VotersHome extends Component {
  state = {
    loading: false,
    errorMessage: "",
    registrationSuccess: false,
  };

  static async getInitialProps() {
    const votersAddresses = await election.methods.getVotersAddresses().call();

    return { votersAddresses };
  }

  getAddresses() {
    const items = this.props.votersAddresses.map((address) => {
      return {
        description: address,
        fluid: true,
      };
    });

    console.log(items);

    return <Card.Group items={items} />;
  }

  registerVoter = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({
      loading: true,
      errorMessage: "",
      registrationSuccess: false,
    });

    try {
      await election.methods
        .registerAsVoter()
        .send({ from: accounts[0], gas: "3000000" });

      this.setState({
        registrationSuccess: true,
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
      });
    }

    this.setState({
      loading: false,
    });

    Router.replaceRoute("/voters");
  };

  render() {
    return (
      <Layout>
        <h4>Registered Voters</h4>
        {this.getAddresses()}
        <Button
          loading={this.state.loading}
          primary
          style={{ marginTop: "30px", marginBottom: "30px" }}
          onClick={this.registerVoter}
        >
          Register
        </Button>
        <Message
          hidden={!this.state.errorMessage}
          error
          header="There was some error in the transaction"
          list={[
            "Make sure you are connected to the Internet",
            "You can only register once.",
            "Make sure it isn't past the last day to register.",
          ]}
        />

        <Message
          success
          hidden={!this.state.registrationSuccess}
          header="Your registration was successful"
          content="You may now participate in the upcoming elections."
        />
      </Layout>
    );
  }
}

export default VotersHome;
