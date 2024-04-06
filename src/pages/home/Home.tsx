import HorizontalHeader from "@/components/partials/HorizontalHeader";
import Footer from "../../components/partials/Footer";
import strings from "@/constants/strings.constant";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12">
        <div>
          <h4 className="scroll-m-20 text-xl font-bold tracking-tight mb-2">
            {strings.TEXTS.YEAR_PROGRESSION} (50%)
          </h4>
          <Progress value={50} />
        </div>
        <div className="mt-6">
          <h4 className="scroll-m-20 text-xl font-bold tracking-tight mb-2">
            {strings.TEXTS.PROGRESSION_BY_DEP}
          </h4>
        </div>
      </div>
      <Footer />
    </>
  );
}
