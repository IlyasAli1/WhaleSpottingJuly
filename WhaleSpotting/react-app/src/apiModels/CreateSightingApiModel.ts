export enum Species {
    AtlanticWhiteSidedDolphin = 1,
    CaliforniaSeaLion,
    DallsPorpoise,
    GrayWhale,
    HarborPorpoise,
    HarborSeal,
    Humpback,
    Minke,
    NorthernElephantSeal,
    Orca,
    Other,
    PacificWhiteSidedDolphin,
    SeaOtter,
    SouthernElephantSeal,
    StellerSeaLion,
    Unknown,
}

export enum OrcaType {
    NorthernResident = 1,
    Offshore,
    SouthernResident,
    Transient,
}

export interface CreateSightingApiModel {
    species: Species;
    quantity: number;
    description: string;
    longitude: number;
    latitude: number;
    location: string;
    sightedAt: Date;
    orcaType: OrcaType | null;
    orcaPod: string;
    userId: number;
}
