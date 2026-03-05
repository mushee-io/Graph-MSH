export type GraphUser = {
  id: string;
  createdAt: string;
  taskCount: string;
  totalRewards: string;
  reputationScore: number;
  lastReputationUpdate?: string | null;
};

export type GraphTask = {
  id: string;
  taskId: string;
  taskType: string;
  datasetId: string;
  qualityScore: number;
  rewardAmount: string;
  rewardToken: string;
  timestamp: string;
  txHash: string;
  user: { id: string };
};

const DEFAULT_ENDPOINT = "https://api.thegraph.com/subgraphs/name/YOUR/SUBGRAPH";

export function getEndpoint() {
  return process.env.NEXT_PUBLIC_SUBGRAPH_URL || DEFAULT_ENDPOINT;
}

export async function gql<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const endpoint = getEndpoint();
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 15 },
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Graph request failed: ${res.status} ${res.statusText} — ${txt}`);
  }

  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors.map((e: any) => e.message).join(" | "));
  return json.data as T;
}

export const Q = {
  topUsers: `
    query TopUsers($first: Int!) {
      users(first: $first, orderBy: taskCount, orderDirection: desc) {
        id
        createdAt
        taskCount
        totalRewards
        reputationScore
        lastReputationUpdate
      }
    }
  `,
  recentTasks: `
    query RecentTasks($first: Int!) {
      tasks(first: $first, orderBy: timestamp, orderDirection: desc) {
        id
        taskId
        taskType
        datasetId
        qualityScore
        rewardAmount
        rewardToken
        timestamp
        txHash
        user { id }
      }
    }
  `,
  userById: `
    query UserById($id: ID!) {
      user(id: $id) {
        id
        createdAt
        taskCount
        totalRewards
        reputationScore
        lastReputationUpdate
      }
      tasks(where: { user: $id }, first: 50, orderBy: timestamp, orderDirection: desc) {
        id
        taskId
        taskType
        datasetId
        qualityScore
        rewardAmount
        rewardToken
        timestamp
        txHash
        user { id }
      }
    }
  `,
};
