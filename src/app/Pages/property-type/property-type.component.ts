 import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { IAPIResponse, IpropertyType } from '../../modal/master';

@Component({
  selector: 'app-property-type',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './property-type.component.html',
  styleUrl: './property-type.component.css'
})
export class PropertyTypeComponent implements OnInit{

form:FormGroup=new FormGroup({})
MasterSer=inject(MasterService)
gridata:IpropertyType[]=[]
constructor(){
  this.initilizingForm()
}
  ngOnInit(): void {
    this.getGridData()
  }

  getGridData(){
   this.MasterSer.getAllPropertyType().subscribe((res:IAPIResponse)=>{
     this.gridata=res.data
   })
  }

  onsavedata(){
     this.MasterSer.saveAllPropertyType(this.form.value).subscribe((res:IAPIResponse)=>{
      if(res.result){
        alert('Record Save')
        this.getGridData();
      }else{
        alert(res.message)
      }
     })
  }

  onupdate(){
    this.MasterSer.updatePropertyType(this.form.value).subscribe((res:IAPIResponse)=>{
     if(res.result){
       alert('Update Record')
       this.getGridData();
     }else{
       alert(res.message)
     }
    })
 }

 ondelete(id:number){
  const isdelete=confirm('Are You Sure Want To Delete')
  if(isdelete){
    this.MasterSer.deletePropertyType(id).subscribe((res:IAPIResponse)=>{
      if(res.result){
        alert('Record Deleted')
        this.getGridData();
      }else{
        alert(res.message)
      }
     })
  }
 }

initilizingForm(item?:IpropertyType){
  this.form=new FormGroup({
    propertTypeId:new FormControl<number>(item ? item.propertTypeId:0),
    propertyType:new FormControl<string>(item ? item.propertyType:'',[Validators.required,Validators.minLength(5)])
  })
}

onEdit(item:IpropertyType){
  this.initilizingForm(item);
}

}
