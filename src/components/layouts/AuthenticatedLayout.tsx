import Footer from "../commons/Footer";
import Header from "../commons/HorizontalHeader";

// export default function AuthenticatedLayout({ content }: { content: string }) {
//   return (
//     <>

//       <div className=" w-full mx-auto p-4  border border-gray-300">
//         <Header />
//         {content}
//         <Footer />
//       </div>
//     </>
//   );
// }

const AuthenticatedLayout: React.FC<{ content: React.ReactNode }> = ({
  content,
}) => {
  return (
    <>
      <Header />
      <div className=" w-full mx-auto p-4  border border-gray-300">
        {content}
      </div>
      <Footer />
    </>
  );
};

export default AuthenticatedLayout;
