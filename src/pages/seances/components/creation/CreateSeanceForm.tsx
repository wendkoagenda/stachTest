import { ModuleTeacherModel } from "@/@types/Module/Module";
import { SeanceCreationModel } from "@/@types/Seance/Seance";
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
import strings from "@/constants/strings.constant";
import { refreshModuleList } from "@/redux/slices/moduleSlice";
import { closeSeanceCreateDialog } from "@/redux/slices/seanceSlice";
import { useFetchModuleTeacherQuery } from "@/services/module";
import {
  useCreateSeanceMutation,
  useFetchSeancesQuery,
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
import { CheckCircle2, Loader2, SaveIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { z } from "zod";
// Définition du schéma de validation du formulaire
const formSchema = z.object({
  title: z.string().default("Non définie"),
  dcnf_sum_id: z.number({
    required_error: "Ce champ est obligatoire",
    invalid_type_error: "Ce champ doit etre un nombre",
  }),
  t_id: z.number({
    required_error: "Ce champ est obligatoire",
    invalid_type_error: "Ce champ doit etre un nombre",
  }),
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

export default function CreateSeanceForm({
  dcnfsum_id,
}: {
  dcnfsum_id: number | undefined;
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
  // Recuperation tu t_id a envoyer pour la creation de ls seance
  const moduleTeacherModel: ModuleTeacherModel = {
    dcnfsum_id: dcnfsum_id,
    access_token: access_token,
  };
  const fetchModuleTeacherQuery =
    useFetchModuleTeacherQuery(moduleTeacherModel);
  const moduleTeacher = fetchModuleTeacherQuery.data?.data;
  const teacherIdLoading = fetchModuleTeacherQuery.isFetching;
  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  // Hook pour récupérer la liste des Seances (RTK)
  const fetchSeancesQuery = useFetchSeancesQuery(access_token);
  // Hook pour creation d'un Seance (RTK)
  const [createSeance, { isLoading, error }] = useCreateSeanceMutation();
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Variable "form" pour la récupération des champs dans de le formulaire avec zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      t_id: moduleTeacher?.teacher_id,
      dcnf_sum_id: dcnfsum_id,
      vh_cm_eff: 0,
      vh_td_eff: 0,
      vh_tp_eff: 0,
      contenu: "",
      camp_year_id: parseInt(camp_year_id),
    },
  });
  // Variable de type fonction pour l'affichage de notification de type Toast
  const { openNotification } = NotificationToast();
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de soumission du formulaire de création
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const seanceCreationModel: SeanceCreationModel = {
      newSeance: values,
      access_token: access_token,
    };
    console.log("values", values);
    await createSeance(seanceCreationModel).unwrap();
    dispatch(closeSeanceCreateDialog());
    dispatch(refreshModuleList());
    fetchSeancesQuery.refetch();
    openNotification(
      undefined,
      <div className="flex flex-row text-green-600">
        <CheckCircle2 className="mr-2 h-4 w-4" />{" "}
        {strings.MESSAGES.SUCCESS_ACTION}
      </div>
    );
  };
  // Fonction de fermeture de la boite de dialogue  du formulaire de création  (Redux store)
  const onCloseClick = () => {
    dispatch(closeSeanceCreateDialog());
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
      {teacherIdLoading ? (
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
            <div className="grid grid-cols-1 ">
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
                <Button
                  onClick={onCloseClick}
                  type="button"
                  variant="secondary"
                >
                  <X className="mr-2 h-4 w-4" />
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
