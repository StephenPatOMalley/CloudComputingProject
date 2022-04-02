import Link from "next/link";
import classes from "./MainNavigation.module.css";
import { Card, Avatar, Button } from '@nextui-org/react';

function MainNavigation() {
  return (
    <>
      <Card bordered shadow={false} hoverable css={{ mw: "100%" }}>
        <div className={classes.mainDiv}>
          <Avatar squared src="/avatars/logo.jpg" css={{ size: "$20" }} />
          <div className={classes.linkDiv}>
            <Link href="/home"><a><Button shadow color="gradient" auto>Home</Button></a></Link>
          </div>
          <div className={classes.linkDiv}>
            <Link href="/account"><a><Button shadow color="gradient" auto>Account</Button></a></Link>
          </div>
          <div className={classes.linkDiv}>
            <Link href="/employees"><a><Button shadow color="gradient" auto>Employees</Button></a></Link>
          </div>
          <div className={classes.linkDiv}>
            <Link href="/signup"><a><Button shadow color="gradient" auto>Sign Up</Button></a></Link>
          </div>
          <div></div>
        </div>
      </Card>
    </>
  );
}

export default MainNavigation;
