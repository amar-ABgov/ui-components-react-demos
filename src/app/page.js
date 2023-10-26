"use client";
import {
  GoAAppFooter,
  GoAAppFooterMetaSection,
  GoAAppFooterNavSection,
  GoAAppHeader,
  GoAHeroBanner,
  GoAMicrositeHeader,
  GoAOneColumnLayout,
} from "@abgov/react-components";
import { MAX_CONTENT_WIDTH } from "./layout";
import Link from "next/link";

export default function Home() {
  return (
    <GoAHeroBanner
      heading="Design System Demos"
    >
    </GoAHeroBanner>
  );
}
