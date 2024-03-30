import HorizontalHeader from "@/components/partials/HorizontalHeader";
import Footer from "../../components/partials/Footer";

export default function Home() {
  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12">
        <div className="border border-red-600">
          <h4 className="scroll-m-20 text-2xl font-extrabold tracking-tight ">
            Page title
          </h4>
        </div>
        <div className="border border-blue-600">
          <h4 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl">
            Taxing Laughter: The Joke Tax Chronicles
          </h4>
        </div>
      </div>
      <Footer />
    </>
  );
}
