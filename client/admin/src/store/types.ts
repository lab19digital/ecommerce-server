import { MutationPayload } from "vuex";

// Store
export interface RootState {
  session: SessionState;
}

export interface SessionState {
  email: string | null;
  has_active_session: Boolean;
  token: string | null;
  user: {} | null;
}

export interface HistoryState {
  history: MutationPayload[];
}

export interface PluginOptions {
  persist?: boolean;
}
