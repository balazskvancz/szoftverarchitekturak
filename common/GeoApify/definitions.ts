export const API_KEY = '707ece04b78a42b18cc5b88b4c40c9b9'

export const SEARCH_URL = 'https://api.geoapify.com/v1/geocode/search'

export interface IAddressDetails {
  readonly housenumber: string
  readonly street: string
  readonly postcode: string
  readonly city: string
  readonly country: string

}

export interface IGetRequest extends IAddressDetails {
  readonly apiKey: string
}

// A válasz objectben kapjuk meg a geolokációs adatokat.
// Ennél van jóval több minden is, de csak erre van szükségünk.

export interface IProperty {
  readonly lon: number
  readonly lat: number
}

export interface IFeature {
  readonly properties: IProperty
}

export interface IGetResponse {
  readonly features: readonly IFeature[]
}
