import { ElementIdType } from "services/base/interface";
import { useCRUDBuilder } from "../useCRUDBuilder";
import UserProfileService from "services/userProfile";
import { UserProfileData } from "services/userProfile/interface";

export const useUserCRUD = () =>
  useCRUDBuilder<UserProfileData>({
    cacheQueryName: "my_user",
    paramlessDetail: true,
    readDetailPromise: (brandId: ElementIdType) =>
      UserProfileService.getMyUser(),
    updatePromise: (
      brandId: ElementIdType,
      elementId: ElementIdType,
      body: Partial<UserProfileData>
    ) => UserProfileService.updateMyUser(elementId, body),
  });
