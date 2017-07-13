import React from "react";
import { withRouter } from "react-router";
import { HLayout, HLayoutItem } from "react-flexbox-layout";

import SimpleLeftBar from "components/Dashboard/LeftBar/";
import StudentSpotLight from "components/SpotLight/Student";
import ClassroomSpotLight from "components/SpotLight/Classroom";
import {
  students,
  classrooms,
} from '../../constants';

const Dashboard = props => {
  let spotlight;
  let selectedItemid;
  let items;
  let itemType;

  function setSelectedItem(type, id, SpotLight){
    let spotlighted = props[type].find(
      item => item._id == id
    )
    let spotLightProps = {};
    let propName = type.slice(0, -1);
    spotLightProps[propName] = spotlighted;
    spotlight = <SpotLight {...spotLightProps} />;
  }

  if(props.students){
    items = props.students;
    itemType = students;
  }
  if(props.classrooms){
    items = props.classrooms;
    itemType = classrooms;
  }
  if (props.match.params && props.match.params.Id) {
    selectedItemid = props.match.params.Id;
    const SpotLight = itemType === classrooms ?
      ClassroomSpotLight : StudentSpotLight;
    setSelectedItem(itemType, selectedItemid, SpotLight);
  }
  return (
    <HLayout width="100%" gutter={7}>
      <HLayoutItem flexGrow={1}>
        <SimpleLeftBar items={items} itemType={itemType} />
      </HLayoutItem>
      <HLayoutItem flexGrow={1}>
        {selectedItemid &&
          <div style={spotLightContainerStyle}>
            {spotlight}
          </div>
        }
      </HLayoutItem>
    </HLayout>
  );
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
