import { Prisma } from '@tpoai/data-commons';
import axios from 'axios';

export async function GetClaimsRequest() {
  return axios.get('claims');
}

export async function PostClaimRequest(data: Prisma.ClaimUncheckedCreateInput, files: FileList | []) {
  const fd = new FormData();
  fd.append('userId', `${data.userId}`);
  fd.append('description', data.description);
  fd.append('unitId', `${data.unitId}`);
  fd.append('amenityId', `${data.amenityId}`);
  fd.append('claimStatus', 'OPEN');
  for (let i = 0; i < files.length; i++) fd.append('files', files[i]);
  return axios.post('claims', fd);
}
