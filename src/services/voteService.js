// src/services/voteService.js
import api from "../lib/axios";
import routes from "./apiRoutes";

/**
 * ensure apiRoutes has vote.fetchState or use literal '/vote/fetch-state'
 */
const voteService = {
  fetchStates: () => {
    // if you added route in apiRoutes:
    const url = routes?.vote?.fetchState || "/vote/fetch-state";
    return api.get(url);
  },
};

export default voteService;
