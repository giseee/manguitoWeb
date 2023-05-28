export class PerfilSocialDTO {
    id: number;    
    nombreRed: string;
    
    constructor(id:number,nombreRed :string="") {
      this.id = id;
      this.nombreRed=nombreRed;
    }
  }