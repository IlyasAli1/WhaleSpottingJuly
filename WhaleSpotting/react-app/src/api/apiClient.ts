﻿import { SightingApiModel } from "./models/SightingApiModel";
import authService from "../components/api-authorization/AuthorizeService";

export async function fetchPendingSightings(pageNumber: number): Promise<SightingApiModel[]> {
    const headers = await getHeaders();
    return await fetch(`api/sightings/pending?page=${pageNumber}&pageSize=10`, {
        headers: headers }
    )
        .then(r => r.json());
}

export async function makeAdmin() {
    const headers = await getHeaders();
    const response = await fetch("api/User/MakeAdmin", {
        headers: headers
    });
}

export async function checkAdmin() {
    const headers = await getHeaders();
    const response = await fetch("api/User/CheckAdmin", {
        headers: headers
    });

    const regexMatch = /(AccessDenied)/;
    return !response.url.match(regexMatch);
}

export async function removeAdmin() {
    const headers = await getHeaders();
    const response = await fetch("api/User/RemoveAdmin", {
        headers: headers
    });
}

async function getHeaders(): Promise<any> {
    const token = await authService.getAccessToken();
    return !token ? {} : {"Authorization": `Bearer ${token}`};
}