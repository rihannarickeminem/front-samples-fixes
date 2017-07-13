import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { HLayout, HLayoutItem, VLayout, VLayoutItem } from 'react-flexbox-layout';

import { fullName } from 'utils/name';
import {
  getStudentAvatar,
  getClassroomAvatar,
} from 'utils/avatar';
import {
  students,
  classrooms,
  unsuportedAvatarType,
} from '../../../constants';

function getItemAvatar(itemType, item){
  switch(true){
    case itemType === classrooms:
      return getClassroomAvatar(item)
    case itemType === students:
      return getStudentAvatar(item)
    default:
      throw unsuportedAvatarType;
  }
}

class DashboardLeftBar extends React.Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    itemType: PropTypes.string.isRequired,
		setSelectedItem: PropTypes.func,
    selectedItemId: PropTypes.string,
  };

  render() {
    const items = this.props.items;
    const itemType = this.props.itemType;
    return (
      <div>
        <h3 style={titleStyle}>{ itemType.charAt(0).toUpperCase() + itemType.slice(1) }</h3>
        {items.map(item=>this._renderItems(item, itemType))}
      </div>
    )
  }
  _renderItems(item, itemType) {
    const label = "";
    const content = <HLayout key={item._id} height="100%" alignItems="middle" gutter={7}>
          <div
            style={{
              ...avatarStyle,
              backgroundImage: `url(${getItemAvatar(itemType, item)})`,
            }}
          />
          <HLayoutItem flexGrow style={nameStyle}>
            <span>{fullName(item)}</span>
          </HLayoutItem>
          <span>{label}</span>
        </HLayout>;
    const wrappedContentStyle = this.props.selectedItemId===item._id ?
      {...entryStyle, ...selectedEntryStyle }: entryStyle;
    const wrappedContent = itemType === classrooms ?
      <div
        onClick={()=>this.props.setSelectedItem(item._id)}
        style={wrappedContentStyle} >
        {content}
      </div> :
      <NavLink
        onClick={()=>this.props.setSelectedItem(item._id)}
        to={`/${itemType}/${item._id}`}
        style={entryStyle}
        activeStyle={selectedEntryStyle}
      >
        {content}
      </NavLink>;

    return (
      <div key={item._id} >
        { wrappedContent }
      </div>
    );
  }
}

const BORDER = '1px solid #e3e9e8';

const titleStyle = {
  fontWeight: "normal",
  fontSize: "17px",
  marginLeft: "1.1rem",
  color: "#8d8d8d",
};

const entryStyle = {
  borderBottom: BORDER,
  padding: "0.3rem 0.5rem",
  height: "4rem",
  fontSize: "1.1rem",
  display: "block",
  backgroundColor: "white",
  textDecoration: "none",
  color: "black",
  cursor: "pointer",
};

const selectedEntryStyle = {
  backgroundColor: "#f6fafb",
  backgroundImage: "linear-gradient(108deg, rgb(235, 244, 244) 50%, rgb(251, 253, 253) 45%, rgb(255, 255, 255) 85%, rgb(255, 255, 255) 100%)",
  cursor: "default",
};

const nameStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const avatarStyle = {
  height: "3rem",
  width: "3rem",
  margin: "0 0.6rem",
  borderRadius: "50%",
  backgroundSize: "cover",
};

export default DashboardLeftBar;
