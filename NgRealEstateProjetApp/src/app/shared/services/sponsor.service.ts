import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Candidate,
  City,
  Country,
  Gender,
} from '../../shared/models/Agent.model';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class SponsorService {
  private hosturlname = environment.hostURL;
  Vide: {};
  constructor(private http: HttpClient) {}

  sponsorAgent(formData: any) {
    formData.value.birthDay = formData.value.birthDay
      .toISOString()
      .replace(/-/gi, '/')
      .substr(0, 10);
    return this.http.post(`${this.hosturlname}api/v1/add`, formData.value);
  }

  /**
   * web service using to Get the informations of a candiat
   * @param id - candidat's number
   */
  getCandidate(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(
      `${this.hosturlname}api/v1/getAplicantDetails/${id}`
    );
  }

  /**
   * web service using to Get all candidats
   * @param page - page for displaying the candidats
   * @param limit - max of the candidats
   */
  getCandidates(page: number, limit: number): Observable<Candidate[]> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());
    let url = `${this.hosturlname}api/v1/getApllicantUser`;
    return this.http.get<Candidate[]>(url, { params: params });
  }

  /**
   * web service using to Get the cities of a country
   * @param id - country's number
   */
  getCitys(id: number) {
    return this.http.get<City[]>(`${this.hosturlname}api/v1/city/${id}`);
  }

  /**
   * web service using to Get the cities
   */
  getCity(): Observable<City[]> {
    return this.http.get<City[]>(`${this.hosturlname}api/v1/city`);
  }

  /**
   * web service using to get the countries
   */
  getCountry(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.hosturlname}api/v1/country`);
  }

  /**
   * web service using to get the genders
   */
  getGender(): Observable<Gender[]> {
    return this.http.get<Gender[]>(`${this.hosturlname}api/v1/gender`);
  }

  /**
   * web service using to edit a candidat
   * @param candidate -  updates of the candidat
   * @param id - candidat's number
   */
  update(candidate: any, id: number): Observable<any> {
    return this.http.put(
      `${this.hosturlname}api/v1/update/${id}`,
      candidate.value
    );
  }

  /**
   * web service using to edit a candidat
   * @param id - candidat's number
   */
  editCandidate(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`api/leagues/${id}`);
  }

  /**
   * web service using to delete  a candidat
   * @param id - candidat's number
   */
  deleteCandidate(id: number): Observable<any> {
    return this.http.delete(`${this.hosturlname}api/v1/delete/${id}`);
  }

  /**
   * web service using to  valid applicant
   * @param id - id of the request
   */
  valide(id: number) {
    return this.http.post(
      `${this.hosturlname}api/v1/validApplicant/${id}`,
      this.Vide
    );
  }

  /**
   * web service using to  valid applicant
   * @param id - id of the request
   */
  refus(id: number) {
    return this.http.post(
      `${this.hosturlname}api/v1/refuseApplicant/${id}`,
      this.Vide
    );
  }
}
