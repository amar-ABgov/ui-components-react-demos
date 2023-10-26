import {
  GoAAppFooter,
  GoAAppHeader,
  GoAMicrositeHeader,
  GoAOneColumnLayout,
} from "@abgov/react-components";
import Nav from "./nav";
import dynamic from "next/dynamic";
import { MAX_CONTENT_WIDTH } from "../layout";

const Layout = ({children}) => {
  return (
    <GoAOneColumnLayout>
      <section className="header" slot="header">
        <GoAMicrositeHeader
          type={"alpha"}
          feedbackUrl="https://github.com/GovAlta/ui-components/discussions"
          maxContentWidth={MAX_CONTENT_WIDTH}
        />
        <GoAAppHeader
          heading="Design system demos"
          maxContentWidth={MAX_CONTENT_WIDTH}
        ></GoAAppHeader>
      </section>
      <section className="content">
        <Nav />
        <main className="main">{children}</main>
      </section>
      <section slot="footer">
        <GoAAppFooter maxContentWidth={MAX_CONTENT_WIDTH}></GoAAppFooter>
      </section>
    </GoAOneColumnLayout>
  );
};
const LayoutComponent = dynamic(() => Promise.resolve(Layout), {
  ssr: false,
});

export default LayoutComponent;
