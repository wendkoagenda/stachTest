import { ApprouveModel } from "@/@types/Seance/Seance";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import strings from "@/constants/strings.constant";
import { refreshModuleList } from "@/redux/slices/moduleSlice";
import {
  closeAgentApprouveDialog,
  refreshSeanceList,
} from "@/redux/slices/seanceSlice";
import {
  useAgentApprouveMutation,
  useFetchSeancesQuery,
} from "@/services/seance";
import {
  renderFetchBaseQueryError,
  renderSerializedError,
  renderSimpleError,
} from "@/utils/functions/errorRenders";
import { NotificationToast } from "@/utils/functions/openNotificationToast";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { CheckCircle2, Loader2, SaveIcon, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Définition du schéma de validation du formulaire
const formSchema = z.object({
  seance_id: z.number({
    required_error: "Ce champ est obligatoire",
    invalid_type_error: "Ce champ doit etre un nombre",
  }),
  registration_number: z.string({
    required_error: "Ce champ est obligatoire",
    invalid_type_error: "Ce champ doit etre un nombre",
  }),
  camp_year_id: z.number(),
});

export default function AgentApprouveForm({
  seanceId,
}: {
  seanceId: number | undefined;
}) {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération de l' Id du CampYear
  const camp_year_id =
    localStorage.getItem("__ppohwr4bvkyjfiv298fjyfufavc__nv2") ?? "0";
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin

  //*******************Politique de gestion des permissons
  // Recuperation des permissions
  const permissions = loadPermissions();
  //Liste des permissions requises
  const seanceStore = permissions.userPermissions.includes(
    strings.PERMISSIONS.SEANCE_STORE
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  // Hook pour récupérer la liste des Seances (RTK)
  const fetchSeancesQuery = useFetchSeancesQuery(access_token);
  // Hook pour creation d'un Seance (RTK)
  const [agentApprouve, { isLoading, error }] = useAgentApprouveMutation();
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Variable "form" pour la récupération des champs dans de le formulaire avec zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      registration_number: " ",
      seance_id: seanceId,
      camp_year_id: parseInt(camp_year_id),
    },
  });
  // Variable de type fonction pour l'affichage de notification de type Toast
  const { openNotification } = NotificationToast();
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de soumission du formulaire de création
  const [simpleError, setSimpleError] = useState(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const approuveModel: ApprouveModel = {
      approuveModel: values,
      access_token: access_token,
    };
    const response = await agentApprouve(approuveModel).unwrap();
    if (response.message === "AUTHENTICATION_FAILED") {
      setSimpleError(true);
    } else if (response.success === true) {
      dispatch(closeAgentApprouveDialog());
      dispatch(refreshSeanceList());
      dispatch(refreshModuleList());
      openNotification(
        undefined,
        <div className="flex flex-row text-green-600">
          <CheckCircle2 className="mr-2 h-4 w-4" />{" "}
          {strings.MESSAGES.SUCCESS_ACTION}
        </div>
      );
    }
  };
  // Fonction de fermeture de la boite de dialogue  du formulaire de création  (Redux store)
  const onCloseClick = () => {
    dispatch(closeAgentApprouveDialog());
  };
  //*******************Fin

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {error
            ? "status" in error
              ? renderFetchBaseQueryError(error as FetchBaseQueryError)
              : renderSerializedError(error as SerializedError)
            : " "}
          {simpleError &&
            renderSimpleError(
              strings.TEXTS.BAD_REGISTRATION_NUMBER_MESSAGE,
              strings.TEXTS.BAD_REGISTRATION_NUMBER_TITLE
            )}
          <div className="">
            <FormField
              control={form.control}
              name="registration_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{strings.TH.REGISTRATION_NO}</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder={strings.PLACEHOLDERS.REGISTRATION_NO}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {seanceStore && (
            <DialogFooter className="flex flex-row justify-end">
              {isLoading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {strings.BUTTONS.SAVING}
                </Button>
              ) : (
                <Button type="submit">
                  <SaveIcon className="mr-2 h-4 w-4" />
                  {strings.BUTTONS.SAVE}
                </Button>
              )}
              <Button onClick={onCloseClick} type="button" variant="secondary">
                <X className="mr-2 h-4 w-4" />
                {strings.BUTTONS.CANCEL}
              </Button>
            </DialogFooter>
          )}
        </form>
      </Form>
    </>
  );
}
