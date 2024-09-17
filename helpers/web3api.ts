// api interfaces
export interface RegisterCandidateRequest {
  name: string;
  officeId: number;
}

export interface CastVoteRequest {
  voter: string;
  candidate: string;
}

export interface CandidateResultResponse {
  result: number;
}

export interface GetResultResponse {
  results: Result[];
}

export interface Result {
  candidateId: number;
  officeId: number;
  votes: number;
}
