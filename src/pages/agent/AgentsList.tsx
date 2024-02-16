import HorizontalHeader from "@/components/partials/HorizontalHeader";
import Footer from "../../components/partials/Footer";
import { AgentDataTable } from "./components/AgentDataTable";

export default function AgentsList() {
  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12 border border-gray-300">
        <div>
          <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
            Liste des agents
          </h4>
        </div>
        <div className="">
          <AgentDataTable />
        </div>
      </div>
      <Footer />
    </>
  );
}
