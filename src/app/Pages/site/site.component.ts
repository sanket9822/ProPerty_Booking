import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAPIResponse, Iproperty, IpropertyType, Site } from '../../modal/master';
import { MasterService } from '../../service/master.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [FormsModule, AsyncPipe, CommonModule,ReactiveFormsModule],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent implements OnInit {
  @ViewChild('propertyModel') modal: ElementRef | undefined;

  masterser = inject(MasterService)
  isformView = signal<boolean>(false)
  formobj: Site = new Site()
  gridta: Site[] = [];
  propertyList:Iproperty[]=[]
  currentSiteId: number = 0;
  propertyForm: FormGroup = new FormGroup({});
  propertypedata$: Observable<IpropertyType[]> = new Observable<IpropertyType[]>;
  justToggle() {
    this.isformView.set(!this.isformView())
  }
  constructor() {
    this.propertypedata$ = this.masterser.getAllPropertyType().pipe(
      map((item: IAPIResponse) => {
        return item.data
      })
    );
    this.initializingForm();
  }
  ngOnInit(): void {
    this.getSite()
  }

  getSite() {
    this.masterser.getAllSiteData().subscribe((res: IAPIResponse) => {
      this.gridta = res.data
    })
  }

  geAllPropertytSite() {
    this.masterser.getAllPropertyBySiteId().subscribe((res: IAPIResponse) => {
      this.gridta = res.data.filter((m:any)=>m.siteId==this.currentSiteId)
    })
  }

  initializingForm() {
    this.propertyForm = new FormGroup({
      propertyId: new FormControl(0),
      propertyNo: new FormControl(''),
      facing: new FormControl(''),
      totalArea: new FormControl(''),
      rate: new FormControl(''),
      siteId: new FormControl(this.currentSiteId)
    })
  }

  onSaveproperty(){
    this.masterser.saveProperty(this.propertyForm.value).subscribe((res: IAPIResponse) => {
      if (res.result) {
        alert('Record Save');
        this.geAllPropertytSite()
        
       
      } else {
        alert(res.message)
      }
    })
  }

  onSave() {
    this.masterser.saveSiteData(this.formobj).subscribe((res: IAPIResponse) => {
      if (res.result) {
        alert('Data Is Created');
        this.getSite();
        
        
      } else {
        alert(res.message)
      }
    })
  }

  onEdit(data: Site) {
    this.formobj = data;
    this.justToggle()
  }

  onUpdate() {
    this.masterser.updateSiteData(this.formobj).subscribe((res: IAPIResponse) => {
      if (res.result) {
        alert('Record Updated')
        this.getSite();
        this.justToggle();

      } else {
        alert(res.message)
      }
    })
  }

  ondelete(data: Site) {
    const isDelete = confirm('Are You Want To Delete');
    if (isDelete) {
      this.masterser.deleteSiteData(data.siteId).subscribe((res: IAPIResponse) => {
        if (res.result) {
          alert('Data Is Deleted');
          this.getSite();

        } else {
          alert(res.message)
        }
      })
    }

  }

  openModal(data: Site) {
    
    this.currentSiteId = data.siteId;
    this.initializingForm()
    this.geAllPropertytSite()
    if (this.modal) {
      this.modal.nativeElement.style.display = 'block'
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.nativeElement.style.display = 'none'
    }
  }


}
