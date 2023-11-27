import PageBase from '@/components/layouts/PageBase';
import { Divider, Typography } from '@mui/joy';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ClaimsList from '@/components/claims/claimsList';
import { GetAllClaimsRequest } from '@/requests/claims.requests';
import { useEffect, useState } from 'react';
import { Claim } from '@tpoai/data-commons';
import { removeAuth } from '@/utils/auth';

export default function ReviewPage() {
  const [, setIsLoading] = useState(false);
  // const [, setError] = useState<AxiosError | null>(null);
  const [claims, setClaims] = useState<Partial<Claim>[]>([]);

  useEffect(() => {
    setIsLoading(true);

    GetAllClaimsRequest()
      .then(({ data }) => setClaims(data))
      .catch(() => removeAuth());

    setIsLoading(false);
  }, []);

  return (
    <PageBase title="Administrar reclamos">
      <Typography startDecorator={<AddTaskIcon />} level="h3">
        Administrar reclamos
      </Typography>
      <Divider sx={{ marginBlock: 2 }} />
      <ClaimsList actions list={claims}></ClaimsList>
    </PageBase>
  );
}
