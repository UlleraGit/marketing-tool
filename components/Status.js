import * as React from "react";
import { AccountContext } from "../components/Account";

const Status = () => {
  const [status, setStatus] = React.useState(false);
  const { getSession } = React.useContext(AccountContext);

  React.useEffect(() => {
    getSession().then((session) => {
      console.log("Session: ", session);
      setStatus(true);
    });
  }, []);
  return (
    <div style={{ fontSize: "24px" }}>
      {status ? "<button>lol</button>" : "please login"}
    </div>
  );
};

export default Status;