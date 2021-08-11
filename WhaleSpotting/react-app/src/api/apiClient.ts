﻿import { SightingApiModel } from "./models/SightingApiModel";
import authService from "../components/api-authorization/AuthorizeService";
import { CreateSightingApiModel } from "./models/CreateSightingApiModel";

export async function fetchAllSightings(): Promise<SightingApiModel[]> {
    return await fetch("api/sightings", await getGetSettings())
        .then(r => r.json());
}

export async function fetchPendingSightings(pageNumber: number): Promise<SightingApiModel[]> {
    return await fetch(`api/sightings/pending?page=${pageNumber}&pageSize=10`, await getGetSettings())
        .then(r => r.json());
}

export async function makeAdmin() {
    await fetch("api/User/MakeAdmin", await getGetSettings());
}

export async function checkAdmin() {
    const response = await fetch("api/User/CheckAdmin", await getGetSettings());

    const regexMatch = /(AccessDenied)/;
    return !response.url.match(regexMatch);
}

export async function removeAdmin() {
    await fetch("api/User/RemoveAdmin", await getGetSettings());
}

export async function createSighting(sighting: CreateSightingApiModel): Promise<any> {
    return await fetch("api/sightings/create", await getPostSettings(sighting));
}

export async function confirmSighting(id: number): Promise<SightingApiModel> {
    return await fetch(`api/sightings/${id}/confirm`, await getPutSettings())
        .then(r => r.json());
}

export async function deleteSighting(id: number): Promise<SightingApiModel> {
    return await fetch(`api/sightings/${id}/reject`, await getDeleteSettings())
        .then(r => r.json());
}

async function getPostSettings(apiModel: any): Promise<any> {
    const token = await authService.getAccessToken();
    return {
        method: "POST",
        headers: !token ? {}
            : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        body: JSON.stringify(apiModel),
    };
}

async function getGetSettings(): Promise<any> {
    const token = await authService.getAccessToken();
    return {
        headers: !token ? {} : { "Authorization": `Bearer ${token}` }
    };
}

async function getPutSettings(): Promise<any> {
    const token = await authService.getAccessToken();
    return {
        method: "PUT",
        headers: !token ? {} : { "Authorization": `Bearer ${token}` }
    };
}

async function getDeleteSettings(): Promise<any> {
    const token = await authService.getAccessToken();
    return {
        method: "DELETE",
        headers: !token ? {} : { "Authorization": `Bearer ${token}` }
    };
}