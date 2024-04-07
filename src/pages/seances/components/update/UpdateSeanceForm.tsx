/* eslint-disable react-hooks/exhaustive-deps */
import { SeanceShowModel, SeanceUpdateModel } from "@/@types/Seance/Seance";
import TableSkeleton from "@/components/custom/skeleton/TableSkeleton";
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
import { Icons } from "@/constants/icons.constant";
import strings from "@/constants/strings.constant";
import { closeSeanceUpdateDialog } from "@/redux/slices/seanceSlice";
import {
  useFetchSeanceByIdQuery,
  useFetchSeancesQuery,
  useUpdateSeanceMutation,
} from "@/services/seance";
import {
  renderFetchBaseQueryError,
  renderSerializedError,
} from "@/utils/functions/errorRenders";
import { NotificationToast } from "@/utils/functions/openNotificationToast";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { z } from "zod";

// Définition du schéma de validation du formulaire
const formSchema = z.object({
  title: z.string().default("Non définie"),
  dcnfsumt_id: z
    .number({
      required_error: "Ce champ est obligatoire",
      invalid_type_error: "Ce champ doit etre un nombre",
    })
    .default(1),
  vh_cm_eff: z.number({
    required_error: "Ce champ est obligatoire",
    invalid_type_error: "Ce champ doit etre un nombre",
  }),
  vh_td_eff: z.number({
    required_error: "Ce champ est obligatoire",
    invalid_type_error: "Ce champ doit etre un nombre",
  }),
  vh_tp_eff: z.number({
    required_error: "Ce champ est obligatoire",
    invalid_type_error: "Ce champ doit etre un nombre",
  }),
  contenu: z.string().default("Non définie"),
  camp_year_id: z.number(),
});

export default function UpdateSeanceForm({
  seanceUuid,
}: {
  seanceUuid: string;
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
  const seanceUpdate = permissions.userPermissions.includes(
    strings.PERMISSIONS.SEANCE_UPDATE
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  // Hook pour récupérer la liste des Seances (RTK)
  const fetchSeancesQuery = useFetchSeancesQuery(access_token);

  // Préparation du paramettre du hook de recuperation des détails d'un seances
  const actorShowModel: SeanceShowModel = {
    seanceUuid: seanceUuid,
    access_token: access_token,
  };
  // Hook de récupération des détails d'un seance (RTK)
  const fetchSeanceByIdQuery = useFetchSeanceByIdQuery(actorShowModel);

  // Récupération des détails de l'seance au montage du composant
  useEffect(() => {
    fetchSeanceByIdQuery.refetch();
  }, []);

  // Hook pour la mise à jour  d'un Seance (RTK)
  const [updateSeance, { error, isLoading }] = useUpdateSeanceMutation();

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const data = fetchSeanceByIdQuery.data;
  const isFetching = fetchSeanceByIdQuery.isFetching;

  // Variable "form" pour la récupération des champs dans de le formulaire avec zod et préparation des anciennes  valeurs
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data?.data?.title,
        vh_cm_eff: data?.data?.vh_cm_eff,
        vh_td_eff: data?.data?.vh_td_eff,
        vh_tp_eff: data?.data?.vh_tp_eff,
        contenu: data?.data?.contenu,
        camp_year_id: parseInt(camp_year_id),
      });
    }
  }, [data]);
  // Variable de type fonction pour l'affichage de notification de type Toast
  const { openNotification } = NotificationToast();
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de soumission du formulaire de mise à jour
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const seanceUpdateModel: SeanceUpdateModel = {
      updateSeance: values,
      access_token: access_token,
      seanceUuid: seanceUuid,
    };
    await updateSeance(seanceUpdateModel).unwrap();
    dispatch(closeSeanceUpdateDialog());
    fetchSeancesQuery.refetch();
    openNotification(
      undefined,
      <div className="flex flex-row text-green-600">
        <CheckCircle2 className="mr-2 h-4 w-4" />{" "}
        {strings.MESSAGES.SUCCESS_ACTION}
      </div>
    );
  };
  // Fonction de fermeture de la boite de dialogue du formulaire de mise à jour  (Redux store)
  const onCloseClick = () => {
    dispatch(closeSeanceUpdateDialog());
  };
  //*******************Fin
  // ReacQuill options
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const reacQuillmodule = {
    toolbar: toolbarOptions,
  };
  return (
    <>
      {isFetching ? (
        <TableSkeleton />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {error
              ? "status" in error
                ? renderFetchBaseQueryError(error as FetchBaseQueryError)
                : renderSerializedError(error as SerializedError)
              : " "}
            <div className="grid grid-cols-1 gap-1 md:grid md:grid-cols-2 md:gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{strings.TH.TITLE}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={strings.PLACEHOLDERS.TITLE}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vh_cm_eff"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{strings.TH.VH_CM}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={strings.PLACEHOLDERS.CREDIT}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) {
                            field.onChange(value);
                          }
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-1 md:grid md:grid-cols-3 md:gap-4">
              <FormField
                control={form.control}
                name="vh_td_eff"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{strings.TH.VH_TD}*</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={strings.PLACEHOLDERS.CREDIT}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) {
                            field.onChange(value);
                          }
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vh_tp_eff"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{strings.TH.VH_TP}*</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={strings.PLACEHOLDERS.CREDIT}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) {
                            field.onChange(value);
                          }
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1">
              <FormField
                control={form.control}
                name="contenu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{strings.TH.CONTENT}*</FormLabel>
                    <FormControl>
                      <ReactQuill
                        modules={reacQuillmodule}
                        {...field}
                        theme="snow"
                      />
                      {/* <Input
                        placeholder={strings.PLACEHOLDERS.CONTENU}
                        {...field}
                      /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {seanceUpdate && (
              <DialogFooter className="flex flex-row justify-end">
                {isLoading ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {strings.BUTTONS.SAVING}
                  </Button>
                ) : (
                  <Button type="submit">
                    <Icons.Save className="mr-2 h-4 w-4" />
                    {strings.BUTTONS.SAVE}
                  </Button>
                )}
                <Button
                  onClick={onCloseClick}
                  type="button"
                  variant="secondary"
                >
                  <Icons.Cancel className="mr-2 h-4 w-4" />
                  {strings.BUTTONS.CANCEL}
                </Button>
              </DialogFooter>
            )}
          </form>
        </Form>
      )}
    </>
  );
}
