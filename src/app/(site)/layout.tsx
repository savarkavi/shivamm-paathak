import Overlay from "@/components/overlay";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      {/* <Overlay /> */}
      {children}
    </div>
  );
};

export default MainLayout;
