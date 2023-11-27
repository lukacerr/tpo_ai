/* eslint-disable @typescript-eslint/no-explicit-any */
import PageBase from '@/components/layouts/PageBase';
import { Divider, Typography } from '@mui/joy';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Building, Claim } from '@tpoai/data-commons';
import { GetBuildingsRequest } from '@/requests/buildings.requests';
import { GetClaimsRequest } from '@/requests/claims.requests';
import HomeIcon from '@mui/icons-material/Home';
import UnitsList from '@/components/buildings/unitsList';
import AmenitiesList from '@/components/buildings/amenitiesList';
import PlaceIcon from '@mui/icons-material/Place';
import { getCurrentUser } from '@/utils/auth';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ClaimsList from '@/components/claims/claimsList';

export default function PanelPage() {
  const [, setIsLoading] = useState(false);
  const [, setError] = useState<AxiosError | null>(null);
  const [claims, setClaims] = useState<Partial<Claim>[]>([]);
  const [buildings, setBuildings] = useState<Partial<Building>[]>([]);
  const { isAdmin } = getCurrentUser();

  useEffect(() => {
    setIsLoading(true);

    GetBuildingsRequest()
      .then(({ data }) => setBuildings(data))
      .catch(setError);

    GetClaimsRequest()
      .then(({ data }) => setClaims(data))
      .catch(setError);

    setIsLoading(false);
  }, []);

  return (
    <PageBase title="Panel">
      {isAdmin ? (
        <>
          <Typography startDecorator={<AdminPanelSettingsIcon />} level="h3">
            Modo administrador
          </Typography>
          <Divider sx={{ marginBlock: 2 }} />
          <Typography>Ingrese como usuario para tener panel y generación de reclamos.</Typography>
        </>
      ) : (
        <>
          <Typography startDecorator={<AssignmentRoundedIcon />} level="h3">
            Tus reclamos
          </Typography>
          <Divider sx={{ marginBlock: 2 }} />
          <ClaimsList list={claims} />

          <Typography startDecorator={<ApartmentIcon />} marginTop={4} level="h3">
            Tus propiedades/comodidades
          </Typography>
          <Divider sx={{ marginBlock: 2 }} />
          <Typography marginBlock={1} startDecorator={<HomeIcon />} level="title-lg">
            Unidades
          </Typography>
          <UnitsList forceBuilding list={buildings as any[]} />
          <Divider sx={{ marginBlock: 2 }} />
          <Typography marginBlock={1} startDecorator={<PlaceIcon />} level="title-lg">
            Comodidades
          </Typography>
          <AmenitiesList forceBuilding list={buildings as any[]} />
        </>
      )}
    </PageBase>
  );
}
