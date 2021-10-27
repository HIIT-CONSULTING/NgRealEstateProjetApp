import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { FindAgentService } from "@shared/services/find-agent.service";
import { Router } from "@angular/router";
import { Agent } from "@shared/models/Agent.model";
import { Subsidiary } from "@shared/models/Subsidiary.model";

@Component({
  selector: "app-find-agent-form",
  templateUrl: "./find-agent-form.component.html",
})
export class FindAgentFormComponent implements OnInit {
  agents$: Observable<Agent[]>;
  agents: Agent[] = [];
  isSearsh = false;
  subsidiary$: Observable<any>;
  subsidiary: Subsidiary[] = [];

  constructor(
    private fb: FormBuilder,
    private findAgentService: FindAgentService,
    private translate: TranslateService,
    private router: Router
  ) {}

  form = this.fb.group({
    firstname: [
      "",
      Validators.pattern(
        /^([a-zA-Zàáâçèéêòóôùúû]{1,}\s?'?-?_?[a-zA-Zàáâçèéêòóôùúû]{2,}(\s?'?-?_?[a-zA-Zàáâçèéêòóôùúû]{2,})?$)/
      ),
    ],
    lastname: [
      "",
      Validators.pattern(
        /^([a-zA-Zàáâçèéêòóôùúû]{1,}\s?'?-?_?[a-zA-Zàáâçèéêòóôùúû]{2,}(\s?'?-?_?[a-zA-Zàáâçèéêòóôùúû]{2,})?$)/
      ),
    ],
    telephone: [
      null,
      [Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)],
    ],
    email: ["", Validators.email], //{ value: '', disabled: true}
    subsidiary: "",
  });

  onSubmit() {
    this.isSearsh = true;
    this.agents$ = this.findAgentService.getAgents(this.form.value);
  }

  ngOnInit() {
    this.subsidiary$ = this.findAgentService.getSubsidiary();
  }

  getErrorMessage(form: FormGroup) {
    return form.get("email").hasError("required")
      ? "enter an email"
      : form.get("email").hasError("email")
      ? this.translate.instant("searchAgent.form.email.error")
      : "";
  }

  OnNavigate(id: number) {
    this.router.navigate(["/annuaire", id]);
  }
}
