import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Project } from '@shared/models/Agent.model';
import { LoginService } from '@shared/services/login.service';
import { NotaryService } from '@shared/services/notary.service';
import { ProjectService } from '@shared/services/project.service';
import { TransactionService } from '@shared/services/transaction.service';
import { DialogContentProjectComponent } from 'app/components/dialog-content-project/dialog-content-project.component';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {

  projectAchat: Project;
  projectVente: Project;
  projectsAchat: Project[];
  projectsVente: Project[];
  tablProject = [];
  notarys: any;
  notary: any;
  showSpinner=true;
  typeTransaction:string[];
  listTypologie: string[];
  unsubscribe$: Subject<void>;
  form :FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private transactionService: TransactionService,
    private notaryService: NotaryService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private projectService: ProjectService,
    private loginService: LoginService
  ) {
    this.typeTransaction=['achat','vente'];
    this.listTypologie= ['....'];
    this.unsubscribe$ = new Subject();
    this.form = this.fb.group({
    type : [null ],//"achat||vente",
    typologie: [null ],
    price : [null ],
    feesPaidBy : [null ],
    quote : [null ],
    companyBaseFees:[null ],
    companyFullFees:[null ],
    compromiseDate: [null ],
    provisionalActDate: [null ],
    officialActDate: [null ],
    projects: [null ],//["/api/v2/projects/3","/api/v2/projects/4"],
    notary: [null ],//"/api/v2/notaries/53"
  });
}

  ngOnInit(): void { 

    let idUser= this.loginService.getCurentUser().id;
   this.transactionService.getProjects('vente').pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
    this.projectsVente = res['hydra:member'];
   });
   this.transactionService.getProjects(`achat&agent.id=${idUser}`).pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
     this.projectsAchat = res['hydra:member'];
   });
   this.notaryService.getAllNotary().pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
    this.notarys = res['hydra:member'];
   });
   
   /*this.projectService.getProject(this.id).pipe(takeUntil(this.unsubscribe$)).subscribe((project) => {
     this.project = project;
     if(project!={})
     {
       this.showSpinner=false;
     }
    });*/
    
      
  }
  openDialog() {
    this.dialog
      .open(DialogContentProjectComponent, {
        width: "600px",
        disableClose: true,
        data: {
          title:this.translate.instant('Transaction.title-dialog'),
          type:'notary'
        }
      })
      .afterClosed()
      .subscribe(() => {
        this.notaryService.getAllNotary().pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
          this.notarys = res['hydra:member'];
        });
      });
}
  OnClick(){}
  change(event,type:number)
  {
    if(event.isUserInput) {
      console.log(event.source.value, event.source.selected);
      if(type ==1){
        this.tablProject[0]=`/api/v2/projects/${event.source.value}`;
        this.projectService.getProject(event.source.value).subscribe((project) => {
          this.projectAchat = project;
          if(project!={})
            this.showSpinner=false;
        })
      }else if(type==2){
        this.tablProject[1]=`/api/v2/projects/${event.source.value}`;
        this.projectService.getProject(event.source.value).subscribe((project) => {
          this.projectVente = project;
          if(project!={})
            this.showSpinner=false;
        })
      }
    }
  }
  selectNotary(event)
  {//event.source.value
    if(event.isUserInput) {
        this.notary = event.source.value;
        this.form.get('notary').setValue(event.source.value['@id']);
      }
  }
  details(id:number) {
    this.router.navigate(['/project',id,'details']);   
  }
  onSubmit() {
   this.form.get('projects').setValue(this.tablProject);
   
    this.transactionService.save(this.form.value).pipe(takeUntil(this.unsubscribe$)).subscribe(response=>{
      this.snackBar.open('transaction est ajouté avec succès!', '', { duration: 1000 ,panelClass: ['blue-snackbar'] ,  verticalPosition: 'top', horizontalPosition:'end' });
      setTimeout(()=>{  
        this.router.navigate(['/transaction/transactionlist'])
      }, 2000); },
    (error) => {
      this.snackBar.open("veuillez vérifier vos informations!", '', { duration: 1000, panelClass: ['red-snackbar'], verticalPosition: 'top', horizontalPosition:'end'});
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
