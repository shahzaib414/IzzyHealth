import React from "react";
import classnames from "classnames";

import "./index.scss";

export default ({show, toggle, children}) =>  {
  return (
    <React.Fragment>
      <div className={classnames({ open: show }, "modal-layout")}>
        <div className="modal">
          <span onClick={(e) => toggle(e)} className="modal-close">&times;</span>
          {children}
        </div>
      </div>
    </React.Fragment>
  );
}
