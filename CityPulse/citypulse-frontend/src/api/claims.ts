// 📌 Файл: src/api/claims.ts

import api from "../services/api.ts";


export interface Claim {
  id: number;
  title: string;
  description: string;
  address?: string;
  lat: number;
  lng: number;
  status: string;
}

export async function getClaims(): Promise<Claim[]> {
  const response = await api.get("/api/claims");
  return response.data;
}

export interface CreateClaimDto {
  title: string;
  description: string;
  address?: string;
  lat: number;
  lng: number;
}

export async function createClaim(dto: CreateClaimDto) {
  const response = await api.post("/api/claims", dto);
  return response.data;
}
