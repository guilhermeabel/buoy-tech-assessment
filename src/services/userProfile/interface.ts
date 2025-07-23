import { AuthedService } from "services/base/authedService";
import { ElementIdType } from "services/base/interface";

export interface UserProfileData {
  id?: number;
  avatar?: string;
  email?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  slug?: string;
}

export abstract class UserProfileService extends AuthedService {
  abstract getMyUser(): Promise<UserProfileData | undefined>;
  abstract updateMyUser(
    elementId: ElementIdType,
    body: any
  ): Promise<UserProfileData | undefined | void>;
}
