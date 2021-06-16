import React, {Component} from "react";
import {Col, Row, Container} from "react-bootstrap";

import ProfileJumbo from "./Profile/ProfileJumbo/ProfileJumbo";
import ProfileAbout from "./Profile/ProfileAbout/ProfileAbout";
import YourDashBoardProfile from "./Profile/YourDashBoardProfile";
import ProfileUpdater from "./Profile/ProfileJumbo/ProfileJumboUpdater";
import ProfileExperience from "./Profile/ProfileExperience/ProfileExperience";
import Sidebar from "./Sidebar/Sidebar";
import PostFeed from "./PostFeed/PostFeed";

export default class ProfilePage extends Component {
  state = {
    user: {},
  };

  componentDidMount = async () => {
    // const userId = "60c73bf1291930001560aba3";
    const endpointGetMyProfile = `https://striveschool-api.herokuapp.com/api/profile/me`;
    const bearerTokenHedri =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3M2JmMTI5MTkzMDAwMTU2MGFiYTMiLCJpYXQiOjE2MjM2Njk3NDUsImV4cCI6MTYyNDg3OTM0NX0.Lk5Z-l56SBkY6YCIvoiHpVg_0J0rEZHaO4PzAuep3bo";

    try {
      let getResponse = await fetch(endpointGetMyProfile, {
        headers: {
          Authorization: bearerTokenHedri,
          "Content-Type": "application/json",
        },
      });

      let myProfileData = await getResponse.json();
      console.log(myProfileData);
      this.setState({user: myProfileData});
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <Row>
                <ProfileUpdater />
                <Col xs={8} className="mt-2">
                  {/* Main Post Feed Stats */}
                  <PostFeed />
                  {/* Main Post Feed Ends */}
                  <ProfileJumbo
                    userId={this.state.user._id}
                    name={this.state.user.name}
                    surname={this.state.user.surname}
                    image={this.state.user.image}
                    bio={this.state.user.bio}
                    title={this.state.user.bio}
                    area={this.state.user.area}
                    username={this.state.user.username}
                  />
                  <ProfileAbout bio={this.state.user.bio} title="About" />
                  <YourDashBoardProfile title="Your Dashboard" />
                  <ProfileExperience title="Experience" />
                </Col>
                <Col xs={4} className="mt-2">
                  <Sidebar />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
