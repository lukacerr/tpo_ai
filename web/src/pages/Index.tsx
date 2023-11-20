import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import { formLabelClasses } from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import FormInput from '@/components/forms/FormInput';
import { FormObj, OnFormSubmission } from '@/utils/eventForm';
import { Alert, Button } from '@mui/joy';
import { useState } from 'react';
import { setNewAuth } from '@/utils/auth';
import { UsersLoginRequest } from '@/requests/users.requests';
import { AxiosError } from 'axios';
import PageBase from '@/components/layouts/PageBase';

interface ISignForm {
  username: string;
  password: string;
  persistent: boolean;
}

export default function IndexPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const handleSubmit = async (f: FormObj<ISignForm>) => {
    setIsLoading(true);
    setError(null);

    const form: ISignForm = {
      username: f.username.value,
      password: f.password.value,
      persistent: f.persistent.checked,
    };

    UsersLoginRequest(form)
      .then((r) => setNewAuth(r.data, form.persistent))
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  return (
    <PageBase
      title="Ingresar"
      mainSx={{
        my: 'auto',
        py: 2,
        pb: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '26em',
        maxWidth: '100%',
        mx: 'auto',
        borderRadius: 'sm',
        '& form': {
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        },
        [`& .${formLabelClasses.asterisk}`]: {
          visibility: 'hidden',
        },
      }}
    >
      <Typography level="h3">Ingresá con tu cuenta</Typography>
      <Stack gap={4} sx={{ mt: 2 }}>
        <form onSubmit={(e) => OnFormSubmission<ISignForm>(e, handleSubmit)}>
          <FormInput name="username" required label="Usuario" />
          <FormInput name="password" type="password" required label="Contraseña" />
          <Stack gap={4} sx={{ mt: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Checkbox size="sm" label="Recordáme" name="persistent" defaultChecked />
              <Link level="title-sm" href="#">
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>
            <Button type="submit" loading={isLoading} fullWidth>
              Ingresar
            </Button>
            {error && (
              <Alert variant={error.response?.status === 401 ? 'plain' : 'soft'} color="danger">
                {error.response?.status === 401 ? 'Credenciales invalidas.' : 'Ocurrió un error. Vuelva a intentarlo'}
              </Alert>
            )}
          </Stack>
        </form>
      </Stack>
    </PageBase>
  );
}
