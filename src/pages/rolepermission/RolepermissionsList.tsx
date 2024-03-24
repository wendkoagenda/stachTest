import strings from "@/constants/strings.constant";
import RoleDataTable from "./components/RoleDataTable";

export default function SettingsList() {
  return (
    <>
      {/* <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12 border border-gray-300"> */}
      <div className="w-full mx-auto ">
        <div>
          <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
            {strings.TEXTS.ROLE_LIST}
          </h4>
        </div>
        <div className="">
          <RoleDataTable />
        </div>
      </div>
    </>
  );
}
