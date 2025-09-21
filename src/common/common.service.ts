import * as moment from "moment";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CommonService {
  constructor() {}

  getLocalMoment(date?: string | Date): moment.Moment {
    const localTimeZone = moment.tz.guess();
    if (date) {
      return moment(date).tz(localTimeZone);
    }
    return moment().tz(localTimeZone);
  }

  getServiceName(taskName: string) {
    const serviceName = [];
    let makeCapital = false;
    for (let index = 0; index < taskName.length; index++) {
      let character = taskName[index].toLowerCase();
      if (character === "_") {
        makeCapital = true;
        continue;
      }

      if (makeCapital) {
        makeCapital = false;
        character = character.toUpperCase();
      }

      serviceName.push(character);
    }
    return serviceName.join("");
  }

  serializeError(err) {
    return { message: err.message, stack: err.stack, name: err.name };
  }
}
