import FormInput from '@/components/forms/FormInput';
import PageBase from '@/components/layouts/PageBase';
import { RegistgerUserRequest } from '@/requests/users.requests';
import { FormObj, OnFormSubmission } from '@/utils/eventForm';
import { Alert, Button, Checkbox, Divider, Stack, Typography } from '@mui/joy';
import { Prisma } from '@tpoai/data-commons';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { GetCurrentTime } from '@/utils/datetime';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [lastUser, setLastUser] = useState<string>('');

  const handleSubmit = async (f: FormObj<Prisma.UserCreateInput>) => {
    setIsLoading(true);
    setError(null);

    const form: Prisma.UserCreateInput = {
      username: f.username.value,
      password: f.password.value,
      name: f.name?.value,
      isAdmin: f.isAdmin?.checked,
    };

    setLastUser(form.name ?? form.username);

    RegistgerUserRequest(form)
      //.then((r) => {})
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  return (
    <PageBase title="Registrar usuario">
      <Typography startDecorator={<PersonAddIcon />} level="h3">
        Registrar nuevo usuario
      </Typography>
      <Divider sx={{ marginBlock: 2 }} />
      <form onSubmit={(e) => OnFormSubmission<Prisma.UserCreateInput>(e, handleSubmit)}>
        <Stack spacing={1}>
          <FormInput name="username" required label="Usuario" />
          <FormInput name="password" type="password" required label="Contraseña" />
          <FormInput name="name" label="Nombre" />
          <Checkbox size="sm" label="¿Es administrador?" name="isAdmin" />
          <Divider sx={{ marginBlock: '1rem !important' }} />
          <Button loading={isLoading} type="submit">
            Registrar usuario
          </Button>
        </Stack>
      </form>
      {!isLoading && lastUser && (
        <Alert
          sx={{ marginBlock: 4 }}
          variant="soft"
          color={error ? 'danger' : 'success'}
          startDecorator={<PersonAddIcon />}
        >
          ({GetCurrentTime()}){' '}
          {error
            ? `La creación del usuario "${lastUser}" falló. (¿Usuario ya existente?)`
            : `Se creó el usuario "${lastUser}" con éxito.`}
        </Alert>
      )}
    </PageBase>
  );
}
