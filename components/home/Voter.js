import React from "react";
import { Card, Button } from "semantic-ui-react";
import { Link } from "../../routes";

export default () => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>View the voters' list</Card.Header>
        <Card.Meta>Or click to register as a voter.</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <div className="ui buttons">
          <Button basic color="green">
            <Link route={"/voters"}>
              <a>Voters</a>
            </Link>
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};
