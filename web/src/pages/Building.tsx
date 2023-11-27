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
import PlaceIcon from '@mui/icons-material/Place';
import AmenitiesList from '@/components/buildings/amenitiesList';
import AmenitiesModal from '@/components/buildings/amenitiesModal';
import HomeIcon from '@mui/icons-material/Home';
import UnitsList from '@/components/buildings/unitsList';
import UnitsModal from '@/components/buildings/unitsModal';

export default function BuildingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [reload, setReload] = useState(false);
  const [buildingTags, setBuildingTags] = useState<{ value: number; label: string; data?: Partial<Building> }[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Partial<Building>>({});
  const [lastBuilding, setLastBuilding] = useState<Partial<Building>>({});
  const [openAM, setOpenAM] = useState(false);
  const [openUM, setOpenUM] = useState(false);

  useEffect(() => {
    GetBuildingsRequest().then(({ data }) =>
      setBuildingTags(data.map((b: Building) => ({ value: b.id, label: b.address, data: b })))
    );
  }, []);

  const handleBuildingChange = (e: number) => {
    setSelectedBuilding(buildingTags.find((b) => b.value === e)?.data ?? { id: e });
  };

  const handleSubmit = async (f: FormObj<any>) => {
    setIsLoading(true);
    setError(null);

    const id = (f.buildingId as any)[1]?.value;
    const form: Prisma.BuildingCreateInput & Prisma.BuildingUpdateInput = {
      address: f.address.value,
    };

    setLastBuilding({ id, ...form });

    (id != 0 ? PatchBuildingRequest(id, form) : PostBuildingRequest(form))
      .catch(setError)
      .finally(() => (setIsLoading(false), setReload(true)));
  };

  return (
    <PageBase title="Edificio">
      <Typography startDecorator={<ApartmentIcon />} level="h3">
        Crear o editar edificio
      </Typography>
      <Divider sx={{ marginBlock: 2 }} />

      {/* CREAR/EDITAR EDIFICIO FORM */}
      <form onSubmit={(e) => OnFormSubmission<any>(e, handleSubmit)}>
        <Stack spacing={1}>
          <FormInput
            disabled={reload}
            name="buildingId"
            required
            label="Seleccione edificio"
            onChange={handleBuildingChange}
            selectValues={[{ value: 0, label: '+ Nuevo', default: true }, ...buildingTags]}
          />
          <FormInput disabled={reload} name="address" required label="Dirección" />

          <Button loading={isLoading} type="submit">
            Crear / editar edificio
          </Button>
        </Stack>
      </form>
      <Divider sx={{ marginBlock: '1rem !important' }} />

      {/* CREAR/BORRAR AMENITIES FORM */}
      <Stack spacing={1}>
        <Typography startDecorator={<PlaceIcon />} level="h4">
          Comodidades
        </Typography>
        <AmenitiesList actions list={[selectedBuilding as any]} />
        <Button disabled={!selectedBuilding.id} loading={isLoading} onClick={() => setOpenAM(true)}>
          Crear nueva comodidad
        </Button>
      </Stack>
      <Divider sx={{ marginBlock: '1rem !important' }} />

      {/* CREAR/BORRAR UNITS FORM */}
      <Stack spacing={1}>
        <Typography startDecorator={<HomeIcon />} level="h4">
          Unidades
        </Typography>
        <UnitsList actions list={[selectedBuilding as any]} />
        <Button disabled={!selectedBuilding.id} loading={isLoading} onClick={() => setOpenUM(true)}>
          Crear nueva unidad
        </Button>
      </Stack>
      <Divider sx={{ marginBlock: '1rem !important' }} />

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
      <AmenitiesModal building={selectedBuilding} open={openAM} setOpen={setOpenAM} />
      <UnitsModal building={selectedBuilding} open={openUM} setOpen={setOpenUM} />
    </PageBase>
  );
}
