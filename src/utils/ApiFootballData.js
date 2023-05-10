class ApiFootballData {
  constructor() {
    (
      this.apiKey = process.env.DOTENV.API_KEY),
      (this.endpoints = {
        teams: {
          list: () => {
            return {
              method: "GET",
              resource: "teams",
              body: null,
            };
          },
          matches: (options = {}) => {
            return {
              method: "GET",
              resource: `teams/${parseInt(options.team_id)}/matches`,
              body: null,
            };
          },
          dates: (options = {}) => {
            return {
              method: "GET",
              resource: `teams/${options.team_id}/matches?dateFrom=${options.dateFrom}&dateTo=${options.dateTo}`,
              body: null,
            };
          },
          breadcrumbs: (options = {}) => {
            return {
              method: "GET",
              resource: `teams/${parseInt(options.id)}`,
              body: null,
            };
          },
        },
        competitions: {
          list: () => {
            return {
              method: "GET",
              resource: "competitions",
              body: null,
            };
          },
          matches: (options = {}) => {
            return {
              method: "GET",
              resource: `competitions/${options.competition_id}/matches`,
              body: null,
            };
          },
          breadcrumbs: (options = {}) => {
            return {
              method: "GET",
              resource: `competitions/${parseInt(options.id)}`,
              body: null,
            };
          },
        },
      });
  }

  async request(endpoint = {}) {
    try {
      const response = await fetch(
        `http://api.football-data.org/v2/${endpoint.resource}`,
        {
          method: endpoint?.method,
          headers: { "X-Auth-Token": `${this.apiKey}`},
          body: endpoint?.body ? JSON.stringify(endpoint.body) : null,
        }
      );

      if (!response.ok) {
       throw new Error("Ответ сети был не ok.");
      }
      return await response.json();
    } catch (err) {
      console.error(err);
    }
  }

  teams(method = "", options = {}) {
    const existingEndpoint = this.endpoints.teams[method];

    if (existingEndpoint) {
      const endpoint = existingEndpoint(options);
      return this.request(endpoint);
    }
  }

  competitions(method = "", options = {}) {
    const existingEndpoint = this.endpoints.competitions[method];

    if (existingEndpoint) {
      const endpoint = existingEndpoint(options);
      return this.request(endpoint);
    }
  }
}

export default new ApiFootballData();
