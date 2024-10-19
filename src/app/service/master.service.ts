import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IAPIResponse, Site } from '../modal/master';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) {

  }

  getAllPropertyType(): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(environment.API_URL + 'GetAllPropertyType')
  }

  saveAllPropertyType(obj:IAPIResponse): Observable<IAPIResponse> {
    const obje=[obj]
    return this.http.post<IAPIResponse>(environment.API_URL + 'AddPropertyType',obje)
  }

  updatePropertyType(obj:IAPIResponse): Observable<IAPIResponse> {
    
    return this.http.put<IAPIResponse>(environment.API_URL + 'UpdatePropertyType',obj)
  }

  deletePropertyType(id:number): Observable<IAPIResponse> {
    
    return this.http.delete<IAPIResponse>(environment.API_URL + 'DeletePropertyTypeById?id='+id)
  }

  getAllSiteData(): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(environment.API_URL + 'GetAllSites')
  }

  saveSiteData(obj:Site): Observable<IAPIResponse> {
   
    return this.http.post<IAPIResponse>(environment.API_URL + 'AddSites',obj)
  }


  updateSiteData(obj:Site): Observable<IAPIResponse> {
    
    return this.http.put<IAPIResponse>(environment.API_URL + 'UpdateSites',obj)
  }

  deleteSiteData(id:number): Observable<IAPIResponse> {
    
    return this.http.delete<IAPIResponse>(environment.API_URL + 'DeleteSitesById?id='+id)
  }

  saveProperty(obj:Site): Observable<IAPIResponse> {
   
    return this.http.post<IAPIResponse>(environment.API_URL + 'AddPropertyMasters',obj)
  }

  getAllPropertyBySiteId(): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(environment.API_URL + 'GetAllPropertyBySiteId')
  }


  getAllPropertyBySiteId1(siteid:number): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(environment.API_URL + 'GetAllPropertyBySiteId?siteid='+siteid)
  }

  saveBooking(obj:Site): Observable<IAPIResponse> {
   
    return this.http.post<IAPIResponse>(environment.API_URL + 'AddPropertyBooking',obj)
  }

  getAllPropertyBookingBySiteId(siteid: number):Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(environment.API_URL + 'GetAllPropertyBookingBySiteId?siteid='+siteid)
  }
}
