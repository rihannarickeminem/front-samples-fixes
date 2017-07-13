import React from "react";

import { fullName } from "utils/name";
import { getClassroomAvatar } from "utils/avatar";

import SpotLight from "..";

export default props =>
  <SpotLight
    imgUrl={getClassroomAvatar(props.classroom)}
    label={fullName(props.classroom)}
  />;
