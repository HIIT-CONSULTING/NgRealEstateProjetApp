import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Candidate } from "@shared/models/Agent.model";
import { ActivatedRoute, Router } from "@angular/router";
import { SponsorService } from "@shared/services/sponsor.service";

@Component({
  selector: "app-sponsor-agent-list",
  templateUrl: "./sponsor-agent-list.component.html",
  styleUrls: ["./sponsor-agent-list.component.scss"],
})
export class SponsorAgentListComponent implements OnInit {
  constructor(
    private router: Router,
    private sponsorService: SponsorService,
    private snackBar: MatSnackBar
  ) {}

  page = 1;
  limit = 5;
  paginatedDataSource: any;
  @ViewChild(MatPaginator, { static: true }) pager: MatPaginator;
  candidates$: Observable<Candidate[]>;
  candidates: Candidate[];

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

  Onpage() {
    this.page = this.page + 1;
    this.candidates$ = this.sponsorService.getCandidates(this.page, this.limit);
    this.candidates$.subscribe((candidate) => {
      this.candidates = candidate;
      this.paginatedDataSource = this.candidates;
    });
  }

  Update(id: number) {
    this.router.navigate(["/sponsorship", id, "update"]);
  }

  Delete(id: number) {
    this.sponsorService.deleteCandidate(id).subscribe(
      (data) => {
        this.snackBar.open("le candidat est supprimé avec succès!", "", {
          duration: 1000,
          panelClass: ["blue-snackbar"],
          verticalPosition: "top",
          horizontalPosition: "end",
        });
        this.candidates$ = this.sponsorService.getCandidates(
          this.page,
          this.limit
        );
        this.candidates$.subscribe((candidate) => {
          this.candidates = candidate;
          this.paginatedDataSource = this.candidates;
        });
      },
      (error) => {
        this.snackBar.open("veuillez vérifier vos informations!", "", {
          duration: 1000,
          panelClass: ["blue-snackbar"],
          verticalPosition: "top",
          horizontalPosition: "end",
        });
      }
    );
  }

  onClick() {
    this.router.navigate(["/sponsorship/form"]);
  }

  details(id: number) {
    this.router.navigate(["/sponsorship", id, "details"]);
  }
}
