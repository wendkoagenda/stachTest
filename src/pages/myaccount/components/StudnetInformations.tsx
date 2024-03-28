import TableSkeleton from "@/components/custom/skeleton/TableSkeleton";
import strings from "@/constants/strings.constant";
import { useFetchMyStudentInformationsQuery } from "@/services/myinformation";
import ProfileImage from "./ProfileImage";
import { Badge } from "@/components/ui/badge";

export default function StudentInformations() {
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  const firstName = localStorage.getItem("first_name") ?? "Opps";
  const lastName = localStorage.getItem("last_name") ?? "Opps";

  const fetchMyStudentInformationsQuery =
    useFetchMyStudentInformationsQuery(access_token);
  //*******************FinF

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchMyStudentInformationsQueryData =
    fetchMyStudentInformationsQuery.data?.data;
  const isLoading = fetchMyStudentInformationsQuery.isLoading;
  const myStudentInformation = fetchMyStudentInformationsQueryData;

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
                <p>{myStudentInformation?.student.banner} </p>
              </li>
              <li>
                <b className="text text-md">{strings.TH.TITLE} </b>
                <p>{myStudentInformation?.student.title} </p>
              </li>
              <li>
                <b className="text text-md">{strings.TH.REGISTRATION_NO} </b>{" "}
                <p>{myStudentInformation?.student.registration_number}</p>
              </li>
              <li>
                <b className="text text-md">{strings.TH.RESPONSIBILITY} </b>{" "}
                <p>
                  <Badge
                    variant={
                      myStudentInformation?.student.responsibility === "none"
                        ? "default"
                        : myStudentInformation?.student.responsibility ===
                          "delegue"
                        ? "destructive"
                        : "destructive"
                    }
                    className="text-xs"
                  >
                    {myStudentInformation?.student.responsibility === "none"
                      ? "Aucune"
                      : myStudentInformation?.student.responsibility ===
                        "delegue"
                      ? "Délégué"
                      : "Délégué Adj"}
                  </Badge>
                </p>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
