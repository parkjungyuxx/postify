import Header from "../home/header";
import SideNavBar from "../home/sideNavBar";
import List from "./list";

const Post = () => {
  return (
    <div>
      <Header />
      <container style={{ display: "flex" }}>
        <SideNavBar />
        <List />
      </container>
    </div>
  );
};

export default Post;
