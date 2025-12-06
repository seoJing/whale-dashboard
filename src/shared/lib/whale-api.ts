// Whale browser extension API type helpers

export interface Tab {
    id?: number;
    url?: string;
    title?: string;
    favIconUrl?: string;
}

export const whaleAPI = {
    async getCurrentTab(): Promise<Tab | undefined> {
        if (typeof whale !== 'undefined' && whale.tabs) {
            return new Promise((resolve) => {
                whale.tabs.query(
                    { active: true, currentWindow: true },
                    (tabs: Tab[]) => {
                        resolve(tabs[0]);
                    }
                );
            });
        }
        return undefined;
    },

    async getAllTabs(): Promise<Tab[]> {
        if (typeof whale !== 'undefined' && whale.tabs) {
            return new Promise((resolve) => {
                whale.tabs.query({}, (tabs: Tab[]) => {
                    resolve(tabs);
                });
            });
        }
        return [];
    },
};

// For TypeScript support
declare global {
    const whale:
        | {
              tabs: {
                  query: (
                      queryInfo: { active?: boolean; currentWindow?: boolean },
                      callback: (tabs: Tab[]) => void
                  ) => void;
              };
          }
        | undefined;
}
