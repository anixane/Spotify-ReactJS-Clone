import React from "react";
import "./SidebarOption.css";

// "Icon" starts with capital letter cuz we are passing Icon as a component
function SidebarOption({ title, Icon }) {
  return (
    <div className="sidebarOption">
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
}

export default SidebarOption;
