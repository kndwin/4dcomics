import { styled } from "classname-variants/react";

const LayoutRoot = styled(
  "div",
  "w-full h-full min-h-screen min-w-[80em] bg-stone-200"
);
const LayoutHeader = styled("header", "p-8 bg-white");
const LayoutMain = styled(
  "main",
  "max-w-[80em] px-4 mx-auto relative flex flex-col"
);

export const Layout = Object.assign(LayoutRoot, {
  Header: LayoutHeader,
  Main: LayoutMain,
});
