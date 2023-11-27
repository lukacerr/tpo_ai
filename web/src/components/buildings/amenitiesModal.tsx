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
import { Amenity, Building } from '@tpoai/data-commons';
import { PatchBuildingRequest } from '@/requests/buildings.requests';

export default function AmenitiesModal({
  open,
  setOpen,
  building,
}: React.PropsWithRef<{ building: Partial<Building>; open: boolean; setOpen: (v: boolean) => void }>) {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setError] = useState<AxiosError | null>(null);
  const reloadPage = () => location.reload();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async (f: FormObj<Amenity>) => {
    setIsLoading(true);
    setError(null);

    const form: Partial<Amenity> = {
      name: f.name.value,
      description: f.description.value || undefined,
      floor: f.floor.value || undefined,
    };

    return !building.id
      ? null
      : PatchBuildingRequest(building.id, {
          amenities: {
            create: { ...form, name: form?.name ?? '-' },
          },
        })
          .then(() => reloadPage())
          .catch(console.error);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <DialogTitle>Crear nueva comodidad</DialogTitle>
        {building.address && <DialogContent>Para el edificio "{building.address}".</DialogContent>}
        <form onSubmit={(e) => OnFormSubmission<Amenity>(e, handleSubmit)}>
          <Stack spacing={1}>
            <FormInput name="name" required label="Nombre" />
            <FormInput name="description" label="Descripción" />
            <FormInput name="floor" label="Piso" />
            <Divider sx={{ marginBlock: '1rem !important' }} />
            <Button loading={isLoading} type="submit">
              Crear comodidad
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
