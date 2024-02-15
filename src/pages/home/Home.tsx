import HorizontalHeader from "@/components/partials/HorizontalHeader";
import Footer from "../../components/partials/Footer";

export default function Home() {
  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12 border border-gray-300">
        <div className="border border-red-600">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl font-protest">
            Taxing Laughter: The Joke Tax Chronicles
          </h1>
        </div>
      </div>
      <Footer />
    </>
  );
}
