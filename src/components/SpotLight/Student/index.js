import React from "react";

import { fullName } from "utils/name";
import { getStudentAvatar } from "utils/avatar";

import SpotLight from "..";

export default props =>{
  return <SpotLight
    imgUrl={getStudentAvatar(props.student)}
    label={fullName(props.student)}
  />;
}
