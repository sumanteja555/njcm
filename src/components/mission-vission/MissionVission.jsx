import Heading from "./Heading";
import MVdata from "./MVdata";

import { missionData, vissionData } from "../../utils/mission-vission";
import classes from "./MissionVission.module.css";

export default function MissionVission() {
  return (
    <div className={classes.container}>
      <Heading classes={classes.mainHeading}>OUR MISSION</Heading>

      <MVdata elements={missionData} classes={classes} />

      <Heading classes={classes.mainHeading}>OUR VISION</Heading>

      <MVdata elements={vissionData} classes={classes} />
    </div>
  );
}
