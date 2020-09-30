import { MutationPayload } from "vuex";

// Store
export interface RootState {
  session: SessionState;
  products: ProductsState;
}

export interface SessionState {
  email: string | null;
  token: string | null;
  user: { is_admin: number };
  authStatus: Boolean;
}

export interface ProductsState {
  loading: Boolean;
}

export interface HistoryState {
  history: MutationPayload[];
}

export interface PluginOptions {
  persist?: boolean;
}
