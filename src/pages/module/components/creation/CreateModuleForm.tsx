import { UserCreationModel } from "@/@types/Global/User";
import { ModuleCreationModel } from "@/@types/Module/Module";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import strings from "@/constants/strings.constant";
import { closeModuleCreateDialog } from "@/redux/slices/moduleSlice";
import {
  useCreateModuleMutation,
  useFetchModulesQuery,
} from "@/services/module";
import {
  renderFetchBaseQueryError,
  renderSerializedError,
} from "@/utils/functions/errorRenders";
import { NotificationToast } from "@/utils/functions/openNotificationToast";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import usePermissions from "@/utils/hooks/usePermissions";
import { zodResolver } from "@hookform/resolvers/zod";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { CheckCircle2, Loader2, SaveIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

// Définition du schéma de validation du formulaire
const formSchema = z.object({
  title: z.string({
    required_error: "Titre obligatoire",
  }),
  acronym: z.string({
    required_error: "Acronym obligatoire",
  }),
  code: z.string({
    required_error: "Code required",
  }),
  vh_cm: z.number({
    required_error: "Age is required",
    invalid_type_error: "Age must be a number",
  }),
  vh_td: z.number({
    required_error: "TD required",
  }),
  vh_tp: z.number({
    required_error: "TP required",
  }),
  credits: z.number({
    required_error: "Credits required",
  }),
  coef: z.number({
    required_error: "Coef required",
  }),
  description: z.string().default("Non définie"),
  camp_year_id: z.number(),
});

export default function CreateModuleForm() {
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
  const decodedToken = usePermissions();
  //Liste des permissions requises
  const moduleStore = decodedToken.userPermissions.includes(
    strings.PERMISSIONS.TEACHER_STORE
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  // Hook pour récupérer la liste des Modules (RTK)
  const fetchModulesQuery = useFetchModulesQuery(access_token);
  // Hook pour creation d'un Module (RTK)
  const [createModule, { isLoading, error }] = useCreateModuleMutation();
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Variable "form" pour la récupération des champs dans de le formulaire avec zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      acronym: "",
      code: "",
      vh_cm: 0,
      vh_td: 0,
      vh_tp: 0,
      credits: 0,
      coef: 0,
      description: "",
      camp_year_id: parseInt(camp_year_id),
    },
  });
  // Variable de type fonction pour l'affichage de notification de type Toast
  const { openNotification } = NotificationToast();
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de soumission du formulaire de création
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const moduleCreationModel: ModuleCreationModel = {
      newModule: values,
      access_token: access_token,
    };
    await createModule(moduleCreationModel).unwrap();
    dispatch(closeModuleCreateDialog());
    fetchModulesQuery.refetch();
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
    dispatch(closeModuleCreateDialog());
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
              name="acronym"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{strings.TH.ACRONYM}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={strings.PLACEHOLDERS.ACRONYM}
                      {...field}
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
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{strings.TH.CODE}*</FormLabel>
                  <FormControl>
                    <Input placeholder={strings.PLACEHOLDERS.CODE} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vh_cm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{strings.TH.VH_CM}*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={strings.PLACEHOLDERS.VH_CM}
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
              name="vh_td"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{strings.TH.VH_TD}*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={strings.PLACEHOLDERS.VH_TD}
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
          <div className="grid grid-cols-1 gap-1 md:grid md:grid-cols-2 md:gap-4">
            <FormField
              control={form.control}
              name="vh_tp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{strings.TH.VH_TP}*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={strings.PLACEHOLDERS.VH_TP}
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
              name="credits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{strings.TH.CREDIT}*</FormLabel>
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
              name="coef"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{strings.TH.COEF}*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={strings.PLACEHOLDERS.COEF}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{strings.TH.DESCRIPTION}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={strings.PLACEHOLDERS.DESCRIPTION}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 md:grid md:grid-cols-2 md:gap-4">
            {/* <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{strings.TH.GENDER}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {strings.TH.MASCULIN}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {strings.TH.FEMININ}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> {strings.TH.STATUS}</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    {strings.INSTRUCTIONS.STATUS}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          {moduleStore && (
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
