import { UserCreationModel } from "@/@types/Global/User";
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
import { closeStudentCreateDialog } from "@/redux/slices/studentSlice";
import {
  useCreateStudentMutation,
  useFetchStudentsQuery,
} from "@/services/student";
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
  CheckCircle2,
  CircleUser,
  Loader2,
  SaveIcon,
  SquareUser,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icons } from "@/constants/icons.constant";

// Définition du schéma de validation du formulaire
const formSchema = z.object({
  title: z.string().default("Non définie"),
  email: z.string().email({ message: "Mail invalide !" }),
  banner: z.string().default("Non définie"),
  first_name: z.string().min(1, { message: "Le prénom est obligatoire" }),
  last_name: z
    .string()
    .min(2, { message: "Le nom de famille est obligatoire" }),
  gender: z.enum(["male", "female"], {
    required_error: "Vous devez sélectionner un genre.",
  }),
  phone1: z.string().min(1, { message: "Le téléphone 1 est obligatoire" }),
  phone2: z.string().default("Non définie"),
  camp_year_id: z.number(),
  is_active: z.boolean().default(true),
});

export default function CreateStudentForm() {
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
  const studentStore = permissions.userPermissions.includes(
    strings.PERMISSIONS.STUDENT_STORE
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  // Hook pour récupérer la liste des Students (RTK)
  const fetchStudentsQuery = useFetchStudentsQuery(access_token);
  // Hook pour creation d'un Student (RTK)
  const [createStudent, { isLoading, error }] = useCreateStudentMutation();
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Variable "form" pour la récupération des champs dans de le formulaire avec zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Non définie (par defaut)",
      banner: "Non définie (par defaut)",
      first_name: "",
      last_name: "",
      gender: "male",
      email: "",
      phone1: "",
      phone2: "",
      camp_year_id: parseInt(camp_year_id),
      is_active: true,
    },
  });
  // Variable de type fonction pour l'affichage de notification de type Toast
  const { openNotification } = NotificationToast();
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de soumission du formulaire de création
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const actorCreationModel: UserCreationModel = {
      newUser: values,
      access_token: access_token,
    };
    await createStudent(actorCreationModel).unwrap();
    dispatch(closeStudentCreateDialog());
    fetchStudentsQuery.refetch();
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
    dispatch(closeStudentCreateDialog());
  };
  //*******************Fin

  return (
    <>
      <div>
        <Button size="title" style={{ pointerEvents: "none" }}>
          <Icons.User className="mr-2 h-4 w-4" />
          {strings.TEXTS.PERSONNE_INFO}
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {error
            ? "status" in error
              ? renderFetchBaseQueryError(error as FetchBaseQueryError)
              : renderSerializedError(error as SerializedError)
            : " "}
          <div className="grid grid-cols-1 gap-1 md:grid md:grid-cols-3 md:gap-4">
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{strings.TH.LAST_NAME}*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={strings.PLACEHOLDERS.LAST_NAME}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{strings.TH.FIRST_NAME}*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={strings.PLACEHOLDERS.FIRST_NAME}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{strings.TH.EMAIL}*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={strings.PLACEHOLDERS.EMAIL}
                      {...field}
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
              name="phone1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{strings.TH.PHONE1}*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={strings.PLACEHOLDERS.PHONE1}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{strings.TH.PHONE2}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={strings.PLACEHOLDERS.PHONE2}
                      {...field}
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
            />
          </div>
          <div>
            <Button size="title" style={{ pointerEvents: "none" }}>
              <Icons.Student className="mr-2 h-4 w-4" />
              {strings.TEXTS.STUDENT_INFO}
            </Button>
          </div>
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
              name="banner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{strings.TH.BANNER}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={strings.PLACEHOLDERS.BANNER}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {studentStore && (
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
              <Button onClick={onCloseClick} type="button" variant="secondary">
                <Icons.Cancel className="mr-2 h-4 w-4" />
                {strings.BUTTONS.CANCEL}
              </Button>
            </DialogFooter>
          )}
        </form>
      </Form>
    </>
  );
}
