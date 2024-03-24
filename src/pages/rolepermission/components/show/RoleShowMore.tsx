import Footer from "@/components/partials/Footer";
import HorizontalHeader from "@/components/partials/HorizontalHeader";
import PermissionByRoleList from "../../PermissionByRoleList";

export default function RoleShowMore() {
  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12 border border-gray-300">
        <PermissionByRoleList />
      </div>
      <Footer />
    </>
  );
}
