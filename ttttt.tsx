/* eslint-disable react-hooks/exhaustive-deps */
import { ActorCreationModel } from "@/@types/ActorCreationModel";
import { ActorShowModel } from "@/@types/ActorShowModel";
import { ActorUpdateModel } from "@/@types/ActorUpdateModel";
import TableSkeleton from "@/components/custom/TableSkeleton";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import strings from "@/constants/strings.constant";
import {
  closeAgentCreateDialog,
  closeAgentUpdateDialog,
} from "@/redux/slices/agentSlice";
import {
  useCreateAgentMutation,
  useFetchAgentByIdQuery,
  useFetchAgentsQuery,
  useUpdateAgentMutation,
} from "@/services/agent";
import {
  renderFetchBaseQueryError,
  renderSerializedError,
} from "@/utils/functions/errorRenders";
import { NotificationToast } from "@/utils/functions/openNotificationToast";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { CheckCircle2, Loader2, SaveIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  phone1: z.string().min(1, { message: "Le phone 1 est obligatoire" }),
  phone2: z.string().default("Non définie"),
  camp_year_id: z.number(),
  is_active: z.boolean().default(true),
});

export default function UpdateAgentForm({ agentUuid }: { agentUuid: string }) {
  // Camp year
  const camp_year_id =
    localStorage.getItem("__ppohwr4bvkyjfiv298fjyfufavc__nv2") ?? "0";
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";

  const actorShowModel: ActorShowModel = {
    actorUuid: agentUuid,
    access_token: access_token,
  };

  const fetchAgentByIdQuery = useFetchAgentByIdQuery(actorShowModel);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // const fetchData = async () => {
    fetchAgentByIdQuery.refetch();
    //   const defaultTitle = data?.data?.agent?.title ?? "";
    //   const defaultBanner = data?.data?.agent?.banner ?? "";
    //   const defaultFirstName = data?.data?.user?.first_name ?? "";

    //   // Utilisez ces valeurs pour initialiser defaultValues
    //   form.reset({
    //     title: defaultTitle,
    //     banner: defaultBanner,
    //     first_name: defaultFirstName,
    //     // Autres champs...
    //   });
    // };
    // fetchData();
  }, []);

  const data = fetchAgentByIdQuery.data;
  const isFetching = fetchAgentByIdQuery.isFetching;
  useEffect(() => {
    if (data && !dataLoaded) {
      setDataLoaded(true);
    }
  }, [data]);
  console.log("isLoading show:", isFetching);

  console.log(data?.data.user.is_active);
  console.log(data?.data.user.gender);

  const dispatch = useAppDispatch();
  const fetchAgentsQuery = useFetchAgentsQuery(access_token);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [gender, setGender] = useState("male");
  useEffect(() => {
    if (data) {
      setGender(data?.data.user.gender);
      form.reset({
        title: data?.data.agent.title,
        banner: data?.data.agent.banner,
        first_name: data?.data.user.first_name,
        last_name: data?.data.user.last_name,
        gender: data?.data.user.gender,
        email: data?.data.user.email,
        phone1: data?.data.user.phone1,
        phone2: data?.data.user.phone1,
        camp_year_id: parseInt(camp_year_id),
        is_active: data?.data.user.is_active,
      });
    }
  }, [data]);

  const [updateAgent, { error, isLoading }] = useUpdateAgentMutation();
  const { openNotification } = NotificationToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const actorUpdateModel: ActorUpdateModel = {
      updateActor: values,
      access_token: access_token,
      actorUuid: agentUuid,
    };
    console.log("values", actorUpdateModel);
    await updateAgent(actorUpdateModel).unwrap();
    dispatch(closeAgentUpdateDialog());
    fetchAgentsQuery.refetch();
    openNotification(
      undefined,
      <div className="flex flex-row text-green-600">
        <CheckCircle2 className="mr-2 h-4 w-4" />{" "}
        {strings.MESSAGES.SUCCESS_ACTION}
      </div>
    );
  };

  const onCloseClick = () => {
    dispatch(closeAgentUpdateDialog());
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
            <div className="grid grid-cols-2 gap-4 ">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input placeholder="Non définie" {...field} />
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
                    <FormLabel>Banniere</FormLabel>
                    <FormControl>
                      <Input placeholder="banner" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{strings.TH.LAST_NAME}</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom de famille" {...field} />
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
                    <FormLabel>{strings.TH.FIRST_NAME}</FormLabel>
                    <FormControl>
                      <Input placeholder="first_name" {...field} />
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
                    <FormLabel>{strings.TH.EMAIL}</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{strings.TH.PHONE1}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Numéro téléphone Whatsapp"
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
                      <Input placeholder="Numéro de téléphone 2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={gender}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Masculin
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal">Feminin</FormLabel>
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
                    <FormLabel>Statut (Actif ou Inactif) </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
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
          </form>
        </Form>
      )}
    </>
  );
}
