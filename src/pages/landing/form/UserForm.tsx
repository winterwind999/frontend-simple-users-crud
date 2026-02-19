import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import withGetUserById from "@/components/withGetUserById";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "@/redux/apis/userApiSlice";
import { selectUserId, setUserId } from "@/redux/stores/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z
    .email("Invalid Email Address")
    .trim()
    .min(1, "Email Address is required"),
  contact: z.string().trim().min(1, "Contact is required"),
});

export type FormValues = z.infer<typeof formSchema>;

type Props = {
  user?: User;
};

const UserForm = ({ user }: Props) => {
  const dispatch = useDispatch();

  const [createUser, createUserState] = useCreateUserMutation();
  const [updateUser, updateUserState] = useUpdateUserMutation();

  const isLoading = createUserState.isLoading || updateUserState.isLoading;

  const { handleSubmit, control, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      contact: "",
    },
  });

  useEffect(() => {
    reset(user ?? { name: "", email: "", contact: "" });
  }, [user, reset]);

  const resetUserFormStates = () => {
    reset({
      name: "",
      email: "",
      contact: "",
    });
    dispatch(setUserId({ userId: null }));
    createUserState.reset();
    updateUserState.reset();
  };

  const onSubmit = async (data: FormValues) => {
    try {
      if (user?.id) {
        await updateUser({ ...user, ...data }).unwrap();
        toast.success(`User ID ${user.id} updated`);
      } else {
        await createUser(data).unwrap();
        toast.success("User created");
      }

      resetUserFormStates();
    } catch (error: unknown) {
      console.log("User Form Error:", error);
      toast.error(user?.id ? "Failed to update user" : "Failed to create user");
    }
  };

  return (
    <Card>
      <CardContent>
        <form id="user-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    type="text"
                    {...field}
                    id={field.name}
                    aria-label={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="name"
                    disabled={isLoading}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                  <Input
                    type="email"
                    {...field}
                    id={field.name}
                    aria-label={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="email"
                    disabled={isLoading}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="contact"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Contact</FieldLabel>
                  <Input
                    type="text"
                    {...field}
                    id={field.name}
                    aria-label={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="tel"
                    disabled={isLoading}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <CardAction className="flex items-center gap-3">
          <Button type="submit" aria-label="submit" form="user-form">
            {isLoading && <Spinner />} {user?.id ? "Update" : "Create"}
          </Button>
          {user?.id && (
            <Button
              type="button"
              variant="secondary"
              aria-label="cancel"
              onClick={resetUserFormStates}
            >
              Cancel
            </Button>
          )}
        </CardAction>
      </CardFooter>
    </Card>
  );
};

const UserFormWithUser = withGetUserById(UserForm, {
  required: false,
  getId: selectUserId,
});

export default UserFormWithUser;
