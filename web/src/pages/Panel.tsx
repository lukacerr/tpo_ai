import PageBase from '@/components/layouts/PageBase';
import { Divider, Typography } from '@mui/joy';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Building, Claim } from '@tpoai/data-commons';
import { GetBuildingsRequest } from '@/requests/buildings.requests';
import { GetClaimsRequest } from '@/requests/claims.requests';

export default function PanelPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [claims, setClaims] = useState<Partial<Claim>[]>([]);
  const [buildings, setBuildings] = useState<Partial<Building>[]>([]);

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
      <Typography startDecorator={<AssignmentRoundedIcon />} level="h3">
        Tus reclamos
      </Typography>
      <Divider sx={{ marginBlock: 2 }} />
      <code>{JSON.stringify(claims, null, 4)}</code>

      <Typography startDecorator={<ApartmentIcon />} marginTop={4} level="h3">
        Tus propiedades/comodidades
      </Typography>
      <Divider sx={{ marginBlock: 2 }} />
      <code>{JSON.stringify(buildings, null, 4)}</code>
    </PageBase>
  );
}
