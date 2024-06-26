import { DCNF_SUMCreationModel } from "@/@types/Module/Module";
import TableSkeleton from "@/components/custom/skeleton/TableSkeleton";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import strings from "@/constants/strings.constant";
import { cn } from "@/lib/utils";
import {
  closeModuleCreateDialog,
  refreshModuleList,
} from "@/redux/slices/moduleSlice";
import {
  useCreateDCNF_SUMMutation,
  useFetchSUMsQuery,
} from "@/services/module";
import {
  renderFetchBaseQueryError,
  renderSerializedError,
} from "@/utils/functions/errorRenders";
import { NotificationToast } from "@/utils/functions/openNotificationToast";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { zodResolver } from "@hookform/resolvers/zod";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  Check,
  CheckCircle2,
  ChevronsUpDown,
  Loader2,
  SaveIcon,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { Icons } from "@/constants/icons.constant";

// Définition du schéma de validation du formulaire
const formSchema = z.object({
  su_m_id: z.number({
    required_error: "Titre obligatoire",
  }),
  dcnf_id: z.number({
    required_error: "Titre obligatoire",
  }),
  camp_year_id: z.number(),
});

interface ModelForSelect {
  label: string;
  value: number;
}
export default function CreateDCNFSUMForm() {
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
  const moduleStore = permissions.userPermissions.includes(
    strings.PERMISSIONS.TEACHER_STORE
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  //Hook de récupération de la liste des modules (Redux store)
  const fetchSUMsQuery = useFetchSUMsQuery(access_token);

  // Récupération de la liste des modules au montage du composant
  useEffect(() => {
    fetchSUMsQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Variables useState
  const [moduleId, setModuleId] = useState(0);
  const [moduleUuid, setModuleUuid] = useState("");
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchSUMsQueryData = fetchSUMsQuery.data?.data;
  const data = Array.isArray(fetchSUMsQueryData) ? fetchSUMsQueryData : [];
  const isLoading = fetchSUMsQuery.isLoading;
  const error = fetchSUMsQuery.error;

  const sums: ModelForSelect[] = data.map((item) => {
    return {
      label: item.module.title, // Renommer title en label
      value: item.id, // Renommer value en id
    };
  });
  const { dcnf_id } = useParams();
  const parsedDcnfId = dcnf_id ? parseInt(dcnf_id) : 0;
  //*******************Déclaration d'autres variables
  // Variable "form" pour la récupération des champs dans de le formulaire avec zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      su_m_id: 0,
      dcnf_id: parsedDcnfId,
      camp_year_id: parseInt(camp_year_id),
    },
  });
  // Variable de type fonction pour l'affichage de notification de type Toast
  const { openNotification } = NotificationToast();
  //*******************Fin
  const [createDCNFSUM, { isLoading: isSubmiting, error: submittingError }] =
    useCreateDCNF_SUMMutation();

  //*******************Déclaration de fonctions
  // Fonction de soumission du formulaire de création
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    const dcnf_sumCreationModel: DCNF_SUMCreationModel = {
      newDcnfSum: values,
      access_token: access_token,
    };
    await createDCNFSUM(dcnf_sumCreationModel).unwrap();
    dispatch(refreshModuleList());
    dispatch(closeModuleCreateDialog());
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
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {error
              ? "status" in error
                ? renderFetchBaseQueryError(error as FetchBaseQueryError)
                : renderSerializedError(error as SerializedError)
              : " "}
            <div className="grid grid-cols-1 gap-1 md:grid md:grid-cols-1 md:gap-4 ">
              <FormField
                control={form.control}
                name="su_m_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <FormLabel>{strings.TH.MODULE}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? sums.find((sum) => sum.value == field.value)
                                  ?.label
                              : strings.PLACEHOLDERS.SELECT_MODULE}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandEmpty>
                            {strings.MESSAGES.NO_DATA}
                          </CommandEmpty>
                          <CommandGroup>
                            {sums.map((sum) => (
                              <CommandItem
                                value={sum.label}
                                key={sum.value}
                                onSelect={() => {
                                  form.setValue("su_m_id", sum.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    sum.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {sum.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      {strings.INSTRUCTIONS.SELECT_MODULE}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {moduleStore && (
              <DialogFooter className="flex flex-row justify-end">
                {isSubmiting ? (
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
        )}
      </Form>
    </>
  );
}
