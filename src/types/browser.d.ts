
interface BrowserStorageArea {
  get(
    keys?: string | string[] | null
  ): Promise<Record<string, unknown>>;

  set(
    items: Record<string, unknown>
  ): Promise<void>;
}

declare const browser: {
  storage: {
    local: BrowserStorageArea;
  };
};
