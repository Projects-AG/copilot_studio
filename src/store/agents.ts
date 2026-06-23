import { Agent } from "../components/agents/types";

const STORAGE_KEY = "copilot_agents";

export const getAgents = (): Agent[] => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  return JSON.parse(stored);
};

export const saveAgents = (agents: Agent[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
};

export const createAgent = (agent: Agent) => {
  const agents = getAgents();

  agents.push(agent);

  saveAgents(agents);
};

export const getAgentById = (id: string) => {
  return getAgents().find((agent) => agent.id === id);
};
