import React from "react";
import { Card, Button } from "semantic-ui-react";
import { Link } from "../../routes";

export default () => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>View candidates list</Card.Header>
        <Card.Meta>Or click here to contest in the election.</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <div className="ui buttons">
          <Button basic color="green">
            <Link route={"/candidates"}>
              <a>Candidates</a>
            </Link>
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};
