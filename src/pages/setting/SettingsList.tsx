import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import strings from "@/constants/strings.constant";
import Footer from "../../components/partials/Footer";
import ModulesList from "../module";
import RolepermissionsList from "../rolepermission";
import { useEffect, useState } from "react";
import loadPermissions from "@/utils/hooks/loadPermissions";

export default function SettingsList() {
  //Liste des permissions requises
  const [modulesList, setModuleList] = useState(false);
  const [rolesList, setRoleList] = useState(false);

  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setModuleList(
        permissions.userPermissions.includes(strings.PERMISSIONS.MODULES_LIST)
      );
      setRoleList(
        permissions.userPermissions.includes(strings.PERMISSIONS.ROLE_LIST)
      );
    }
  }, []);

  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12 border border-gray-300">
        <div>
          <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
            {strings.TEXTS.SETTINGS}
          </h4>
        </div>
        <div className="">
          <Tabs defaultValue="modules" className="w-full">
            <TabsList>
              {modulesList && (
                <TabsTrigger value="modules"> {strings.TH.MODULE}</TabsTrigger>
              )}
              {rolesList && (
                <TabsTrigger value="rolePermissions">
                  {strings.TH.ROLE_PERMISSIONS}
                </TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="modules">
              <ModulesList />
            </TabsContent>
            <TabsContent value="rolePermissions">
              <RolepermissionsList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
