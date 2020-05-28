import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, merge } from "rxjs";
import { map } from "rxjs/operators";
import { Agent, Candidate } from "@shared/models/Agent.model";
import { ActivatedRoute, Router } from "@angular/router";
import { SponsorService } from "../sponsor/sponsor.service";
import { Role } from "@shared/models/role.model";

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
    debugger;
    this.candidates$ = this.sponsorService.getCandidates(this.page, this.limit);
    debugger;
    this.candidates$.subscribe((candidate) => {
      this.candidates = candidate;
      this.paginatedDataSource = this.candidates;
      console.log("cc", this.candidates);
    });
  }

  Onpage() {
    this.page = this.page + 1;

    this.candidates$ = this.sponsorService.getCandidates(this.page, this.limit);
    debugger;
    this.candidates$.subscribe((candidate) => {
      this.candidates = candidate;
      console.log("cc", this.candidates);
      this.paginatedDataSource = this.candidates;
    });
  }

  Accept(id: number) {
 
    this.sponsorService.valide(id).subscribe((user) => {
        user = user;
      });
      this.candidates$ = this.sponsorService.getCandidates(this.page, this.limit);
      debugger;
      this.candidates$.subscribe((candidate) => {
        this.candidates = candidate;
        this.paginatedDataSource = this.candidates;
        console.log("cc", this.candidates);
      });
    
  }
  Reffus(id: number) {
   
      this.sponsorService.reffus(id).subscribe((user) => {
        user = user;
      });
      this.candidates$ = this.sponsorService.getCandidates(this.page, this.limit);
      debugger;
      this.candidates$.subscribe((candidate) => {
        this.candidates = candidate;
        this.paginatedDataSource = this.candidates;
        console.log("cc", this.candidates);
      });
   
  }

  details(id: number) {
    this.router.navigate(["./", id, "details"], { relativeTo: this.route });
  }
}
