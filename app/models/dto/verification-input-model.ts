import { Min, Max } from "class-validator";

export class VerificationInput {
  @Min(99999)
  @Max(1000000)
  code: number;
}
