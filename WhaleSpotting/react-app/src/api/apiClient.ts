﻿import { SightingApiModel } from "./models/SightingApiModel";
import authService from "../components/api-authorization/AuthorizeService";
import { CreateSightingApiModel } from "./models/CreateSightingApiModel";
import { SearchSightingRequestModel } from "./models/SearchSightingRequestModel";
import { UserApiModel } from "./models/UserApiModel";
import { Species } from "./ApiEnums";

export async function fetchAllSightings(): Promise<SightingApiModel[]> {
    return await fetch("api/sightings", await getGetSettings())
        .then(r => r.json());
}

export async function fetchPendingSightings(pageNumber: number): Promise<SightingApiModel[]> {
    return await fetch(`api/sightings/pending?pageNumber=${pageNumber}&pageSize=10`, await getGetSettings())
        .then(r => r.json());
}

export async function makeAdmin(): Promise<void> {
    await fetch("api/User/MakeAdmin", await getGetSettings());
}

export async function checkAdmin(): Promise<boolean> {
    const response = await fetch("api/User/CheckAdmin", await getGetSettings());

    const regexMatch = /(AccessDenied)/;
    return !response.url.match(regexMatch);
}

export async function removeAdmin(): Promise<void> {
    await fetch("api/User/RemoveAdmin", await getGetSettings());
}

export async function createSighting(sighting: CreateSightingApiModel): Promise<Response> {
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

export async function fetchCurrentUser(): Promise<UserApiModel> {
    return await fetch("api/user/GetCurrentUser", await getGetSettings())
        .then(r => r.json());
}

export async function getConfirmedSightings(search: SearchSightingRequestModel, pageNumber = 1, pageSize = 10): Promise<SightingApiModel[]> {
    return await fetch(`api/sightings/search?
        ${search.species ? "species=" + search.species : ""}
        ${search.longitude ? "&longitude=" + search.longitude : ""}
        ${search.latitude ? "&latitude=" + search.latitude : ""}
        ${search.location ? "&location=" + search.location : ""}
        ${search.sightedFrom ? "&sightedFrom=" + search.sightedFrom : ""}
        ${search.sightedTo ? "&sightedTo=" + search.sightedTo : ""}
        ${search.orcaType ? "&orcaType=" + search.orcaType : ""}
        ${search.orcaPod ? "&orcaPod=" + search.orcaPod : ""}
        ${search.confirmed ? "&confirmed=" + search.confirmed : ""}
        ${pageNumber ? "&pageNumber=" + pageNumber : ""}
        ${pageSize ? "&pageSize=" + pageSize : ""}`,
    await getGetSettings())
        .then(r => r.json());
}

export async function fetchCurrentUserSightings(pageNumber: number): Promise<SightingApiModel[]> {
    return await fetch(`api/sightings/current?pageNumber=${pageNumber}&pageSize=10`, await getGetSettings())
        .then(r => r.json());
}

export async function fetchSpecies(lon: number, lat: number): Promise<Species[]> {
    return await fetch(`api/sightings/LocalSpecies?longitude=${lon}&latitude=${lat}`)
        .then(response => response.json());
}

async function getPostSettings(apiModel: CreateSightingApiModel): Promise<RequestInit> {
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

async function getGetSettings(): Promise<RequestInit> {
    const token = await authService.getAccessToken();
    return {
        headers: !token ? {} : { "Authorization": `Bearer ${token}` }
    };
}

async function getPutSettings(): Promise<RequestInit> {
    const token = await authService.getAccessToken();
    return {
        method: "PUT",
        headers: !token ? {} : { "Authorization": `Bearer ${token}` }
    };
}

async function getDeleteSettings(): Promise<RequestInit> {
    const token = await authService.getAccessToken();
    return {
        method: "DELETE",
        headers: !token ? {} : { "Authorization": `Bearer ${token}` }
    };
}
