export const DEFAULT_SETTING = {
    display_properties: {
        essentials: {
            IAM: {
                tables: {
                    'users-table': {
                        username: {
                            display: true,
                            sequenceId: 1
                        },
                        urn: {
                            display: true,
                            sequenceId: 2
                        },
                        consoleAccess: {
                            display: false,
                            sequenceId: 3
                        },
                        apiAccess: {
                            display: false,
                            sequenceId: 4
                        },
                        groups: {
                            display: true,
                            sequenceId: 5
                        }
                    },
                    'groups-table': {
                        name: {
                            display: true,
                            sequenceId: 7
                        },
                        users: {
                            display: true,
                            sequenceId: 7
                        },
                        urn: {
                            display: true,
                            sequenceId: 7
                        },
                        attachedPolicies: {
                            display: true,
                            sequenceId: 7
                        },
                        creationTime: {
                            display: true,
                            sequenceId: 7
                        }
                    }
                }
            }
        }
    }
}