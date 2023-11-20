import { Prisma } from '@tpoai/data-commons';
import axios from 'axios';

export async function PostBuildingRequest(data: Prisma.BuildingCreateInput) {
  return axios.post('buildings', data);
}

export async function GetBuildingsRequest() {
  return axios.get('buildings');
}

export async function GetBuildingRequest(id: number) {
  return axios.get(`buildings/${id}`);
}

export async function PatchBuildingRequest(id: number, data: Prisma.BuildingUpdateInput) {
  return axios.patch(`buildings/${id}`, data);
}

export async function DeleteBuildingRequest(id: number) {
  return axios.delete(`buildings/${id}`);
}
