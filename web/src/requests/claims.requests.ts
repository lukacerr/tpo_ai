import { Prisma } from '@tpoai/data-commons';
import axios from 'axios';

export async function GetAllClaimsRequest() {
  return axios.get('claims/all');
}

export async function GetClaimsRequest() {
  return axios.get('claims');
}

export async function DeleteClaimRequest(id: number) {
  return axios.delete(`claims/${id}`);
}

export async function PatchClaimRequest(id: number, data: Prisma.ClaimUpdateInput) {
  return axios.patch(`claims/${id}`, data);
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
