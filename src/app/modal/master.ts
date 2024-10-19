export interface IpropertyType {
    data: any
    propertTypeId: number,
    propertyType: string
}

export interface IAPIResponse {
    result: number,
    message: string,
    data: any
}


export class Site {
    siteId: number
    siteTitle: string
    location: string
    propertyTypeId: string
    city: string
    pincode: string
    state: string
    totalProperties: string
    createdDate: Date
    lastUpdatedDate: Date

    constructor() {
        this.siteId = 0;
        this.siteTitle = '';
        this.location = '';
        this.propertyTypeId = '';
        this.city = '';
        this.pincode = '';
        this.state = '';
        this.totalProperties = '';
        this.createdDate = new Date();
        this.lastUpdatedDate = new Date()
    }
}

export interface Iproperty {
    propertyId: number
    propertyNo: number
    facing: string
    totalArea: string
    rate: number
    siteId: number
  }