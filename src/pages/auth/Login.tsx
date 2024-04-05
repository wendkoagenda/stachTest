import logoLightFull from "@/assets/logo/typo_campus_flow_512x1024.png";
import logoDarkFull from "@/assets/logo/typo_campus_flow_512x1024_dark.png";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import getConfig from "@/config";
import { REDIRECT_URL_KEY } from "@/constants/app.constant";
import strings from "@/constants/strings.constant";
import { login } from "@/redux/slices/authSlice";
import LoginService from "@/services/LoginService";
import useQuery from "@/utils/hooks/useQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
interface ErrorResponse {
  error: string;
}

const formSchema = z.object({
  email: z.string().email({ message: "Mail invalide !" }),
  password: z.string().min(1, {
    message: "Le mot de passe est obligatoire ",
  }),
});

export default function Login() {
  // Theme management
  const localTheme = localStorage.getItem("vite-ui-theme");
  const logo = localTheme === "dark" ? logoDarkFull : logoLightFull;

  const navigate = useNavigate();
  const query = useQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Var
  const [isSubmitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(" ");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setSubmitting(true);
      const response = await LoginService.postLogin(values);
      dispatch(login(response.data));
      const redirectUrl = query.get(REDIRECT_URL_KEY);
      navigate(redirectUrl ? redirectUrl : getConfig().authenticatedEntryPath);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError<ErrorResponse> = error;
        if (axiosError.response) {
          const responseData = axiosError.response.data;
          if (responseData) {
            const errorMessage: string = responseData.error;
            // Traitement des erreurs spécifiques
            if (errorMessage === "Unauthorized") {
              setSubmissionError(true);
              setErrorMessage(strings.ERRORS.BAD_CREDENTIALS);
            } else if (errorMessage === "InactiveUser") {
              setSubmissionError(true);
              setErrorMessage(strings.ERRORS.INACTIVE_USER);
            }
          }
        } else if (axiosError.request) {
          setSubmissionError(true);
          setErrorMessage(strings.ERRORS.NETWORK); // Erreur reseaux
        } else {
          setSubmissionError(true);
          setErrorMessage(strings.ERRORS.UNFORESEEN); // Erreur inattendues
        }
      } else {
        setSubmissionError(true);
        setErrorMessage(strings.ERRORS.UNFORESEEN); // Erreur inattendues
      }
    } finally {
      setSubmitting(false);
    }
  };

  const dispatch = useDispatch();
  return (
    <>
      <div className="flex justify-center items-center h-screen py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12">
        <div>
          <div className="flex justify-center mb-4">
            {" "}
            <img src={logo} width={300} alt="Logo Campus Flow" />
          </div>
          <div>
            {" "}
            <Card className="w-96">
              {submissionError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Ouuppss !</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              <CardHeader>
                <CardTitle>
                  <div>{strings.TEXTS.LOGIN_FORM}</div>
                </CardTitle>
                <CardDescription>{strings.TEXTS.BON_RETOUR}</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{strings.TH.EMAIL}</FormLabel>
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
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{strings.TH.PASSWORD}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={strings.PLACEHOLDERS.PASSWORD}
                              {...field}
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {isSubmitting ? (
                      <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {strings.BUTTONS.SINGING_IN}
                      </Button>
                    ) : (
                      <Button type="submit">{strings.BUTTONS.SING_IN}</Button>
                    )}
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
