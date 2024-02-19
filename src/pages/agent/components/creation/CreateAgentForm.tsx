import { ActorCreationModel } from "@/@types/ActorCreationModel";
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
import { closeAgentCreateDialog } from "@/redux/slices/agentSlice";
import { useCreateAgentMutation, useFetchAgentsQuery } from "@/services/agent";
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

export default function CreateAgentForm() {
  // Camp year
  const camp_year_id =
    localStorage.getItem("__ppohwr4bvkyjfiv298fjyfufavc__nv2") ?? "0";
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";

  const dispatch = useAppDispatch();
  const fetchAgentsQuery = useFetchAgentsQuery(access_token);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      banner: "",
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

  const [createAgent, { isLoading, error }] = useCreateAgentMutation();
  const { openNotification } = NotificationToast();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const actorCreationModel: ActorCreationModel = {
      newActor: values,
      access_token: access_token,
    };
    await createAgent(actorCreationModel).unwrap();
    dispatch(closeAgentCreateDialog());
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
    dispatch(closeAgentCreateDialog());
  };

  return (
    <>
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
                    <Input placeholder="Numéro téléphone Whatsapp" {...field} />
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
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Masculin</FormLabel>
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
    </>
  );
}
