import TableSkeleton from "@/components/custom/skeleton/TableSkeleton";
import strings from "@/constants/strings.constant";
import { useFetchMyTeacherInformationsQuery } from "@/services/myinformation";
import ProfileImage from "./ProfileImage";

export default function TeacherInformations() {
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  const firstName = localStorage.getItem("first_name") ?? "Opps";
  const lastName = localStorage.getItem("last_name") ?? "Opps";

  const fetchMyTeacherInformationsQuery =
    useFetchMyTeacherInformationsQuery(access_token);
  //*******************FinF

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchMyTeacherInformationsQueryData =
    fetchMyTeacherInformationsQuery.data?.data;
  const isLoading = fetchMyTeacherInformationsQuery.isLoading;
  const myTeacherInformation = fetchMyTeacherInformationsQueryData;

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <ProfileImage first_name={firstName} last_name={lastName} />
        </div>
        <div className="col-span-9">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <ul>
              <li>
                <b className="text text-md">{strings.TH.BANNER} </b>{" "}
                <p>{myTeacherInformation?.teacher.banner} </p>
              </li>
              <li>
                <b className="text text-md">{strings.TH.TITLE} </b>
                <p>{myTeacherInformation?.teacher.title} </p>
              </li>
              <li>
                <b className="text text-md">{strings.TH.REGISTRATION_NO} </b>{" "}
                <p>{myTeacherInformation?.teacher.registration_number}</p>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
