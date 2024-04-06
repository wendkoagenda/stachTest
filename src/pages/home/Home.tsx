import HorizontalHeader from "@/components/partials/HorizontalHeader";
import strings from "@/constants/strings.constant";
import Footer from "../../components/partials/Footer";

export default function Home() {
  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12">
        <div>
          <h4 className="scroll-m-20 text-xl font-bold tracking-tight mb-2">
            {strings.TEXTS.WELCOME}
          </h4>
        </div>
      </div>
      <Footer />
    </>
  );
}
