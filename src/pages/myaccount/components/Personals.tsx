import TableSkeleton from "@/components/custom/skeleton/TableSkeleton";
import strings from "@/constants/strings.constant";
import { useFetchMyUserInformationsQuery } from "@/services/myinformation";
import ProfileImage from "./ProfileImage";
import { Badge } from "@/components/ui/badge";

export default function Personals() {
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  const firstName = localStorage.getItem("first_name") ?? "Opps";
  const lastName = localStorage.getItem("last_name") ?? "Opps";

  const fetchMyUserInformationsQuery =
    useFetchMyUserInformationsQuery(access_token);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchMyUserInformationsQueryData =
    fetchMyUserInformationsQuery.data?.data;
  const isLoading = fetchMyUserInformationsQuery.isLoading;
  const myUserInformation = fetchMyUserInformationsQueryData;

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
                <b className="text text-md">{strings.TH.LAST_NAME} </b>{" "}
                <p>{myUserInformation?.last_name}</p>
              </li>
              <li>
                <b className="text text-md">{strings.TH.FIRST_NAME} </b>
                <p>{myUserInformation?.first_name} </p>
              </li>
              <li>
                <b className="text text-md">{strings.TH.EMAIL} </b>{" "}
                <p>{myUserInformation?.email} </p>
              </li>
              <li>
                <b className="text text-md">{strings.TH.PHONE1} </b>{" "}
                <p>{myUserInformation?.phone1} </p>
              </li>
              <li>
                <b className="text text-md">{strings.TH.PHONE2} </b>{" "}
                <p>{myUserInformation?.phone2} </p>
              </li>
              <li>
                <b className="text text-md">{strings.TH.STATUS} </b>{" "}
                <p>
                  <Badge
                    variant={
                      myUserInformation?.is_active === 1
                        ? "default"
                        : "destructive"
                    }
                    className="text-xs"
                  >
                    {myUserInformation?.is_active === 1 ? "Actif" : "Inactif"}
                  </Badge>
                </p>
              </li>
              <li>
                <b className="text text-md">{strings.TH.GENDER} </b>{" "}
                <p>
                  <Badge
                    variant={
                      myUserInformation?.gender === "male"
                        ? "secondary"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {myUserInformation?.gender === "female" ? "F" : "M"}
                  </Badge>{" "}
                </p>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
