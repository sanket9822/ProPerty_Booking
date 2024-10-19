import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAPIResponse, Iproperty, Site } from '../../modal/master';
import { MasterService } from '../../service/master.service';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [AsyncPipe,FormsModule,ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  sites$:Observable<Site[]>=new Observable<Site[]>;
  masterServe=inject(MasterService)
  siteId:number=0;
  propertyList:Iproperty[]=[];
  BookingList:any[]=[];
  bookingForm:FormGroup=new FormGroup({})
  currentPropertyId:number=0;
  constructor(){
    this.initializingform()
    this.sites$=this.masterServe.getAllSiteData().pipe(
      map((res:IAPIResponse)=>{
        return res.data
      })
    )
  }

  initializingform(){
    this.bookingForm= new FormGroup({
      bookingId:new FormControl(0),
      propertyId:new FormControl(this.currentPropertyId),
      bookindDate:new FormControl(''),
      bookingRate:new FormControl(0),
      totalAmont:new FormControl(0),
      custId:new FormControl(0),
      name:new FormControl(''),
      mobile:new FormControl(''),
      emailid:new FormControl(''),
      address:new FormControl(''),
    })
  }
  
  checkIfPropertyAvailable(propertyId: number) {
    const record=   this.BookingList.find(m=>m.propertyId == propertyId);
    if(record != undefined) {
      return record;
    } else {
      return null;
    }
  }

  getProperties(event:Event){
   this.masterServe.getAllPropertyBySiteId1(this.siteId).subscribe((res:IAPIResponse)=>{
    this.propertyList=res.data
   })
  }

  getBookingBySiteId(){
    this.masterServe.getAllPropertyBookingBySiteId(this.siteId).subscribe((res:IAPIResponse)=>{
     this.BookingList=res.data
    })
   }

  openModal(data: Iproperty) {
     this.currentPropertyId=data.propertyId;
     this.initializingform()
     const modal=document.getElementById('modal')
    if (modal) {
      modal.style.display = 'block'
    }
  }

  closeModal() {
    const modal=document.getElementById('modal')
    if (modal) {
      modal.style.display = 'none'
    }
  }

  doBoking(){
    this.masterServe.saveBooking(this.bookingForm.value).subscribe((res:IAPIResponse)=>{
      if(res.result){
        
        alert('Record Saved');
        this.getBookingBySiteId()
        
      }else{
        alert(res.message)
      }
    })
  }

  

}
