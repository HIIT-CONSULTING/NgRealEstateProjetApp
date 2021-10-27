import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Candidate } from "@shared/models/Agent.model";
import { ActivatedRoute, Router } from "@angular/router";
import { SponsorService } from "@shared/services/sponsor.service";

@Component({
  selector: "app-sponsor-admin",
  templateUrl: "./sponsor-admin.component.html",
  styleUrls: ["./sponsor-admin.component.scss"],
})
export class SponsorAdminComponent implements OnInit {
  candidates$: Observable<Candidate[]>;
  candidat: Candidate;
  page = 1;
  limit = 5;
  paginatedDataSource: any;
  candidates: Candidate[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sponsorService: SponsorService
  ) {}

  displayedColumns = [
    "Date De Création",
    "Prénom Parrain",
    "Nom Parrain",
    "Prénom Candidat",
    "Nom Candidat",
    "Status",
    "Menu",
  ];

  ngOnInit(): void {
    this.candidates$ = this.sponsorService.getCandidates(this.page, this.limit);
    this.candidates$.subscribe((candidate) => {
      this.candidates = candidate;
      this.paginatedDataSource = this.candidates;
    });
  }

  onPage() {
    this.page = this.page + 1;
    this.candidates$ = this.sponsorService.getCandidates(this.page, this.limit);
    this.candidates$.subscribe((candidate) => {
      this.candidates = candidate;
      this.paginatedDataSource = this.candidates;
    });
  }

  accept(id: number) {
    debugger 
    this.sponsorService.valide(id).subscribe((user) => {
        user = user;
        this.candidates$ = this.sponsorService.getCandidates(this.page, this.limit);
        this.candidates$.subscribe((candidate) => {
          this.candidates = candidate;
          this.paginatedDataSource = this.candidates;
        });
      }); 

  }
  
  refus(id: number) {
    debugger
      this.sponsorService.refus(id).subscribe((user) => {
        user = user;
        this.candidates$ = this.sponsorService.getCandidates(this.page, this.limit);
       

        this.candidates$.subscribe((candidate) => {
          debugger
          this.candidates = candidate;
          this.paginatedDataSource = this.candidates;
        });
      });

   
  }

  details(id: number) {
    this.router.navigate(["./", id, "details"], { relativeTo: this.route });
  }
  
}
