import {
  GoADropdown,
  GoADropdownItem,
  GoASideMenu,
  GoASideMenuHeading,
} from "@abgov/react-components";
import Link from "next/link";
const Nav = () => {
  return (
      <section className="side-menu">
        <GoASideMenu>
          <GoASideMenuHeading>Demos</GoASideMenuHeading>
          <Link href="">Home</Link>
          <Link href="file-upload">File upload</Link>
        </GoASideMenu>
      </section>
  );
};

export default Nav;
