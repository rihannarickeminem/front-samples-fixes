import React, { Component } from 'react';
import { withRouter } from "react-router";
import { HLayout, HLayoutItem } from "react-flexbox-layout";

import SimpleLeftBar from "components/Dashboard/LeftBar/";
import StudentSpotLight from "components/SpotLight/Student";
import ClassroomSpotLight from "components/SpotLight/Classroom";
import {
  students,
  classrooms,
} from '../../constants';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.setSelectedItem = this.setSelectedItem.bind(this)
    if(this.props.students){
      this.items = this.props.students;
      this.itemType = students;
    }
    if(this.props.classrooms){
      this.items = this.props.classrooms;
      this.itemType = classrooms;
    }
    this.state = {
      selectedItemId: '',
      spotlight: '',
      spotlighted: '',
    }
  }
  componentDidMount(){
    if(this.props.match.params && this.props.match.params.Id)
      this.setSelectedItem(this.props.match.params.Id);
  }

  setSelectedItem(id){
		let selectedItemId = id;
    let SpotLight = this.itemType === classrooms ?
      ClassroomSpotLight : StudentSpotLight;

    let spotlighted = this.props[this.itemType].find(
      item => item._id == selectedItemId
    )
    let spotLightProps = {};

    let propName = this.itemType.slice(0, -1);
    spotLightProps[propName] = spotlighted;

    let spotlight = <SpotLight {...spotLightProps} />;
    this.setState({
      ...this.state,
      selectedItemId,
      spotlight,
      spotlighted,
    });
  }

  render(){
    return (
      <HLayout width="100%" gutter={7}>
        <HLayoutItem flexGrow={1}>
          <SimpleLeftBar items={this.items}
            setSelectedItem={this.setSelectedItem}
            selectedItemId={this.state.selectedItemId}
            itemType={this.itemType} />
        </HLayoutItem>
        <HLayoutItem flexGrow={1}>
          {this.state.selectedItemId &&
              <div style={spotLightContainerStyle}>
                {this.state.spotlight}
              </div>
          }
        </HLayoutItem>
      </HLayout>
    );
  }
};

export default withRouter(Dashboard);

const spotLightContainerStyle = {
  paddingTop: "105px",
  boxSizing: "border-box",
  height: "400px",
  width: "460px",
  marginLeft: "auto",
  backgroundImage: "linear-gradient(288deg, rgb(235, 244, 244) 50%, rgb(251, 253, 253) 45%, rgb(255, 255, 255) 85%, rgb(255, 255, 255) 100%)",
};
