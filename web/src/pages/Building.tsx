/* eslint-disable @typescript-eslint/no-explicit-any */
import FormInput from '@/components/forms/FormInput';
import PageBase from '@/components/layouts/PageBase';
import { GetCurrentTime } from '@/utils/datetime';
import { FormObj, OnFormSubmission } from '@/utils/eventForm';
import { Alert, Button, Divider, Stack, Typography } from '@mui/joy';
import { Building, Prisma } from '@tpoai/data-commons';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import { GetBuildingsRequest, PatchBuildingRequest, PostBuildingRequest } from '@/requests/buildings.requests';
import ApartmentIcon from '@mui/icons-material/Apartment';

export default function BuildingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [buildingTags, setBuildingTags] = useState<{ value: number; label: string }[]>([]);
  const [lastBuilding, setLastBuilding] = useState<Partial<Building>>({});

  useEffect(() => {
    GetBuildingsRequest().then(({ data }) =>
      setBuildingTags(data.map((b: Building) => ({ value: b.id, label: b.address })))
    );
  }, []);

  const handleSubmit = async (f: FormObj<any>) => {
    setIsLoading(true);
    setError(null);

    const id = (f.buildingId as any)[1]?.value;
    const form: Prisma.BuildingCreateInput & Prisma.BuildingUpdateInput = {
      address: f.address.value,
      amenities: f.amenities.value ? JSON.parse(f.amenities.value) : undefined, // FIXME
      units: f.units.value ? JSON.parse(f.units.value) : undefined, // FIXME
    };

    setLastBuilding({ id, ...form });

    (id != 0 ? PatchBuildingRequest(id, form) : PostBuildingRequest(form))
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  return (
    <PageBase title="Edificio">
      <Typography startDecorator={<ApartmentIcon />} level="h3">
        Crear o editar edificio
      </Typography>
      <Divider sx={{ marginBlock: 2 }} />
      <form onSubmit={(e) => OnFormSubmission<any>(e, handleSubmit)}>
        <Stack spacing={1}>
          <FormInput
            name="buildingId"
            required
            label="Seleccione edificio"
            selectValues={[{ value: 0, label: '+ Nuevo', default: true }, ...buildingTags]}
          />
          <FormInput name="address" required label="Dirección" />
          <FormInput
            name="amenities"
            label="Comodidades (JSON)"
            placeholder="Interfaz para crear nuevo: UnitCreateNestedManyWithoutBuildingInput // interfaz para editar: AmenityCreateNestedManyWithoutBuildingInput"
          />
          <FormInput
            name="units"
            label="Unidades (JSON)"
            placeholder="Interfaz para crear nuevo: AmenityCreateNestedManyWithoutBuildingInput // interfaz para editar: AmenityUpdateManyWithoutBuildingNestedInput"
          />
          <Divider sx={{ marginBlock: '1rem !important' }} />
          <Button loading={isLoading} type="submit">
            Crear / editar edificio
          </Button>
        </Stack>
      </form>
      {!isLoading && lastBuilding.address && (
        <Alert
          sx={{ marginBlock: 4 }}
          variant="soft"
          color={error ? 'danger' : 'success'}
          startDecorator={<DomainAddIcon />}
        >
          ({GetCurrentTime()}){' '}
          {error
            ? `La ${lastBuilding.id == 0 ? 'creación' : 'edición'} del edificio en "${lastBuilding.address}" falló.`
            : `Se ${lastBuilding.id == 0 ? 'creó' : 'editó'} el edificio en "${
                lastBuilding.address
              }" con éxito. Recargue la página.`}
        </Alert>
      )}
    </PageBase>
  );
}
