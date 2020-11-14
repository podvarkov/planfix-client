import {PlanfixClient, PlanfixClientOptions} from "./types";

declare type PlanfixError = {
  statusCode: string
  code: string
  message: string
  description: string
}

declare const factory: (opts: PlanfixClientOptions) => PlanfixClient

export = factory;
