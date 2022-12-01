import Route from '@ember/routing/route';

export default class extends Route {
  model() {
    return {
      step: {
        name: 'release-pipeline',
      },
      children: {
        mode: 'parallel',
        nodes: [
          {
            step: {
              name: 'build',
            },
            children: {
              mode: 'parallel',
              nodes: [
                {
                  step: {
                    name: 'test',
                  },
                  children: {
                    mode: 'serial',
                    nodes: [
                      {
                        step: {
                          name: 'scan-then-sign',
                        },
                      },
                      {
                        step: {
                          name: 'deploy-test',
                        },
                      },
                      {
                        step: {
                          name: 'healthz',
                        },
                      },
                    ],
                  },
                },
                {
                  step: {
                    name: 'prod',
                  },
                  children: {
                    mode: 'serial',
                    nodes: [
                      {
                        step: {
                          name: 'build',
                        },
                      },
                      {
                        step: {
                          name: 'deploy-prod',
                        },
                      },
                      {
                        step: {
                          name: 'healthz',
                        },
                      },
                      {
                        step: {
                          name: 'release-prod',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    };
  }
}
