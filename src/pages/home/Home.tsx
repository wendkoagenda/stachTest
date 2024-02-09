import Footer from "../../components/commons/Footer";
import Header from "../../components/commons/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="w-full mx-auto p-9 border border-gray-300">
        <div className="grid lg:grid-cols-4  md:grid-cols-2 gap-4">
          <div className="border border-red-600 ">1</div>
          <div className="border border-red-600 ">2</div>
          <div className="border border-red-600 ">3</div>
          <div className="border border-red-600 ">4</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
