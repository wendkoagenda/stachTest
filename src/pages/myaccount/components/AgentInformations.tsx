import TableSkeleton from "@/components/custom/skeleton/TableSkeleton";
import strings from "@/constants/strings.constant";
import { useFetchMyAgentInformationsQuery } from "@/services/myinformation";
import ProfileImage from "./ProfileImage";

export default function AgentInformations() {
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  const firstName = localStorage.getItem("first_name") ?? "Opps";
  const lastName = localStorage.getItem("last_name") ?? "Opps";

  const fetchMyAgentInformationsQuery =
    useFetchMyAgentInformationsQuery(access_token);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchMyAgentInformationsQueryData =
    fetchMyAgentInformationsQuery.data?.data;
  const isLoading = fetchMyAgentInformationsQuery.isLoading;
  const myAgentInformation = fetchMyAgentInformationsQueryData;

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
                <p>{myAgentInformation?.agent.banner} </p>
              </li>
              <li>
                <b className="text text-md">{strings.TH.TITLE} </b>
                <p>{myAgentInformation?.agent.title} </p>
              </li>
              <li>
                <b className="text text-md">{strings.TH.REGISTRATION_NO} </b>{" "}
                <p>{myAgentInformation?.agent.registration_number}</p>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
