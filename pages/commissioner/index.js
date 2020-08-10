import React, { Component } from "react";
import Layout from "../../components/Layout";
import election from "../../ethereum/election";
import { Button, Message } from "semantic-ui-react";
import web3 from "../../ethereum/web3";

class CommissionerHome extends Component {
  static async getInitialProps() {
    const campaignDay = await election.methods.campaignDay().call();
    const countingDay = await election.methods.countingDay().call();

    return { campaignDay, countingDay };
  }
  state = {
    campaignLoading: false,
    countingLoading: false,
    resultsLoading: false,
    managerError: false,
    errorMessage: "",
    campaignDay: this.props.campaignDay,
    countingDay: this.props.countingDay,
    winner: "",
  };

  onEndCampaign = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({
      campaignLoading: true,
      errorMessage: "",
    });

    try {
      await election.methods.endCampaign().send({ from: accounts[0] });
      this.setState({
        campaignDay: false,
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
      });
    }

    this.setState({
      campaignLoading: false,
    });
  };

  onStartCounting = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({
      countingLoading: true,
      errorMessage: "",
    });

    try {
      await election.methods.startCounting().send({ from: accounts[0] });
      this.setState({
        countingDay: true,
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
      });
    }

    this.setState({
      countingLoading: false,
    });
  };

  onDeclare = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({
      resultsLoading: true,
      errorMessage: "",
    });

    try {
      const winner = await election.methods.declareResults().call();
      this.setState({
        winner,
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
      });
    }

    this.setState({
      resultsLoading: false,
    });
  };

  render() {
    return (
      <Layout>
        <Button
          disabled={!this.state.campaignDay}
          basic
          color="green"
          loading={this.state.campaignLoading}
          onClick={this.onEndCampaign}
        >
          End campaign
        </Button>
        <Button
          disabled={this.state.countingDay}
          basic
          onClick={this.onStartCounting}
          color="green"
          loading={this.state.countingLoading}
        >
          Start counting
        </Button>
        <Button
          loading={this.state.resultsLoading}
          onClick={this.onDeclare}
          fluid
          primary
          style={{ marginTop: "10px" }}
        >
          Declare results
        </Button>

        <Message
          error
          header="An error occured"
          list={[
            "Only the election commissioner can access these options",
            "Please check your Internet connection",
          ]}
          hidden={!this.state.errorMessage}
        />
        <Message positive hidden={!this.state.winner}>
          <Message.Header>And the winner is...</Message.Header>
          <p>{this.state.winner}</p>
        </Message>
      </Layout>
    );
  }
}

export default CommissionerHome;
