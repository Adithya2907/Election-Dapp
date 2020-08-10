import React, { Component } from "react";
import { Card, Button, Message } from "semantic-ui-react";
import election from "../../ethereum/election";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class CandidatesHome extends Component {
  state = {
    loading: false,
    votingLoading: false,
    errorMessage: "",
    errorVoting: "",
    registrationSuccess: false,
    votingSuccess: false,
    disabled: false,
    votedisabled: false,
  };

  static async getInitialProps() {
    const candidateAddresses = await election.methods
      .getCandidateAddresses()
      .call();

    return { candidateAddresses };
  }

  async vote(address) {
    const accounts = await web3.eth.getAccounts();
    this.setState({
      errorVoting: "",
      disabled: true,
      votingLoading: true,
      votingSuccess: false,
      errorMessage: "",
    });

    try {
      await election.methods
        .vote(address)
        .send({ from: accounts[0], gas: "1000000" });
      this.setState({
        votingSuccess: true,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        errorVoting: error.message,
      });
    }

    this.setState({
      disabled: false,
      votingLoading: false,
    });
  }

  getAddresses() {
    const items = this.props.candidateAddresses.map((address) => {
      return (
        <Card key={address} fluid>
          <Card.Content>
            <Card.Header>{address}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <div className="ui buttons">
              <Button
                disabled={this.state.votedisabled}
                loading={this.state.votingLoading}
                basic
                color="green"
                onClick={() => this.vote(address)}
              >
                Vote
              </Button>
            </div>
          </Card.Content>
        </Card>
      );
    });

    return <Card.Group>{items}</Card.Group>;
  }

  registerCandidate = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({
      loading: true,
      errorMessage: "",
      registrationSuccess: false,
      votedisabled: true,
      errorVoting: "",
      votingSuccess: false,
    });

    try {
      await election.methods
        .contestInElection()
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
      votedisabled: false,
    });

    Router.replaceRoute("/candidates");
  };

  render() {
    return (
      <Layout>
        <h4>List of candidates</h4>
        {this.getAddresses()}
        <Button
          loading={this.state.loading}
          primary
          style={{ marginTop: "30px", marginBottom: "30px" }}
          onClick={this.registerCandidate}
          disabled={this.state.disabled}
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

        <Message
          hidden={!this.state.errorVoting}
          error
          header="There was some error in the transaction"
          list={[
            "Make sure you are connected to the Internet",
            "You have to be registered to vote",
            "You can only vote once.",
            "Make sure polling is open.",
          ]}
        />

        <Message
          success
          hidden={!this.state.votingSuccess}
          header="You have voted successfully"
          content="Please wait till the end of elections for the results."
        />
      </Layout>
    );
  }
}

export default CandidatesHome;
