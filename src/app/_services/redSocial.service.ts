import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environments';


import { RedSocial } from '../_models/redSocial';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RedSocialService {
  constructor(private http: HttpClient) { }
getAll() {
  return this.http.get<RedSocial[]>(`${env.url}/api/perfilSocial`);
}

delRedSocialById(id: Number) {
return this.http.delete(`${env.url}/api/perfilSocial/` + id, { observe: 'response' })
}

putRedSocial(redSocial: RedSocial) {
return this.http.put<RedSocial>(`${env.url}/api/perfilSocial/` + redSocial.id, redSocial)
}

getRedSocial(id: Number) {
return this.http.get<RedSocial>(`${env.url}/api/perfilSocial/` + id);
}
postRedSocial(redSocial: RedSocial) {
return this.http.post<RedSocial>(`${env.url}/api/perfilSocial/`,redSocial);
}
addRedSocial(redSocial: RedSocial): Observable<RedSocial> {
return this.http.post<RedSocial>(`${env.url}/api/perfilSocial/`, redSocial);
}
updateRedSocial(redSocial: RedSocial): Observable<RedSocial> {
return this.http.put<RedSocial>(`${env.url}/api/perfilSocial/` + redSocial.id, redSocial)
}



}
