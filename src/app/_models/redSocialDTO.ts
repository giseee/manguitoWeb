import { PerfilSocialDTO } from "./perfilSocial";

export class RedSocialDTO {
    id: number;    
    url :string;
    perfilSocial: PerfilSocialDTO; 

    constructor(id:number,url :string="", perfilSocial: PerfilSocialDTO) {
      this.id = id;
      this.url=url;
      this.perfilSocial = perfilSocial;
    }
  }