import type { Document, Model } from "mongoose";

import type { UserSchema } from "@repo/user-db";

type ListApplicationsPopulateKey = "author" | "supervisory";

export interface ListApplications {
  limit: any;
  filter: { status?: string; author?: any };
  populate: ListApplicationsPopulateKey[];
}

export interface ApplicationSchema extends Document {
  author: UserSchema;
  supervisory: UserSchema;
  id: string;
  type: "broadcaster";
  status: "pending" | "success" | "canceled" | "in-progress";
  detail: object;
}

export interface ApplicationModel extends Model<ApplicationSchema> {
  listApplications({}: ListApplications): Promise<any>;
}
