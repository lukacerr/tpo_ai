/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { FormObj, OnFormSubmission } from '@/utils/eventForm';
import FormInput from '../forms/FormInput';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { Divider } from '@mui/joy';
import { Building, Prisma } from '@tpoai/data-commons';
import { PatchBuildingRequest } from '@/requests/buildings.requests';

export default function UnitsModal({
  open,
  setOpen,
  building,
}: React.PropsWithRef<{ building: Partial<Building>; open: boolean; setOpen: (v: boolean) => void }>) {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setError] = useState<AxiosError | null>(null);
  const reloadPage = () => location.reload();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async (f: FormObj<any>) => {
    setIsLoading(true);
    setError(null);

    const create: any[] = [];
    if (f.owners?.value)
      create.push(
        ...f.owners.value.split(',').map((v) => ({ User: { connect: { username: v.trim() } }, condition: 'OWNED' }))
      );

    if (f.tenants?.value)
      create.push(
        ...f.tenants.value.split(',').map((v) => ({ User: { connect: { username: v.trim() } }, condition: 'RENTED' }))
      );

    console.log(create);
    const form = {
      code: f.code.value,
      users: {
        create,
      },
    } as Prisma.UnitCreateWithoutBuildingInput;

    return !building.id
      ? null
      : PatchBuildingRequest(building.id, {
          units: {
            create: form,
          },
        })
          .then(() => reloadPage())
          .catch(console.error);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <DialogTitle>Crear nueva unidad</DialogTitle>
        {building.address && <DialogContent>Para el edificio "{building.address}".</DialogContent>}
        <form onSubmit={(e) => OnFormSubmission<any>(e, handleSubmit)}>
          <Stack spacing={1}>
            <FormInput name="code" required label="Código" />
            <FormInput name="owners" label="Propietarios (usuarios separados por coma)" />
            <FormInput name="tenants" label="Inquilinos (usuarios separados por coma)" />
            <Divider sx={{ marginBlock: '1rem !important' }} />
            <Button loading={isLoading} type="submit">
              Crear unidad
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
