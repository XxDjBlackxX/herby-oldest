import type { Document, Model, Types } from "mongoose";

export interface UserConnectionSchema extends Document {
  user: any;
  type: string;
  access_token: string;
  refresh_token: string;
  _id: Types.ObjectId;
  data: {
    id: string;
    name: string;
    username: string;
  };
}

export interface UserConnectionModel extends Model<UserConnectionSchema> {
  connect({ ...state }: {}): Promise<boolean>;
  disconnect({
    user,
    type,
  }: {
    user: UserConnectionSchema["_id"];
    type: string;
  }): Promise<boolean>;
}
