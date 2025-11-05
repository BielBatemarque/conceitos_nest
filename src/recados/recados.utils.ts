import { Injectable } from "@nestjs/common";

@Injectable()
export class RecadosUtils {
    intertString(str: string){
        return str.split('').reverse().join('');
    }
}
@Injectable()
export class RecadosUtilsMock {
    intertString(str: string){
        return 'bla bla bla';
    }
}