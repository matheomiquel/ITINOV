import { TokenBody } from "@src/domain/dto/user/token-body";

export type ObjectType = {
  [key: string]: any
}

export type RequestType<Body> = {
  body: Body
  query: any,
  params: any,
  headers: ObjectType;
  user?: TokenBody
}

export type ResponseType<Obj> = Promise<
  { status: number; data: Obj }
>;

export type FunctionType =
  (req: RequestType<any>) => ResponseType<object | undefined>
