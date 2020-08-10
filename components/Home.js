import React from "react";
import { Card, Button } from "semantic-ui-react";
import Candidate from "./home/Candidate";
import Voter from "./home/Voter";

export default () => {
  return (
    <Card.Group centered>
      <Candidate />
      <Voter />
    </Card.Group>
  );
};
