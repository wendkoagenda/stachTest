/* eslint-disable react-hooks/exhaustive-deps */
import { UserShowModel } from "@/@types/Global/User";
import { UpdateResponsibilityModel } from "@/@types/Student/Student";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Icons } from "@/constants/icons.constant";
import strings from "@/constants/strings.constant";
import {
  closeReponsabilityDialog,
  closeStudentUpdateDialog,
  refreshStudentList,
} from "@/redux/slices/studentSlice";
import {
  useFetchStudentByIdQuery,
  useFetchStudentsQuery,
  useUpdateResponsibilityMutation,
} from "@/services/student";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Définition du schéma de validation du formulaire
const formSchema = z.object({
  responsibility: z.enum(
    [
      "delegue",
      "sub_delegue",
      "delegue_inter",
      "delegue",
      "sub_delegue_inter",
      "none",
    ],
    {
      required_error: "Vous devez sélectionner un genre.",
    }
  ),
});

export default function UpdateResponsabilityForm({
  studentId,
  studentUuid,
}: {
  studentId: number;
  studentUuid: string;
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
  const studentUpdate = permissions.userPermissions.includes(
    strings.PERMISSIONS.STUDENT_UPDATE
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  // Hook pour récupérer la liste des Students (RTK)
  const fetchStudentsQuery = useFetchStudentsQuery(access_token);

  // Préparation du paramettre du hook de recuperation des détails d'un students
  const actorShowModel: UserShowModel = {
    userUuid: studentUuid,
    access_token: access_token,
  };
  // Hook de récupération des détails d'un student (RTK)
  const fetchStudentByIdQuery = useFetchStudentByIdQuery(actorShowModel);

  // Récupération des détails de l'student au montage du composant
  useEffect(() => {
    fetchStudentByIdQuery.refetch();
  }, []);

  // Hook pour la mise à jour  d'un Student (RTK)
  const [updateResponsability, { error, isLoading }] =
    useUpdateResponsibilityMutation();

  // Variables useStates
  const [responsibility, setResponsibility] = useState("none");
  const [isActive, setIsActive] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const data = fetchStudentByIdQuery.data;
  const isFetching = fetchStudentByIdQuery.isFetching;

  // Variable "form" pour la récupération des champs dans de le formulaire avec zod et préparation des anciennes  valeurs
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // useEffect(() => {
  //   if (data && !dataLoaded) {
  //     setDataLoaded(true);
  //     setResponsibility(data?.data.student.responsibility);
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (data) {
  //     form.reset({
  //       responsibility: data?.data.student.responsibility,
  //     });
  //   }
  // }, [data]);
  // Variable de type fonction pour l'affichage de notification de type Toast
  const { openNotification } = NotificationToast();
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de soumission du formulaire de mise à jour
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const updateResponsibilityModel: UpdateResponsibilityModel = {
      updateResponsibility: values,
      access_token: access_token,
      student_id: studentId,
    };
    await updateResponsability(updateResponsibilityModel).unwrap();
    dispatch(refreshStudentList());
    dispatch(closeReponsabilityDialog());
    fetchStudentsQuery.refetch();
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
    dispatch(closeReponsabilityDialog());
  };
  //*******************Fin

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
              {/* <p>{data?.data.student.responsibility}</p> */}
              <FormField
                control={form.control}
                name="responsibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{strings.TH.RESPONSIBILITY}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={data?.data.student.responsibility}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="delegue" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {strings.TH.DELEGUE}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="sub_delegue" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {strings.TH.SUB_DELEGUE}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="delegue_inter" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {strings.TH.DELEGUE_INTER}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="sub_delegue_inter" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {strings.TH.SUB_DELEGUE_INTER}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="none" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {strings.TH.NONE}
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {studentUpdate && (
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
